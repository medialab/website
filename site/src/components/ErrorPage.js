import React from 'react';

export default function ErrorPage({lang, code}) {
  // console.log(code);

  return (
    <div>
      {lang === 'fr' ?
        `Ceci est une page d'erreur ${code} !` :
        `This is an error ${code} page!`
      }
    </div>
  );
}
