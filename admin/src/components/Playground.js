import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import debounce from 'lodash/debounce';
import Slider from './misc/Slider';

import {imageFileToBlocks, blocksToImage} from '../../../specs/processing';
import char00A0 from '../../../specs/charactersImg/00A0.png';
import char2588 from '../../../specs/charactersImg/2588.png';
import char2591 from '../../../specs/charactersImg/2591.png';
import char2592 from '../../../specs/charactersImg/2592.png';
import char2593 from '../../../specs/charactersImg/2593.png';

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
      blocksToImage(blocks, {char00A0, char2588, char2591, char2592, char2593}, {width: 14, height: 24}, (err, image) => {
        this.setState({blocks, image});
      });
    });
  };

  debouncedUpdateBlocks = debounce(this.updateBlocks, 0);

  render() {
    const {
      blocks,
      image,
      gamma,
      file,
      rows,
      zoom
    } = this.state;

    return (
      <div>
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
            {
              image &&
              <img src={image} />
               /*&&
              <div style={{position: 'relative'}}>
                {
                  image.reduce((res, row, rowI) => {
                    return [
                      ...res,
                      ...row.map((char, charI) => (
                        <img key={`${rowI}-${charI}`} style={{position: 'absolute', left: char.x, top: char.y }} src={char.src} />
                      ))
                    ]
                  }, [])
                }
              </div>*/
            }
            <br />
            <br />
          </>
        )}
      </div>
    );
  }
}
