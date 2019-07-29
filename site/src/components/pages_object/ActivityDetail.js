import React from 'react';
import {graphql} from 'gatsby';
import RawHtml from '../helpers/RawHtml.js';
import {Link} from 'gatsby';

import {join} from '../helpers/helpers.js';
import ToggleLang from './fragments/ToggleLang.js';

import Logo from '../assets/svg/logo_medialab.svg';
import ProcessedImage from '../helpers/ProcessedImage.js';


import DateNews from '../helpers/DateNews.js';
import TimeNews from '../helpers/TimeNews.js';
import {format as formatDate, getYear, parseISO} from 'date-fns';
import {IsModel} from '../helpers/helpers.js';

import ProductionsAssociees from './fragments/ProductionsAssociees.js';
import ActivitesAssociees from './fragments/ActivitesAssociees.js';
import ActuAssociees from './fragments/ActuAssociees.js';
import MembresAssocies from './fragments/MembresAssocies.js';
import FichiersAssocies from './fragments/FichiersAssocies.js';
import LanguageFallback from '../helpers/LanguageFallback';

//import './scss/page_objet.scss';


export const queryFragment = graphql`
  fragment ActivityDetail on ActivitiesJson {
    name
    type
    slugs
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
      active
      membership
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
      coverImage {
        processed {
          medium
        }
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

  return (
    <main id="main-objet" role="main" aria-label={lang === "fr" ? "Contenu de la page " + activity.name : activity.name + "  page content" }>

      <header id="titre-sticky" aria_hidden="true">
        <div id="container-titre-sticky">
          <div id="logo-sticky"><a href="/"><Logo /></a></div>
          <p>
            <Link to={lang === 'fr' ? '/activites' : '/en/activities'}>
              <span data-icon="activite">{lang === 'fr' ? "Activité" : 'Activity'} </span>
            </Link>
              <span className="title"><a href="#topbar">{activity.name}</a></span>
          </p>
        </div>
      </header>


      <div id="img-article" >
        <div className="activator"></div>
        <div className="container" aria-hidden="true">
          <ProcessedImage size="large" image={activity.coverImage  && activity.coverImage.processed && activity.coverImage.processed.large} data={activity} />
        </div>
      </div>


      <article id="article-contenu">
        {/* Toggle Langue */}
        <ToggleLang lang={lang} content={activity.content} />

        {/* FR */}
        <div className="block-lang fr" lang="fr">
          <hgroup>
            <h1  data-level-2="title">{activity.name}</h1>
            <h2  data-level-2="baseline">{activity.baseline && <LanguageFallback lang={lang} translatedAttribute={activity.baseline} />}</h2>
            <h3  data-level-3="description"><RawHtml html={activity.description && activity.description.fr} /></h3>
          </hgroup>
          <div className="details">
            <p className="type-objet"><span data-icon="activite"></span> {IsModel(activity.type, "fr")}</p>
            <DateNews isTimeSpan startDate={activity.startDate} endDate={activity.endDate} lang="fr" />
            <TimeNews startDate={activity.startDate} endDate={activity.endDate} />
            <FichiersAssocies attachments={activity.attachments} lang="fr" />
          </div>


          <div className="article-contenu">
            {activity.content && (activity.content.fr && <RawHtml html={activity.content.fr} />)}
          </div>
        </div>

        {/* EN */}
        <div className="block-lang en" lang="en">
          <hgroup>
            <h1  data-level-2="title">{activity.name}</h1>
            <h2   data-level-2="baseline">{activity.baseline && <LanguageFallback lang={lang} translatedAttribute={activity.baseline} />}</h2>
            <h3  data-level-3="description"><RawHtml html={activity.description && activity.description.en} /></h3>
          </hgroup>
          <div className="details">
            <p className="type-objet"><span data-icon="activite"></span> {IsModel(activity.type, "en")}</p>
            <DateNews isTimeSpan startDate={activity.startDate} endDate={activity.endDate} lang="en" />
            <TimeNews startDate={activity.startDate} endDate={activity.endDate} />
            <FichiersAssocies attachments={activity.attachments} lang="en" />
          </div>
          <div className="article-contenu">
            {activity.content && (activity.content.en && <RawHtml html={activity.content.en} />)}
          </div>
        </div>

      </article>
      <aside id="all-aside">
        <MembresAssocies people={activity.people} lang={lang} />
        <ActivitesAssociees activities={activity.activities} lang={lang} />
        <ProductionsAssociees productions={activity.productions} lang={lang} />
        <ActuAssociees isSeminar={activity.slugs.join().includes('seminaire')} actu={activity.news} lang={lang} />
      </aside>

    </main>
  );
}
