/* global API_URL */
import React, {Component} from 'react';
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

export default class CoverSelector extends Component {
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

        this.setState({crop, file: files[0], img: img});
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
    this.props.onChange({
      processed: this.props.processed || false,
      file: filename,
      crop: omit(this.state.pixelCrop, ['aspect']),
      gamma: this.props.cover ? this.props.cover.gamma : 0
    });
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
                <div><small>Select image to upload:</small></div>
                <Dropzone onDrop={this.handleDrop} />
              </>
            )}
            {file && (
              <>
                <div><small>Original image to crop:</small></div>
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
                    {file ? 'Upload this cover' : 'Waiting for an image'}
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    small
                    kind="text"
                    onClick={this.handleClear}>
                    Choose another image
                  </Button>
                </div>
              )
            }
          </div>
          <div className="column is-6">
            {pixelCrop && (
              <div>
                <div><small>Cropped image:</small></div>
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
                    <small>&nbsp;Black &amp; white preview?</small>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
        {processing && pixelCrop && cover && (
          <>
            <div className="columns">
              <div className="column is-4">
                <div><small>Processed image (large):</small></div>
                <div>
                  <DebouncedProcessedImage
                    img={img}
                    crop={pixelCrop}
                    gamma={cover.gamma}
                    rows={150}
                    zoom={0.3} />
                </div>
              </div>
              <div className="column is-4">
                <div><small>Processed image (medium):</small></div>
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
                <div><small>Processed image (small):</small></div>
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
                  <div><small>Gamma parameter for image processing: ({cover.gamma})</small></div>
                  <Slider value={cover.gamma} onChange={this.handleGamma} min={-255} max={255} />
               </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
