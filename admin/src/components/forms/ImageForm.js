import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import Cropper from 'react-image-crop';

export default class ImageForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      blob: null,
      crop: {x: 30, y: 30, height: 30, width: 30}
    };

    this.handleDrop = this.handleDrop.bind(this);
    this.handleCrop = this.handleCrop.bind(this);
  }

  handleDrop(acceptedFiles) {
    const file = acceptedFiles[0];
    this.setState({blob: file.preview});
  }

  handleCrop(crop) {
    this.setState({crop});
  }

  render() {
    const {blob, crop} = this.state;

    return (
      <div>
        <Dropzone onDrop={this.handleDrop} />
        {blob && (
          <Cropper
            src={blob}
            crop={crop}
            onChange={this.handleCrop} />
        )}
      </div>
    );
  }
}
