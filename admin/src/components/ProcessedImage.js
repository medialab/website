import React from 'react';

import {imageToBlocks} from '../../../specs/processing';

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

export default function ProcessedImage({img, crop, rows, zoom}) {

  const blocks = imageToBlocks(img, {
    rows,
    crop,
    gamma: 0
  });

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
