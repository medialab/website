import React from 'react';
import HtmlFallback from '../helpers/HtmlFallback.js';
import Link from '../helpers/Link';

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

const i18n = {
  fr: {
    content(activity) {
      return 'Contenu de la page ' + (activity.name.fr || activity.name.en);
    },
    futureSeminars: 'Séances à venir',
    pastSeminars: 'Séances passées',
    activityFinished: 'Activité terminée'
  },
  en: {
    content(activity) {
      return (activity.name.fr || activity.name.en) + ' page content';
    },
    futureSeminars: 'Upcoming sessions',
    pastSeminars: 'Past sessions',
    activityFinished: 'Finished activity'
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
      id="main-objet"
      role="main"
      className={inSeminar ? 'main-seminar' : ''}
      aria-label={i18n[lang].content(activity)}>
      <PageMeta
        title={`${activity.name.fr || activity.name.en} | médialab Sciences Po`}
        description={activity.baseline && activity.baseline[lang]}
        lang={lang}
        date={activity.startDate}
        imageData={
          activity.coverImage &&
          activity.coverImage.processed &&
          activity.coverImage.processed.raster
        }
        uri={`${siteUrl}${activity.permalink[lang]}`}
      />
      <ol
        style={{display: 'none'}}
        itemScope
        itemType="https://schema.org/BreadcrumbList">
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem">
          <a
            itemType="https://schema.org/Organization"
            itemProp="item"
            href={siteUrl}>
            <span itemProp="name">médialab Sciences Po</span>
          </a>
          <meta itemProp="position" content="1" />
        </li>
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem">
          <a
            itemType="https://schema.org/Thing"
            itemProp="item"
            href={`${siteUrl}${mainPermalink[lang]}`}>
            <span itemProp="name">{I18N_MODEL[lang].activities}</span>
          </a>
          <meta itemProp="position" content="2" />
        </li>
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem">
          <a
            itemType="https://schema.org/Thing"
            itemProp="item"
            href={`${siteUrl}${activity.permalink[lang]}`}>
            <span itemProp="name">{activity.name.fr || activity.name.en}</span>
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
            <span className="title">
              <a href="#topbar">{activity.name.fr || activity.name.en}</a>
            </span>
          </p>
        </div>
      </header>

      <div id="img-article">
        <div className="activator" />
        <div className="container" aria-hidden="true">
          <ProcessedImage
            size="large"
            image={
              activity.coverImage &&
              activity.coverImage.processed &&
              activity.coverImage.processed.large
            }
            data={activity}
          />
        </div>
      </div>

      <article id="article-contenu">
        <div className={`"block-lang ${lang}`} lang={lang}>
          <hgroup>
            <h1 data-level-2="title" itemProp="name">
              {activity.name.fr || activity.name.en}
            </h1>
            {!activity.active && (
              <div className="former-activity">
                {i18n[lang].activityFinished}
              </div>
            )}
            <h2 data-level-2="baseline">
              {activity.baseline && (
                <LanguageFallback
                  lang={lang}
                  translatedAttribute={activity.baseline}
                />
              )}
            </h2>
            <HtmlFallback
              wrapper="h3"
              data-level-3="description"
              itemProp="description"
              content={activity.description}
              lang={lang}
            />
          </hgroup>
          <div className="details">
            <p className="type-objet">
              <span data-icon="activite" />{' '}
              {I18N_TYPE_LABELS.activities[lang][activity.type]}
            </p>
            <DateNews
              isTimeSpan
              startDateSchemaProp={'foundingDate'}
              endDateSchemaProp={'dissolutionDate'}
              startDate={activity.startDate}
              endDate={activity.endDate}
              lang={lang}
            />
            <TimeNews
              startDate={activity.startDate}
              endDate={activity.endDate}
            />
            <Attachments attachments={activity.attachments} lang={lang} />
          </div>

          <HtmlFallback
            lang={lang}
            content={activity.content}
            className="article-contenu"
          />
        </div>
        {/* Toggle Langue */}
        <ToggleLang
          lang={lang}
          content={activity.content}
          to={activity.permalink}
        />
      </article>
      <aside
        id={inSeminar ? 'aside-seminar' : 'all-aside'}
        className={inSeminar ? 'in-seminar' : ''}>
        <RelatedPeople people={activity.people} lang={lang} />
        <RelatedActivities activities={activity.activities} lang={lang} />
        <RelatedProductions productions={activity.productions} lang={lang} />
        {inSeminar ? (
          <>
            <RelatedNews
              isSeminar
              filter={'future'}
              actu={activity.news}
              lang={lang}
              titles={{fr: i18n.fr.futureSeminars, en: i18n.en.futureSeminars}}
            />
            <RelatedNews
              isSeminar
              filter={'past'}
              actu={activity.news}
              lang={lang}
              titles={{fr: i18n.fr.pastSeminars, en: i18n.en.pastSeminars}}
            />
          </>
        ) : (
          <RelatedNews isSeminar={inSeminar} actu={activity.news} lang={lang} />
        )}
      </aside>
    </main>
  );
}
