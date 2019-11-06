import React, {useState, useEffect} from 'react';

import {levenshteinGenerativePattern} from '../../generative';

const BLANK = '\u00A0';

const BLOCKS = ['\u00A0', '\u2591', '\u2592', '\u2593', '\u2588'].reverse();

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

function decodeBlocks(buffer) {
  const blocks = new Uint8Array(buffer.length * 2);

  for (let i = 0, j = 0; i < buffer.length; i += 1, j += 2) {
    blocks[j] = buffer[i] >> 4;
    blocks[j + 1] = buffer[i] & 0x0F;
  }

  return blocks;
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

    firstColoredBlock[i] = findFirstColoredBlock(image.slice(offset, offset + rows));
  }

  return Math.min.apply(null, firstColoredBlock);
}

function extractGenerativeParameters(rows, data) {
  const string = (
    data.name ||
    (data.title &&
      ((data.title.fr || '') + (data.title.en || ''))) ||
    'levenshtein is so cool'
  );

  const date = (data.startDate || data.date || data.endDate);

  const number = date ?
    +date.split('T')[0].replace(/-/g, '') :
    string.charCodeAt(0);

  // TODO: There is something fishy here...
  let splitPoint = (number % string.length);

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
  let initialBlocks;

  if (!image && data) {
    const params = extractGenerativeParameters(rows, data);
    initialBlocks = levenshteinGenerativePattern.apply(null, params);
  }

  const [blocks, setBlocks] = useState(initialBlocks);

  if (image)
    useEffect(() => {
      fetch(image)
        .then(response => response.arrayBuffer())
        .then(buffer => {
          const encoded = new Uint8Array(buffer);
          const decoded = decodeBlocks(encoded);

          const string = Array.from(decoded).map(i => BLOCKS[i]).join('');

          setBlocks(string);
        });
    }, []);

  const needPlaceholder = !image && !initialBlocks;

  const length = blocks ? blocks.length : ((rows * 3 / 4) | 0) * rows;

  const b = (length / rows) | 0;

  const anchor = Math.max(0, blocks ? findAnchor(blocks, rows, b) - MARGIN : 0);

  if (!needPlaceholder && !blocks)
    return null;

  // TODO: somehow inject params in markup
  return (
    <>
      {Array.from(new Array(b), (_, i) => {
        const offset = i * rows;

        const row = needPlaceholder ?
          PLACEHOLDER_CHARACTERS.repeat(rows / PLACEHOLDER_CHARACTERS.length) :
          blocks.slice(offset + anchor, offset + rows);

        return (
          <pre key={i}>{row}</pre>
        );
      })}
    </>
  );
}
