import React from 'react';
import {graphql} from 'gatsby';

import PublicationsAssociees from './fragments/pages/PublicationsAssociees.js';
import Nav from './fragments/Nav.js';
import ToggleLang from './fragments/pages/ToggleLang.js';

import RawHtml from './RawHtml';
//import './scss/page_objet.scss';

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
    coverImage {
      url
    }
    people {
      id
      firstName
      lastName
    }
    activities {
      id
      description {
        en
        fr
      }
      name
      type
    }
    productions {
      id
      description {
        en
        fr
      }
      title {
        en
        fr
      }
      type
    }
    draft
  }
`;

const relatedElements = [
	{
		id: 'main-objet',
		en: 'Main article',
		fr: 'Article principal',
	},
	{
		id: 'productions-associes',
		exist : ({productions}) => Boolean(productions),
		en: 'Related poduction',
		fr: 'Production en liens'
	},
	{
		id: 'activites-associees',
		exist : ({activities}) => Boolean(activities),
		en: 'Related Activities',
		fr: 'Activités en lien',
	},
	{
		id: 'fichiers-associes',
		exist : ({files}) => Boolean(files),
		en: 'Related files',
		fr: 'Fichiers associés'
	},
	{
		id: 'membres-associes',
		exist : ({people}) => Boolean(people),
		en: 'Related people',
		fr: 'Membres en lien'
	},
];

export default function ProductionDetail({lang, production}) {

  return (
    <>
      <Nav lang={lang} object={production} related={relatedElements} />
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
        <PublicationsAssociees publications={production.productions} context="productions" lang={lang}/>
      </main>
    </>
  );
}
