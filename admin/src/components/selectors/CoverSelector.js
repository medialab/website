/* global API_URL */
import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import Crop from 'react-image-crop';
import cls from 'classnames';
import Button from '../misc/Button';
import CardModal from '../misc/CardModal';
import AsyncComponent from '../misc/AsyncComponent';
import omit from 'lodash/omit';

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

  return canvas.toDataURL('image/jpeg');
}

function renderCroppedImg(src, pixelCrop) {
  return callback => {
    getDimensions(getSrc(src), img => {
      return callback(<img src={getCroppedDataUrl(img, pixelCrop)} style={{maxHeight: '200px'}} />);
    });
  };
}

export default class CoverSelector extends Component {
  state = {
    blackAndWhite: true,
    crop: null,
    pixelCrop: null,
    file: null,
    img: null,
    selecting: false,
    uploading: false
  };

  handleModalOpen = () => this.setState({selecting: true});
  handleModalClose = () => this.setState({selecting: false});

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
    this.setState({crop, pixelCrop});
  };

  toggleBlackAndWhite = e => {
    this.setState({blackAndWhite: e.target.checked});
  };

  handleUpload = callback => {

    this.setState({uploading: true});

    client.upload(this.state.file, result => {
      this.setState({uploading: false});

      this.handleChange(result.name);

      return callback();
    });
  };

  handleChange = filename => {
    this.props.onChange({
      processed: this.props.processed || false,
      file: filename,
      crop: omit(this.state.pixelCrop, ['aspect'])
    });
  };

  handleUpdateCover = () => {
    getDimensions(getSrc(this.props.cover.file), (img, dimensions) => {
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

      this.setState({
        crop,
        file: true,
        img
      }, this.handleModalOpen);
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
      cover
    } = this.props;

    const {
      blackAndWhite,
      crop,
      pixelCrop,
      file,
      img,
      selecting,
      uploading
    } = this.state;

    let modal = null;

    if (selecting)
      modal = (
        <CardModal onClose={this.handleModalClose} large>
          {
            [
              'Uploading a cover',
              (
                <div key="body">
                  {!file && <Dropzone onDrop={this.handleDrop} />}
                  {file && (
                    <div className="columns">
                      <div className="column is-6">
                        <div>
                          <label>Original image</label>
                          &nbsp;(<a style={{textDecoration: 'underline'}} onClick={this.handleClear}>clear</a>)
                        </div>
                        <Crop
                          keepSelection
                          crop={crop}
                          src={img.src}
                          onChange={this.handleCrop}
                          style={{maxHeight: '300px'}} />
                      </div>
                      <div className="column is-6">
                        <div>
                          <label>Preview</label>&nbsp;&nbsp;
                          <input
                            type="checkbox"
                            onChange={this.toggleBlackAndWhite}
                            checked={blackAndWhite} />
                          (Black and white?)
                        </div>
                        {pixelCrop && (
                          <div>
                            <img
                              className={cls(blackAndWhite && 'black-and-white')}
                              src={getCroppedDataUrl(img, pixelCrop)}
                              style={{maxHeight: '300px'}} />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ),
              close => (
                <div key="footer">
                  {file && !cover && (
                    <Button
                      disabled={!file}
                      loading={uploading}
                      kind="success"
                      onClick={() => {
                        this.handleUpload(close);
                      }}>
                      Choose this cover
                    </Button>
                  )}
                  {cover && (
                    <Button
                      kind="success"
                      onClick={() => {
                        this.handleChange(cover.file);
                        close();
                      }}>
                      Update the cover
                    </Button>
                  )}
                  <Button
                    onClick={close}>
                    Cancel
                  </Button>
                </div>
              )
            ]
          }
        </CardModal>
      );

    return (
      <div>
        {modal}
        {cover ?
          (
            <div>
              <div>
                <AsyncComponent>
                  {renderCroppedImg(cover.file, cover.crop)}
                </AsyncComponent>
              </div>
              <div>
                <Button onClick={this.handleUpdateCover}>Update cover</Button>
              </div>
            </div>
          ) : (
            <Button onClick={this.handleModalOpen}>Upload a cover</Button>
          )
        }
      </div>
    );
  }
}
