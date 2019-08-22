import React, {Component} from 'react';
import Helmet from 'react-helmet';
import Dropzone from 'react-dropzone';
import debounce from 'lodash/debounce';
import Slider from './misc/Slider';

import {imageFileToBlocks} from '../../../specs/processing';

const containerStyle = {
  lineHeight: 'normal',
  wordBreak: 'keep-all',
  whiteSpace: 'nowrap'
};

const preStyle = {
  background: 'none',
  fontFamily: 'Monospace',
  padding: 0,
  margin: 0,
  overflowX: 'hidden',
  fontSize: '1em'
};

function BlocksPreview({blocks, zoom}) {
  return (
    <div style={{...containerStyle, fontSize: `${zoom}vw`}}>
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
    rows: 80,
    zoom: 0.5
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

  handleZoom = e => {
    this.setState({zoom: +e.target.value});
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
      rows,
      zoom
    } = this.state;

    return (
      <div>
        <Helmet>
          <title>médialab CMS - image playground</title>
        </Helmet>
        {!file && <Dropzone onDrop={this.handleFile} />}
        {file && blocks && (
          <>
            <div className="columns">
              <div className="column is-2">
                <label className="label">Gamma ({gamma})</label>
                <Slider
                  value={gamma}
                  onChange={this.handleGamma} />
              </div>
              <div className="column is-2">
                <label className="label">Rows ({rows})</label>
                <Slider
                  value={rows}
                  onChange={this.handleRows}
                  min={20}
                  max={320}
                  step={10} />
              </div>
              <div className="column is-2">
                <label className="label">Zoom ({zoom})</label>
                <Slider
                  value={zoom}
                  onChange={this.handleZoom}
                  min={0.1}
                  max={5}
                  step={0.1} />
              </div>
            </div>
            <BlocksPreview blocks={blocks} zoom={zoom} />
            <br />
            <br />
          </>
        )}
      </div>
    );
  }
}
