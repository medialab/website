import React from 'react';

const ROWS = {
  small: 25,
  medium: 75,
  large: 150
};

const PLACEHOLDER_CHARACTER = '▒';

export default function ProcessedImage({image, size}) {

  const needPlaceholder = !image;

  const rows = ROWS[size];

  return (
    <code>
      {Array.from(new Array(rows), (_, i) => {
        const row = needPlaceholder ?
          PLACEHOLDER_CHARACTER.repeat(rows) :
          image.slice(i, i + rows);

        return (
          <pre key={i}>{row}</pre>
        );
      })}
    </code>
  );
}
