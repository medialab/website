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
      slugs
      name
      type
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

  /*
  // Definir les valeurs à envoyer à l'élément Nav
  object = {
    nature: "Production",
    image: production.coverImage.url,
    imageProcessed: ,
    related: {
      default: {
        id: main-objet,
        exist : true,
        en: Main article // le titre de cette élément doit changer si Page Personne : Biography
        fr: Article principal // le titre de cette élément doit changer si Page Personne : Biographie
      }
      production: {
        id: productions-associes,
        exist : {production.productions ? true : false},
        en: Related poduction,
        fr: Production en liens
      }
      activities: {
        id: activites-associees,
        exist : {production.activities ? true : false},
        en: Related Activities,
        fr: Activité en lien
      },
      files: {
        id: fichiers-associes,
        exist : {production.files ? true : false},
        en: Related files,
        fr: Fichier associés
      },
      people: {
        id: membres-associes,
        exist : {production.people ? true : false},
        en: Related people,
        fr: Membres en lien
      },
    }
  }*/


  return (
    <>
      <Nav lang={lang} object={production} />
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
