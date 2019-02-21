import React from 'react';
import {graphql} from 'gatsby';

import PublicationsAssocies from './fragments/pages/PublicationsAssocies.js';
import FichiersAssocies from './fragments/pages/FichiersAssocies.js';
import Nav from './fragments/Nav.js';
import ToggleLang from './fragments/pages/ToggleLang.js';

import RawHtml from './RawHtml';
import './scss/page_objet.scss';

export const queryFragment = graphql`
  fragment NewsDetail on NewsJson {
    title {
      en
      fr
    }
    description {
      en
      fr
    }
    label {
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
    }
    draft
    slugs
  }
`;

export default function NewsDetail({lang, news}) {
  console.log(lang, news);

  return (
    <>
      <Nav />
      <main id="main-objet">
        <p className="titre-sticky">{news.title && (lang === "fr" ? news.title.fr : news.title.en ) }</p>
        <article id="article-contenu">
          {/* Toggle Langue */}
          <ToggleLang lang={lang} content={news.content} />
          {/* Chapô FR */}
          <hgroup className="fr" lang="fr">
            <h1>{news.title && (news.title.fr)}</h1>
            <h2>{news.description && (news.description.fr)}</h2>
            <p className="date">{news.endDate}</p>
            <p className="type-objet">{news.type}</p>
          </hgroup>
          {/* Article FR */}
          <div className="article-contenu fr" lang="fr">
            {news.content && ( news.content.fr && <RawHtml html={news.content.fr} /> )}
          </div>

          {/* Chapô EN */}
          <hgroup className="en" lang="en">
            <h1>{news.title && (news.title.en)}</h1>
            <h2>{news.description && (news.description.en)}</h2>
            <p className="date">{news.endDate}</p>
            <p className="type-objet">{news.type}</p>
          </hgroup>
          {/* Article EN */}
          <div className="article-contenu en" lang="en">
            {news.content && ( news.content.en && <RawHtml html={news.content.en} /> )}
          </div>

        </article>

        <div>
          {lang === "fr" ? "Personnes liées" + String.fromCharCode(8239) +":"  : "Related people:"}
          <ul>
            {(news.people || []).map(p => <li key={p.id}>{p.firstName} {p.lastName}</li>)}
          </ul>
        </div>
        <PublicationsAssocies publications={news.productions} lang={lang} />
        <FichiersAssocies />
      </main>
    </>
  );
}
