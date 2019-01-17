import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

export default class Playground extends Component {
  handleFile(files) {

  }

  render() {
    return (
      <div>
        <h1>Playground</h1>
        <Dropzone onDrop={this.handleFile} />
      </div>
    );
  }
}
