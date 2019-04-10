import React from 'react';

const ROWS = {
  small: 25,
  medium: 75,
  large: 150
};

const PLACEHOLDER_CHARACTERS = '░▒▓▓▒░';

export default function ProcessedImage({image, size}) {

  const needPlaceholder = !image;

  const rows = ROWS[size];

  const length = image ? image.length : ((rows * 3 / 4) | 0) * rows;

  const b = (length / rows) | 0;

  return (
    <>
      {Array.from(new Array(b), (_, i) => {
        const offset = i * rows;

        const row = needPlaceholder ?
          PLACEHOLDER_CHARACTERS.repeat(rows / PLACEHOLDER_CHARACTERS.length) :
          image.slice(offset , offset + rows);

        return (
          <pre key={i}>{row}</pre>
        );
      })}
    </>
  );
}
