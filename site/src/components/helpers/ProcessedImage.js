import React from 'react';

import {levenshteinGenerativePattern} from '../../generative';

const BLANK = '\u00A0';

const ROWS = {
  small: 60,
  medium: 120,
  large: 240
};

const MARGIN = 1;

function makeid(length) {
  let text = '';
  const possible = '░▒▓';

  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function findFirstColoredBlock(row) {
  for (let i = 0; i < row.length; i++) {
    if (row[i] !== BLANK)
      return i;
  }

  return row.length;
}

function findAnchor(image, rows, b) {
  const firstColoredBlock = Array.from(new Array(b), () => rows);

  for (let i = 0; i < 10; i++) {
    const offset = i * rows;

    firstColoredBlock[i] = findFirstColoredBlock(image.slice(offset , offset + rows));
  }

  return Math.min.apply(null, firstColoredBlock);
}

function extractGenerativeParameters(rows, data) {
  const string = (
    data.name ||

    // TODO: fix this, by ors
    (data.title ? data.title.fr : data.title.en) ||
    'levenshtein is so cool'
  );

  const date = (data.startDate || data.date);

  const number = date ?
    +date.split('T')[0].replace(/-/g, '') :
    0;

  // TODO: Split somewhere in half!
  // TODO: fix still empty cases
  let splitPoint = number % string.length;

  if (splitPoint === 1)
    splitPoint = (string.length / 2) | 0;

  const A = string.slice(0, splitPoint);
  const B = string.slice(-splitPoint);

  const sparsity = number % 5;

  return [A, B, {
    rows,
    sparsity,
    rotate: number
  }];
}

const PLACEHOLDER_CHARACTERS = makeid(12);

export default function ProcessedImage({image, data, size}) {
  const rows = ROWS[size];

  if (!image && data) {
    const params = extractGenerativeParameters(rows, data);
    // console.log(data.title.fr || data.title.en, params[2]);

    image = levenshteinGenerativePattern.apply(null, params);
  }

  const needPlaceholder = !image;

  const length = image ? image.length : ((rows * 3 / 4) | 0) * rows;

  const b = (length / rows) | 0;

  const anchor = Math.max(0, image ? findAnchor(image, rows, b) - MARGIN: 0);

  // TODO: somehow inject params in markup
  return (
    <>
      {Array.from(new Array(b), (_, i) => {
        const offset = i * rows;

        const row = needPlaceholder ?
          PLACEHOLDER_CHARACTERS.repeat(rows / PLACEHOLDER_CHARACTERS.length)  :
          image.slice(offset + anchor, offset + rows);

        return (
          <pre key={i}>{row}</pre>
        );
      })}
    </>
  );
}
