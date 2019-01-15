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
    assets {
      base
      publicURL
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

export default function ProductionDetail({lang, data}) {
  console.log(lang, data);

  return (
    <main id="main-objet">
      <p class="titre-sticky">{data.name}</p>
      <article id="article-contenu">
        <hgroup>
          <h1>{data.name}{data.baseline && data.baseline.fr}</h1>
          <h2>{data.description && data.description.fr}</h2>

          <p class="date">{data.endDate}</p>
          <p class="type-objet">{data.type}</p>
          
        </hgroup>

        <div class="article-contenu">
        {data.content && data.content.fr && <RawHtml html={data.content.fr} />}
        </div>
      </article>

      <div>
        Related people:
        <ul>
          {(data.people || []).map(p => <li key={p.id}>{p.firstName} {p.lastName}</li>)}
        </ul>
      </div>
  </main>
  );
}
