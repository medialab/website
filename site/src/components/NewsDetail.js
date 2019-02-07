import React from 'react';
import {graphql} from 'gatsby';

import PublicationsAssocies from './fragments/pages/PublicationsAssocies.js';
import FichiersAssocies from './fragments/pages/FichiersAssocies.js';
import Nav from './fragments/Nav.js';

import RawHtml from './RawHtml';

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
  }
`;

export default function NewsDetail({lang, news}) {
  console.log(lang, news);

  return (
    <>
      <Nav />
      <main id="main-objet">
        <p class="titre-sticky"></p>
        <article id="article-contenu">
          <hgroup>
            <h1>{news.title.fr || news.title.en}</h1>
            <h2>{news.description && news.description.fr}</h2>
            <p class="date">{news.endDate}</p>
            <p class="type-objet">{news.type}</p>
          </hgroup>
          <div class="article-contenu">
          {news.content && news.content.fr && <RawHtml html={news.content.fr} />}
          </div>
        </article>
        <div>
          Related people:
          <ul>
            {(news.people || []).map(p => <li key={p.id}>{p.firstName} {p.lastName}</li>)}
          </ul>
        </div>
        <PublicationsAssocies />
        <FichiersAssocies />
      </main>
    </>
  );
}
