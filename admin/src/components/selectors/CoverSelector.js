/* global API_URL */
import React, {PureComponent} from 'react';
import Dropzone from 'react-dropzone';
import Crop from 'react-image-crop';
import cls from 'classnames';
import Button from '../misc/Button';
import Slider from '../misc/Slider';
import ProcessedImage from '../ProcessedImage';
import omit from 'lodash/omit';
import debounceRender from 'react-debounce-render';

import client from '../../client';
import {readImageFileAsDataUrl} from '../../../../specs/processing';

function getSrc(filename) {
  return `${API_URL}/assets/${filename}`;
}

function getDimensions(url, callback) {
  const img = new Image();

  img.crossOrigin = 'anonymous';

  img.onload = () => {
    return callback(img, {width: img.naturalWidth, height: img.naturalHeight});
  };

  img.src = url;
}

function getCroppedDataUrl(img, pixelCrop) {
  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  const context = canvas.getContext('2d');

  context.drawImage(
    img,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return canvas.toDataURL('image/png');
}

function CroppedImage({blackAndWhite, img, pixelCrop}) {
  return (
    <img
      className={cls(blackAndWhite && 'black-and-white', 'checkered')}
      src={getCroppedDataUrl(img, pixelCrop)}
      style={{maxHeight: '200px'}} />
  );
}

const DebouncedCroppedImage = debounceRender(CroppedImage, 150);
const DebouncedProcessedImage = debounceRender(ProcessedImage, 50);

export default class CoverSelector extends PureComponent {
  state = {
    blackAndWhite: true,
    crop: null,
    pixelCrop: null,
    file: null,
    img: null,
    uploading: false
  };

  componentDidMount() {
    if (this.props.cover)
      this.handleUpdateCover();
  }

  componentDidUpdate(previousProps) {
    if (!previousProps.cover && this.props.cover)
      this.handleUpdateCover();
  }

  handleDrop = files => {

    readImageFileAsDataUrl(files[0], url => {

      getDimensions(url, (img, dimensions) => {
        const ratio = this.props.ratio;

        const w = dimensions.width / ratio,
              h = dimensions.height / ratio;

        // These are in percentages
        const crop = {
          x: 0,
          y: 0,
          aspect: ratio,
          width: w,
          height: h
        };

        this.setState({crop, file: files[0], img});
      });
    });
  };

  handleCrop = (crop, pixelCrop) => {
    this.setState({crop, pixelCrop}, () => {
      if (this.props.cover)
        this.handleChange(this.props.cover.file);
    });
  };

  toggleBlackAndWhite = e => {
    this.setState({blackAndWhite: e.target.checked});
  };

  handleUpload = () => {

    this.setState({uploading: true});

    client.upload(this.state.file, result => {
      this.setState({uploading: false});
      this.handleChange(result.name);
    });
  };

  handleChange = filename => {
    const processing = !!this.props.processing;

    const coverData = {
      processed: processing,
      file: filename,
      crop: omit(this.state.pixelCrop, ['aspect'])
    };

    if (this.props.cover.credits)
      coverData.credits = this.props.cover.credits;

    if (processing)
      coverData.gamma = this.props.cover ? this.props.cover.gamma : 0;

    this.props.onChange(coverData);
  };

  handleUpdateCover = () => {
    const cover = this.props.cover;

    getDimensions(getSrc(cover.file), (img, dimensions) => {
      const ratio = this.props.ratio;

      const w = dimensions.width,
            h = dimensions.height;

      // These are in percentages
      const crop = {
        x: cover.crop.x * 100 / w,
        y: cover.crop.y * 100 / h,
        aspect: ratio,
        width: cover.crop.width * 100 / w,
        height: cover.crop.height * 100 / h
      };

      this.setState({
        crop,
        pixelCrop: {
          aspect: ratio,
          ...cover.crop
        },
        file: true,
        img
      });
    });
  };

  handleGamma = e => {
    this.props.onChange({
      ...this.props.cover,
      gamma: +e.target.value
    });
  };

  handleCredits = e => {
    const credits = e.target.value;

    // Same credits
    if (credits === this.props.cover.credits)
      return;

    // Deleting credits
    if (!credits) {
      const cover = omit(this.props.cover, ['credits']);
      return this.props.onChange(cover);
    }

    // Updating or adding credits
    this.props.onChange({
      ...this.props.cover,
      credits: e.target.value
    });
  };

  handleClear = () => {
    this.setState({
      crop: null,
      pixelCrop: null,
      file: null,
      img: null
    });

    this.props.onChange();
  };

  render() {
    const {
      cover,
      processing
    } = this.props;

    const {
      blackAndWhite,
      crop,
      pixelCrop,
      file,
      img,
      uploading
    } = this.state;

    return (
      <>
        <div className="columns">
          <div className="column is-6">
            {!cover && !file && (
              <>
                <div><small>Sélectionner l'image :</small></div>
                <Dropzone onDrop={this.handleDrop} />
              </>
            )}
            {file && (
              <>
                <div><small>Image originale à recadrer :</small></div>
                <Crop
                  keepSelection
                  crop={crop}
                  src={img.src}
                  onChange={this.handleCrop}
                  style={{maxHeight: '200px'}} />
              </>
            )}
            {!cover ?
              (
                <div>
                  <br />
                  <Button
                    disabled={!file}
                    loading={uploading}
                    kind={file ? 'primary' : 'raw'}
                    onClick={() => {
                      this.handleUpload();
                    }}>
                    {file ? 'Charger cette image' : 'Sélectionner une image'}
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    small
                    kind="text"
                    onClick={this.handleClear}>
                    Choisir une autre image
                  </Button>
                </div>
              )
            }
          </div>
          <div className="column is-6">
            {pixelCrop && (
              <div>
                <div><small>Image recadrée :</small></div>
                <DebouncedCroppedImage
                  blackAndWhite={blackAndWhite}
                  img={img}
                  pixelCrop={pixelCrop} />
                <div>
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={blackAndWhite}
                      onChange={this.toggleBlackAndWhite} />
                    <small>&nbsp;en Noir &amp; blanc ?</small>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
        {cover && (
          <div className="columns">
            <div className="column is-6">
              <div className="field">
                <div><small>Crédits :</small></div>
                <div className="control">
                  <input
                    type="text"
                    className="input is-small"
                    value={cover.credits || ''}
                    onChange={this.handleCredits}
                    placeholder="..." />
                </div>
              </div>
            </div>
          </div>
        )}
        {processing && pixelCrop && cover && (
          <>
            <div className="columns">
              <div className="column is-5">
                <div><small>Image traitée (grande) :</small></div>
                <div>
                  <DebouncedProcessedImage
                    img={img}
                    crop={pixelCrop}
                    gamma={cover.gamma}
                    rows={150}
                    zoom={0.3} />
                </div>
              </div>
              <div className="column is-5">
                <div><small>Image traitée (moyenne) :</small></div>
                <div>
                  <DebouncedProcessedImage
                    img={img}
                    crop={pixelCrop}
                    gamma={cover.gamma}
                    rows={75}
                    zoom={0.5} />
                </div>
              </div>
              <div className="column is-4">
                <div><small>Image traitée(petite) :</small></div>
                <div>
                  <DebouncedProcessedImage
                    img={img}
                    crop={pixelCrop}
                    gamma={cover.gamma}
                    rows={25}
                    zoom={0.6} />
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <div className="field">
                  <div><small>Paramètre gamma pour le traitement de l'image : ({cover.gamma})</small></div>
                  <Slider
                    value={cover.gamma} onChange={this.handleGamma} min={-255 * 3}
                    max={255 * 3} />
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
