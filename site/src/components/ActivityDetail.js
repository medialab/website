import React from 'react';
import {graphql} from 'gatsby';
import RawHtml from './helpers/RawHtml.js';

import {join} from './helpers/helpers';
import Nav from './common/Nav.js';
import ToggleLang from './helpers/ToggleLang.js';

import DateNews from './helpers/DateNews.js';
import TimeNews from './helpers/TimeNews.js';
import {format as formatDate, getYear, parseISO} from 'date-fns';
import {IsModel} from './helpers/helpers.js';

import ProductionsAssociees from './pages_list/ProductionsAssociees.js';
import ActivitesAssociees from './pages_list/ActivitesAssociees.js';
import ActuAssociees from './pages_list/ActuAssociees.js';
import MembresAssocies from './pages_list/MembresAssocies.js';
import FichiersAssocies from './pages_list/FichiersAssocies.js';

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
    productions {
      title {
        en
        fr
      }
      authors
      groupLabel {
        en
        fr
      }
      permalink {
        en
        fr
      }
      description {
        en
        fr
      }
    }
    news {
      title {
        en
        fr
      }
      type
      description {
        en
        fr
      }
      permalink {
        en
        fr
      }
      startDate
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
      <Nav lang={lang} data={activity} order={['main', 'people', 'productions', 'activities', 'news', 'attachments']} />
      <p className="titre-sticky"><a href="#main-objet"><span data-icon="activite"></span><span className="title">{activity.name}</span></a></p>
      <article id="article-contenu">
        {/* Toggle Langue */}
        <ToggleLang lang={lang} content={activity.content} />

        {/* FR */}
        <div className="block-lang fr" lang="fr">
          <hgroup>
            <h1  data-level-2="baseline">{activity.name}</h1>
            <h2  className="h2-bold" data-level-2="baseline">{activity.baseline && (activity.baseline.fr || activity.baseline.en)}</h2>
            <h3  data-level-3="description"><RawHtml html={activity.description && activity.description.fr} /></h3>
          </hgroup>
          <div class="details">
            <p className="type-objet"><span data-icon="activite"></span> {IsModel(activity.type, "fr")}</p>
            <p className="date">
              <DateNews startDate={activity.startDate} endDate={activity.endDate} lang="fr" />
              <TimeNews startDate={activity.startDate} endDate={activity.endDate} />
            </p>
          </div>
          <div className="article-contenu">
            {activity.content && (activity.content.fr && <RawHtml html={activity.content.fr} />)}
          </div>
        </div>

        {/* FR */}
        <div className="block-lang en" lang="en">
          <hgroup>
            <h1  data-level-2="baseline">{activity.name}</h1>
            <h2  className="h2-bold" data-level-2="baseline">{activity.baseline && (activity.baseline.en || activity.baseline.fr)}</h2>
            <h3  data-level-3="description"><RawHtml html={activity.description && activity.description.en} /></h3>
          </hgroup>
          <div class="details">
            <p className="type-objet"><span data-icon="activite"></span> {IsModel(activity.type, "en")}</p>
            <p className="date">
              <DateNews startDate={activity.startDate} endDate={activity.endDate} lang="en" />
              <TimeNews startDate={activity.startDate} endDate={activity.endDate} />
            </p>
          </div>
          <div className="article-contenu">
            {activity.content && (activity.content.en && <RawHtml html={activity.content.en} />)}
          </div>
        </div>

      </article>
      <MembresAssocies people={activity.people} lang={lang} />
      <ProductionsAssociees productions={activity.productions} lang={lang} />
      <ActivitesAssociees activities={activity.activities} lang={lang} />
      <ActuAssociees actu={activity.news} lang={lang} />
      <FichiersAssocies attachments={activity.attachments} lang={lang} />
    </main>
  );
}
