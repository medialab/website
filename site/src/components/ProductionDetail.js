import React from 'react';
import {graphql} from 'gatsby';

import PublicationsAssocies from './fragments/pages/PublicationsAssocies.js';
import FichiersAssocies from './fragments/pages/FichiersAssocies.js';
import Nav from './fragments/Nav.js';
import ToggleLang from './fragments/pages/ToggleLang.js';

import RawHtml from './RawHtml';
import './scss/page_objet.scss';

export const queryFragment = graphql`
  fragment ProductionDetail on ProductionsJson {
    title {
      en
      fr
    }
    type
    description {
      en
      fr
    }
    content {
      en
      fr
    }
    activities {
      id
      name
    }
    people {
      id
      firstName
      lastName
    }
    productions {
      id
      description {
        en
        fr
      }
      slugs
      title {
        en
        fr
      }
      type
    }
    draft
    slugs
  }
`;

export default function ProductionDetail({lang, production}) {
  console.log(lang, production);

  return (
    <>
      <Nav />
      <main id="main-objet">
        <p className="titre-sticky">{production.title && (lang === "fr" ? production.title.fr : production.title.en ) }</p>
        <article id="article-contenu">
          {/* Toggle Langue */}
          <ToggleLang lang={lang} content={production.content} />
          {/* Chapô FR */}
          <hgroup className="fr" lang="fr">
            <h1>{production.title && (production.title.fr)}</h1>
            <h2>{production.description && (production.description.fr)}</h2>
            <p className="date">{production.endDate}</p>
            <p className="type-objet">{production.type}</p>
          </hgroup>
          {/* Article FR */}
          <div className="article-contenu fr" lang="fr">
            {production.content && ( production.content.fr && <RawHtml html={production.content.fr} /> )}
          </div>

          {/* Chapô EN */}
          <hgroup className="en" lang="en">
            <h1>{production.title && (production.title.en)}</h1>
            <h2>{production.description && (production.description.en)}</h2>
            <p className="date">{production.endDate}</p>
            <p className="type-objet">{production.type}</p>
          </hgroup>
          {/* Article EN */}
          <div className="article-contenu en" lang="en">
            {production.content && ( production.content.en && <RawHtml html={production.content.en} /> )}
          </div>

        </article>

        <div>
          {lang === "fr" ? "Personnes liées" + String.fromCharCode(8239) +":"  : "Related people:"}
          <ul>
            {(production.people || []).map(p => <li key={p.id}>{p.firstName} {p.lastName}</li>)}
          </ul>
        </div>
        <PublicationsAssocies publications={production.productions} lang={lang} />
        <FichiersAssocies />
      </main>
    </>
  );
}
