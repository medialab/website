// TODO: not used, here just as an example of cropper usage
import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import Cropper from 'react-image-crop';

import client from '../../client';

export default class ImageForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      file: null,
      crop: {x: 30, y: 30, height: 30, width: 30}
    };
  }

  handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    this.setState({file});
  };

  handleCrop = (crop) => {
    this.setState({crop});
  };

  handleUpload = () => {
    const formData = new FormData();
    formData.append('file', this.state.file);

    client.upload(formData, result => {
      console.log(result);
    });
  };

  render() {
    const {file, crop} = this.state;

    const blob = file ? file.preview : null;

    return (
      <div>
        <Dropzone onDrop={this.handleDrop} />
        {blob && (
          <div>
            <Cropper
              src={blob}
              crop={crop}
              onChange={this.handleCrop} />
            <button type="button" className="button" onClick={this.handleUpload}>
              Upload
            </button>
          </div>
        )}
      </div>
    );
  }
}
