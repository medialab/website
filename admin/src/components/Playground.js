import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import debounce from 'lodash/debounce';
import Slider from './misc/Slider';

import {imageFileToBlocks} from '../../../specs/processing';
import { blockSize } from 'hash.js/lib/hash/sha/1';

const preStyle = {
  background: 'none',
  fontFamily: 'Monospace',
  fontSize: '8px',
  padding: 0,
  margin: 0,
  lineHeight: '1'
};

function BlocksPreview({blocks}) {
  return (
    <div>
      {blocks.map((b, i) => {
        return (
          <pre key={i} style={preStyle}>
            {b.join('')}
          </pre>
        );
      })}
    </div>
  );
}

export default class Playground extends Component {
  state = {
    blocks: null,
    file: null,
    gamma: 0,
    rows: 80
  };

  handleFile = files => {
    this.setState({file: files[0]});

    this.debouncedUpdateBlocks(files[0]);
  };

  handleGamma = e => {
    this.setState({gamma: +e.target.value});
    this.debouncedUpdateBlocks(this.state.file);
  };

  handleRows = e => {
    this.setState({rows: +e.target.value});
    this.debouncedUpdateBlocks(this.state.file);
  };

  updateBlocks = file => {
    const {
      gamma,
      rows
    } = this.state;

    imageFileToBlocks(file, {gamma, rows}, (err, blocks) => {
      this.setState({blocks});
    });
  };

  debouncedUpdateBlocks = debounce(this.updateBlocks, 0);

  render() {
    const {
      blocks,
      gamma,
      file,
      rows
    } = this.state;

    return (
      <div>
        <h1>Playground</h1>
        {!file && <Dropzone onDrop={this.handleFile} />}
        {file && blocks && (
          <>
            <div>
              <label className="label">Gamma ({gamma})</label>
              <Slider
                value={gamma}
                onChange={this.handleGamma} />
            </div>
            <div>
              <label className="label">Rows ({rows})</label>
              <Slider
                value={rows}
                onChange={this.handleRows}
                min={20}
                max={320}
                step={10} />
            </div>
            <BlocksPreview blocks={blocks} />
          </>
        )}
      </div>
    );
  }
}
