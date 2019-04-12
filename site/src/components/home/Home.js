import React from 'react';

import {graphql} from 'gatsby';
import {Link} from 'gatsby';

import Slideshow from './fragments/Slideshow.js';
import Now from './fragments/Now.js';
import Agenda from './fragments/Agenda.js';
import Flux from './fragments/Flux.js';



export default function Home({lang, grid, slider, rdv}) {
  //console.log(grid, slider, rdv);

  return (
    <>
      <Slideshow slider={slider} lang={lang} />
      <main>
        <section id="introduction">
          <h1>Le médialab</h1>
          <p> Laboratoire de recherche interdisciplinaire, le&nbsp;médialab est un lieu de conception, de développement et d'expérimentation de méthodes numériques hybrides pour nourrir des questions scientifiques ancrées dans le périmètre des Sciences humaines et&nbsp;sociales.</p>
          <p><a href="#">En savoir plus</a></p>
        </section>
        <Now now={grid} lang={lang} />
        <Agenda rdv={rdv} lang={lang} />
        <section id="follow">
          <p>Vous pouvez suivre les activité du Medialab sur <a href="https://twitter.com/medialab_scpo" title="twitter">⟐</a> ou sur <a href="https://github.com/medialab" title="Github">⊶</a></p>
        </section>
        <Flux />
      </main>
    </>
  );
}
