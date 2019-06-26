import React from 'react';

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

const PLACEHOLDER_CHARACTERS = makeid(12);

export default function ProcessedImage({image, size}) {
  const needPlaceholder = !image;

  const rows = ROWS[size];

  const length = image ? image.length : ((rows * 3 / 4) | 0) * rows;

  const b = (length / rows) | 0;

  const anchor = Math.max(0, image ? findAnchor(image, rows, b) - MARGIN: 0);

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
