import React from 'react';
import {graphql} from 'gatsby';

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
    }
    draft
  }
`;

export default function ProductionDetail({lang, production}) {
  console.log(lang, production);

  return (
    <main id="main-objet">
      <p class="titre-sticky">{production.name}</p>
      <article id="article-contenu">
        <hgroup>
          <h1>{production.name}{production.baseline && production.baseline.fr}</h1>
          <h2>{production.description && production.description.fr}</h2>

          <p class="date">{production.endDate}</p>
          <p class="type-objet">{production.type}</p>

        </hgroup>

        <div class="article-contenu">
        {production.content && production.content.fr && <RawHtml html={production.content.fr} />}
        </div>
      </article>

      <div>
        Related people:
        <ul>
          {(production.people || []).map(p => <li key={p.id}>{p.firstName} {p.lastName}</li>)}
        </ul>
      </div>
  </main>
  );
}
