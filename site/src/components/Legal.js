import React from 'react';
import Nav from './common/Nav.js';

export default function Legal({lang}) {
  console.log(lang);

  return (
    <>
      <Nav />
      <main id="main-objet">
        Mentions Légales
      </main>
    </>
  );
}

