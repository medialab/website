import React from 'react';
import {graphql} from 'gatsby';
import HtmlFallback from '../helpers/HtmlFallback.js';
import {Link} from 'gatsby';

import {I18N_MODEL} from '../../i18n.js';
import ToggleLang from './fragments/ToggleLang.js';
import LogoSticky from './fragments/LogoSticky.js';
import ProcessedImage from '../helpers/ProcessedImage.js';
import DateNews from '../helpers/DateNews.js';
import TimeNews from '../helpers/TimeNews.js';
import {I18N_TYPE_LABELS} from '../../i18n.js';
import RelatedProductions from './fragments/RelatedProductions.js';
import RelatedActivities from './fragments/RelatedActivities.js';
import RelatedNews from './fragments/RelatedNews.js';
import RelatedPeople from './fragments/RelatedPeople.js';
import Attachments from './fragments/Attachments.js';
import LanguageFallback from '../helpers/LanguageFallback';
import PageMeta from '../helpers/PageMeta.js';

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
    permalink {
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
        raster {
          url
          width
          height
        }
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
      permalink {
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
      group
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
      place
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

const i18n = {
  fr: {
    content(activity) {
      return 'Contenu de la page ' + activity.name;
    },
    futureSeminars: 'Séances à venir',
    pastSeminars: 'Séances passées'
  },
  en: {
    content(activity) {
      return activity.name + ' page content';
    },
    futureSeminars: 'Upcoming sessions',
    pastSeminars: 'Past sessions'
  }
};

const mainPermalink = {
  fr: '/activites',
  en: '/en/activities'
};

export default function ActivityDetail({lang, activity, siteUrl}) {
  const inSeminar = activity.slugs[0] === 'seminaire-du-medialab';

  return (
    <main
      id="main-objet" role="main" className={inSeminar ? 'main-seminar' : ''}
      aria-label={i18n[lang].content(activity)}>
      <PageMeta
        title={`${activity.name} | médialab Sciences Po`}
        description={activity.baseline && activity.baseline[lang]}
        lang={lang}
        date={activity.startDate}
        imageData={activity.coverImage && activity.coverImage.processed && activity.coverImage.processed.raster}
        uri={`${siteUrl}${activity.permalink[lang]}`} />
      <ol style={{display: 'none'}} itemScope itemType="https://schema.org/BreadcrumbList">
        <li
          itemProp="itemListElement" itemScope
          itemType="https://schema.org/ListItem">
          <a
            itemType="https://schema.org/Organization"
            itemProp="item" href={siteUrl}>
            <span itemProp="name">médialab Sciences Po</span></a>
          <meta itemProp="position" content="1" />
        </li>
        <li
          itemProp="itemListElement" itemScope
          itemType="https://schema.org/ListItem">
          <a
            itemType="https://schema.org/Thing"
            itemProp="item"
            href={`${siteUrl}${mainPermalink[lang]}`}>
            <span itemProp="name">{I18N_MODEL[lang].activities}</span></a>
          <meta itemProp="position" content="2" />
        </li>
        <li
          itemProp="itemListElement" itemScope
          itemType="https://schema.org/ListItem">
          <a
            itemType="https://schema.org/Thing"
            itemProp="item"
            href={`${siteUrl}${activity.permalink[lang]}`}>
            <span itemProp="name">
              {activity.name}
            </span>
          </a>
          <meta itemProp="position" content="3" />
        </li>
      </ol>
      <header id="titre-sticky" aria_hidden="true">
        <div id="container-titre-sticky">
          <LogoSticky lang={lang} />
          <p>
            <Link to={mainPermalink[lang]}>
              <span data-icon="activite">{I18N_MODEL[lang].activities} </span>
            </Link>
            <span className="title"><a href="#topbar">{activity.name}</a></span>
          </p>
        </div>
      </header>


      <div id="img-article" >
        <div className="activator" />
        <div className="container" aria-hidden="true">
          <ProcessedImage size="large" image={activity.coverImage && activity.coverImage.processed && activity.coverImage.processed.large} data={activity} />
        </div>
      </div>


      <article id="article-contenu">

        <div className={`"block-lang ${lang}`} lang={lang}>
          <hgroup>
            <h1 data-level-2="title" itemProp="name">{activity.name}</h1>
            <h2 data-level-2="baseline">{activity.baseline && <LanguageFallback lang={lang} translatedAttribute={activity.baseline} />}</h2>
            <HtmlFallback
              Tag="h3"
              data-level-3="description"
              itemProp="description"
              content={activity.description}
              lang={lang} />
          </hgroup>
          <div className="details">
            <p className="type-objet"><span data-icon="activite" /> {I18N_TYPE_LABELS.activities[lang][activity.type]}</p>
            <DateNews
              isTimeSpan
              startDateSchemaProp={'foundingDate'}
              endDateSchemaProp={'dissolutionDate'}
              startDate={activity.startDate}
              endDate={activity.endDate}
              lang={lang} />
            <TimeNews startDate={activity.startDate} endDate={activity.endDate} />
            <Attachments attachments={activity.attachments} lang={lang} />
          </div>

          <HtmlFallback lang={lang} content={activity.content} className="article-contenu" />
        </div>
        {/* Toggle Langue */}
        <ToggleLang lang={lang} content={activity.content} to={activity.permalink} />

      </article>
      <aside id={inSeminar ? 'aside-seminar' : 'all-aside'} className={inSeminar ? 'in-seminar' : ''}>
        <RelatedPeople people={activity.people} lang={lang} />
        <RelatedActivities activities={activity.activities} lang={lang} />
        <RelatedProductions productions={activity.productions} lang={lang} />
        {
          inSeminar ? (
            <>
              <RelatedNews
                isSeminar filter={'future'} actu={activity.news}
                lang={lang} titles={{fr: i18n.fr.futureSeminars, en: i18n.en.futureSeminars}} />
              <RelatedNews
                isSeminar filter={'past'} actu={activity.news}
                lang={lang} titles={{fr: i18n.fr.pastSeminars, en: i18n.en.pastSeminars}} />
            </>
          ) : (
            <RelatedNews isSeminar={inSeminar} actu={activity.news} lang={lang} />
          )
        }
      </aside>
    </main>
  );
}
