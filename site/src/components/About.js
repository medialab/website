import React from 'react';
import {Link} from 'gatsby';

import Nav from './common/Nav.js';

import RawHtml from './helpers/RawHtml';

export default function About({lang}) {
  console.log(lang);

  return (
    <>
      <Nav lang={lang} data='' order={['main', 'people', 'productions', 'activities', 'news', 'attachments']} />
      <main id="main">
        <hgroup>
          <h1>Le medialab</h1>
          <h2>Laboratoire de recherche interdisciplinaire, le médialab est un lieu de conception, de développement et d'expérimentation de méthodes numériques hybrides pour nourrir des questions scientifiques ancrées dans le périmètre des sciences sociales.</h2>
        </hgroup>
        <div className="about-contenu">

          <h3>La recherche au médialab</h3>

          <p>Central dans les réflexions du médialab depuis sa <span className="totip">création<span className="tip">BlaBla</span></span>, le numérique y est envisagé tant comme un objet d’étude que comme un moyen de recherche en sciences sociales. Les transformations engendrées par les technologies numériques sont sources de rapports complexes que les travaux du médialab visent à analyser et à représenter.
          Le changement de paradigme dans notre rapport au monde induit par ces nouvelles articulations  centrent les recherches autour de grands défis contemporains qui se répartissent en quatre thèmes : “espace public numérique”, “transition énergétique”, “futurs technologiques”, et “Quantitatives Cultural studies”.</p>

          <p>Chaque projet de recherche développe une approche pluridisciplinaire qui mobilise des compétences variées. Irrigués par les sciences sociales et les STS, ces projets se nourrissent au besoin de l'ingénierie informatique, ancrée dans l’ADN du médialab, pour affiner les enquêtes utilisant le web, mais aussi des nouvelles formes de mises en situation explorées par le design. </p>
          <p>--
          Faire le lien avec pédagogie: 
          Un lien fort avec les activités de pédagogie
          Les nouvelles formes de pédagogie entrent pleinement
          --</p>

          <h3>Equipe</h3>
          <p>Composée d’hommes et de femmes aux compétences complémentaires, l’équipe du médialab est plurielle. Membres ou associés au laboratoire, ces profils académiques, techniques, en design, ou encore en pédagogie se combinent et travaillent ensemble pour aviver la force des activités du laboratoire.</p>
          <p><Link to="/people" className="GoTo">Découvrir les membres de l'équipe</Link></p>

          <h3>Activités</h3>
          <p>A la fois objet de recherche et outils au service des projets, les méthodes numériques sont au coeur des activités du médialab et contribuent à nourrir la réflexion sur les enjeux contemporains tant en sociologie qu’en STS. </p>
          <p>Organisées entre recherche, enseignement et méthodes, ces activités étudient notamment la
          montée des populismes, les futurs écologiques ou encore de l’histoire de l’art numérique.</p>
          <p><Link to="/activities" className="GoTo">Voir la liste des activités</Link></p>

          <h3>Productions</h3>
          <p>Issues des dynamiques de recherche du laboratoire combinant méthode, analyse et théorie, les productions du médialab constituent un panorama hétéroclite. Aux traditionnelles publications académiques s’ajoute un ensemble de réalisations techniques qui répondent à des problèmes de recherche récurrents. Récemment, les sites web et réalisations en situation se sont développés comme de nouvelles formes pour rendre compte des activités du laboratoire.</p>
          <p><Link to="/Productions" className="GoTo">Voir la liste des productions</Link></p>

        </div>
        {/*  <aside id="inshort">
          <h3>Side chose</h3>
          <p>L’autre originalité du médialab en terme d’organisation est de s’appuyer à parts égales sur trois métiers</p>
          <ul>
            <li>A</li>
            <li>B</li>
            <li>C</li>
          </ul>
        </aside>*/}
      </main>
    </>
  );
}

