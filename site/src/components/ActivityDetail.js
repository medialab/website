import React from 'react';
import {graphql} from 'gatsby';
import RawHtml from './RawHtml.js';

import {join} from './helpers';
import Nav from './fragments/Nav.js';
import ToggleLang from './fragments/pages/ToggleLang.js';

import DateNews from './fragments/DateNews.js';
import TimeNews from './fragments/TimeNews.js';
import {format as formatDate, getYear, parseISO} from 'date-fns';
import {IsModel} from './helpers.js';

import ProductionsAssociees from './fragments/pages/ProductionsAssociees.js';
import ActivitesAssociees from './fragments/pages/ActivitesAssociees.js';
import ActuAssociees from './fragments/pages/ActuAssociees.js';
import MembresAssocies from './fragments/pages/MembresAssocies.js';
import FichiersAssocies from './fragments/pages/FichiersAssocies.js';

//import './scss/page_objet.scss';


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
    startDate
    endDate
    type
    content {
      en
      fr
    }
    coverImage {
      url
      processed {
        medium
        large
      }
    }
    people {
      firstName
      lastName
      role {
        en
        fr
      }
      permalink {
        en
        fr
      }
      coverImage {
        url
      }
    }
    activities {
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
    }
    attachments {
      type
    }
    active
    draft
    attachments {
      label
      value
      type
    }
  }
`;

export default function ActivityDetail({lang, activity}) {
  console.log(lang, activity);

  return (
    <main id="main-objet">
      <Nav lang={lang} data={activity} order={['main', 'people', 'productions', 'activities', 'attachments']} />
      <p className="titre-sticky">{activity.name}</p>
      <article id="article-contenu">
        {/* Toggle Langue */}
        <ToggleLang lang={lang} content={activity.content} />
        {/* Chapô FR */}
        <hgroup className="fr" lang="fr">
          <h1>{activity.name}</h1>
          <h2 data-type="description"><RawHtml html={activity.description && activity.description.fr} /></h2>
          <p className="type-objet">{IsModel(activity.type, "fr")}</p>
          <div className="time">
            <DateNews startDate={activity.startDate} endDate={activity.endDate} lang={lang} />
            <TimeNews startDate={activity.startDate} endDate={activity.endDate} />
          </div>
        </hgroup>
        {/* Article FR */}
        <div className="article-contenu fr" lang="fr">
          {activity.content && (activity.content.fr && <RawHtml html={activity.content.fr} />)}
        </div>

        {/* Chapô EN */}
        <hgroup className="en" lang="en">
          <h1>{activity.title && (activity.title.en)}</h1>
          <h2 data-type="description"><RawHtml html={activity.description && activity.description.en} /></h2>
          <p className="date">{activity.endDate}</p>
          <p className="type-objet">{IsModel(activity.type, "en")}</p>
        </hgroup>
        {/* Article EN */}
        <div className="article-contenu en" lang="en">
          {activity.content && (activity.content.en && <RawHtml html={activity.content.en} />)}
        </div>

      </article>
      <MembresAssocies people={activity.people} lang={lang} />
      <ProductionsAssociees productions={activity.productions} lang={lang} />
      <ActivitesAssociees activities={activity.activities} lang={lang} />
      <FichiersAssocies attachments={activity.attachments} lang={lang} />
    </main>
  );
}
