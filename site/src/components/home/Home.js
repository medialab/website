import React from 'react';
import {Link} from 'gatsby';

import Slideshow from './fragments/Slideshow.js';
import Now from './fragments/Now.js';
import Flux from './fragments/Flux.js';
import Footer from '../common/Footer.js';
import PageMeta from '../helpers/PageMeta.js';

const i18n = {
  fr: {
    description: 'Laboratoire de recherche interdisciplinaire, le médialab est un lieu de conception, de développement et d\'expérimentation de méthodes numériques hybrides pour nourrir des questions scientifiques ancrées dans le périmètre des Sciences humaines et sociales.',
    home: 'Page d\'accueil',
    content: 'Contenu de la page d\'accueil',
    presentation: 'Présentation du médialab',
    goto: 'Aller à la page de présentation du médialab',
    more: 'En savoir plus'
  },
  en: {
    description: 'The médialab, an interdisciplinary research laboratory comprised of sociologists, engineers and designers, conducts thematic and methodological research to investigate the role of digital technology in our societies',
    home: 'Homepage',
    content: 'Homepage content',
    presentation: 'médialab presentation',
    goto: 'Go to médialab presentation page',
    more: 'Get more information'
  }
};

const permalink = {
  en: '/en/about',
  fr: '/a-propos'
};

export default function Home({lang, grid, slider, rdv, tweets, github}) {
  return (
    <>
      <PageMeta
        lang={lang}
        description={i18n[lang].description} />
      <main role="main" aria-label={i18n[lang].homepage}>
        <section id="home" aria-label={i18n[lang].content}>
          <Slideshow slider={slider} lang={lang} />
          <section id="introduction" aria-label={i18n[lang].presentation}>
            <h1>Le médialab</h1>
            <p> Laboratoire de recherche interdisciplinaire, le&nbsp;médialab est un lieu de conception, de développement et d'expérimentation de méthodes numériques hybrides pour nourrir des questions scientifiques ancrées dans le périmètre des Sciences humaines et&nbsp;sociales.</p>
            <p>
              <Link
                to={permalink[lang]}
                aria-label={i18n[lang].goto}>
                {i18n[lang].more}
              </Link>
            </p>
          </section>
          <Now now={grid} lang={lang} />
          <Footer lang={lang} />
        </section>
        <Flux
          rdv={rdv} tweets={tweets} github={github}
          lang={lang} />
      </main>
    </>
  );
}
