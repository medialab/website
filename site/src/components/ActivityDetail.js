import React from 'react';
import {graphql} from 'gatsby';

import {join} from './helpers';
import PublicationsAssocies from './fragments/pages/PublicationsAssocies.js';
import FichiersAssocies from './fragments/pages/FichiersAssocies.js';
import Nav from './fragments/Nav.js';
import ToggleLang from './fragments/pages/ToggleLang.js';

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
    slugs
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
          {/* Toggle Langue */}
          <ToggleLang lang={lang} content={activity.content} />
          {/* Chapô FR */}
          <hgroup className="fr" lang="fr">
            <h1>{activity.name}</h1>
            <h2>{activity.description && (activity.description.fr)}</h2>
            <p className="date">{activity.endDate}</p>
            <p className="type-objet">{activity.type}</p>
          </hgroup>
          {/* Article FR */}
          <div className="article-contenu fr" lang="fr">
            {activity.content && ( activity.content.fr && <RawHtml html={activity.content.fr} /> )}
          </div>

          {/* Chapô EN */}
          <hgroup className="en" lang="en">
            <h1>{activity.title && (activity.title.en)}</h1>
            <h2>{activity.description && (activity.description.en)}</h2>
            <p className="date">{activity.endDate}</p>
            <p className="type-objet">{activity.type}</p>
          </hgroup>
          {/* Article EN */}
          <div className="article-contenu en" lang="en">
            {activity.content && ( activity.content.en && <RawHtml html={activity.content.en} /> )}
          </div>

        </article>

        <div>
          {lang === "fr" ? "Personnes liées" + String.fromCharCode(8239) +":"  : "Related people:"}
          <ul>
            {(activity.people || []).map(p => <li key={p.id}>{p.firstName} {p.lastName}</li>)}
          </ul>
        </div>
        <PublicationsAssocies publications={activity.productions} lang={lang} />
        <FichiersAssocies />
  </main>
  );
}
