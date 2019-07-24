import React from 'react';

import {graphql} from 'gatsby';
import {Link} from 'gatsby';

import Slideshow from './fragments/Slideshow.js';
import Now from './fragments/Now.js';
import Flux from './fragments/Flux.js';
import Footer from '../common/Footer.js';
import PageMeta from '../helpers/PageMeta.js';


export default function Home({lang, grid, slider, rdv, tweets, github}) {
  //console.log(grid, slider, rdv);

  let relLang;
  if (lang === 'en') {
  relLang = '/en';
  }
  else {
  relLang = '';
  }

  return (
    <>
      <PageMeta
        description={lang === 'fr' ? 'Laboratoire de recherche interdisciplinaire, le médialab est un lieu de conception, de développement et d\'expérimentation de méthodes numériques hybrides pour nourrir des questions scientifiques ancrées dans le périmètre des Sciences humaines et sociales.': 'The Médialab, an interdisciplinary research laboratory comprised of sociologists, engineers and designers, conducts thematic and methodological research to investigate the role of digital technology in our societies'}
      />
      <main role="main" aria-label={lang === "fr" ? "Page d'accueil" : "Homepage" }>
        <section id="home" aria-label={lang === "fr" ? "Contenu de la page d'accueil" : "Homepage content" }>
          <Slideshow slider={slider} lang={lang} />
          <section id="introduction" aria-label={lang === "fr" ? "Présentation succinct du médialab" : "médialab short presentation" }>
            <h1>Le médialab</h1>
            <p> Laboratoire de recherche interdisciplinaire, le&nbsp;médialab est un lieu de conception, de développement et d'expérimentation de méthodes numériques hybrides pour nourrir des questions scientifiques ancrées dans le périmètre des Sciences humaines et&nbsp;sociales.</p>
            <p><Link to={`${relLang}/about`} aria-label={lang === 'fr' ? "Aller à la page de présentation du médialab" : "Go to médialab presentation page" }>{lang === 'fr' ? "En savoir plus" : "Get more information"}</Link></p>
          </section>
          <Now now={grid} lang={lang}/>
          <Footer lang={lang} />
        </section>
        <Flux rdv={rdv} tweets={tweets} github={github} lang={lang} />
      </main>
    </>
  );
}
