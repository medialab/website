import React from 'react';
import {graphql} from 'gatsby';

import {join} from './helpers';
import RawHtml from './RawHtml';

import './scss/page_objet.scss';


export const queryFragment = graphql`
  fragment ActivityDetail on ActivitiesJson {
    name
    type
    baseline {
      en
      fr
    }
    description {
      en
      fr
    }
    endDate
    type
    content {
      en
      fr
    }
    people {
      id
      firstName
      lastName
    }
    active
    draft
  }
`;

export default function ActivityDetail({lang, activity}) {
  console.log(lang, activity);

  const people = activity.people.map(p => {
    return <span key={p.id}>{p.firstName} {p.lastName}</span>;
  });

  return (
    <main id="main-objet">
      <p className="titre-sticky">{activity.name}</p>
      <article id="article-contenu">
        <hgroup>
          <h1>{activity.name}{activity.baseline && activity.baseline.fr}</h1>
          <h2>{activity.description && activity.description.fr}</h2>

          <p className="date">{activity.endDate}</p>
          <p className="type-objet">{activity.type}</p>

        </hgroup>

        <div className="article-contenu">
        {activity.content && activity.content.fr && <RawHtml html={activity.content.fr} />}
        </div>
      </article>

      <div>
        Related people: {join(people, ', ')}
      </div>
  </main>
  );
}

