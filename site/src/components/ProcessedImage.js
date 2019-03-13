import React from 'react';

const ROWS = {
  small: 25,
  medium: 75,
  large: 150
}; 

const PLACEHOLDER_CHARACTER = '░▒▓▓▒░';

export default function ProcessedImage({image, size}) {

  const needPlaceholder = !image;

  const rows = ROWS[size];

  return (
    <>
      {Array.from(new Array(rows), (_, i) => {
        const row = needPlaceholder ?
          PLACEHOLDER_CHARACTER.repeat(rows/7) : // Je divise par deux car j'ai ajouté un caractère
          image.slice(i, i + rows);

        return (
          <pre key={i}>{row}</pre>
        );
      })}
    </>
  );
}
