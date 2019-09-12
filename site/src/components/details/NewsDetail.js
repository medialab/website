import React from 'react';
import {graphql} from 'gatsby';
import HtmlFallback from '../helpers/HtmlFallback.js';
import {Link} from 'gatsby';

import ToggleLang from './fragments/ToggleLang.js';
import DateNews from '../helpers/DateNews.js';
import TimeNews from '../helpers/TimeNews.js';
import {I18N_MODEL, I18N_TYPE_LABELS} from '../../i18n.js';

import LogoSticky from './fragments/LogoSticky.js';
import ProcessedImage from '../helpers/ProcessedImage.js';

import RelatedProductions from './fragments/RelatedProductions.js';
import RelatedActivities from './fragments/RelatedActivities.js';
import RelatedPeople from './fragments/RelatedPeople.js';
import Attachments from './fragments/Attachments.js';

import LanguageFallback from '../helpers/LanguageFallback';
import PageMeta from '../helpers/PageMeta.js';

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
    permalink {
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
    }
    draft
    activities {
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
      name
      type
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
    attachments {
      label
      value
      type
    }
    type
    startDate
    endDate
    place
  }
`;

const i18n = {
  fr: {
    contentAriaLabel(news) {
      return `Contenu de la page ${news.title.fr || news.title.en}`;
    },
    place: 'Lieu'
  },
  en: {
    contentAriaLabel(news) {
      return `${news.title.en || news.title.fr} page content`;
    },
    place: 'Place'
  }
};

const mainPermalink = {
  fr: '/actu',
  en: '/en/news'
};

export default function NewsDetail({lang, news, siteUrl}) {
  return (
    <>
      <PageMeta
        title={`${news.title[lang]} | médialab Sciences Po`}
        description={news.description && news.description[lang]}
        zoteroType={news.type === 'post' ? 'blogPost' : undefined}
        author={news.type === 'post' ? news.people.map(p => `${p.lastName} ${p.firstName}`).join(', ') : undefined}
        imageData={news.coverImage && news.coverImage.processed && news.coverImage.processed.raster}
        uri={news.permalink[lang]}
        lang={lang} />
      <main
        itemScope itemProp={news.type !== 'post' ? 'event' : 'subjectOf'} itemType={news.type !== 'post' ? 'https://schema.org/Event' : 'https://schema.org/CreativeWork'}
        id="main-objet" role="main" aria-label={i18n[lang].contentAriaLabel(news)}>

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
              href={`${siteUrl}${mainPermalink[lang]}`}
              itemProp="item">
              <span itemProp="name">{I18N_MODEL[lang].news}</span></a>
            <meta itemProp="position" content="2" />
          </li>
          <li
            itemProp="itemListElement" itemScope
            itemType="https://schema.org/ListItem">
            <a
              itemType="https://schema.org/Thing"
              href={`${siteUrl}${news.permalink[lang]}`}
              itemProp="item">
              <span itemProp="name">
                <LanguageFallback lang={lang} translatedAttribute={news.title} />
              </span>
            </a>
            <meta itemProp="position" content="3" />
          </li>
        </ol>

        <header id="titre-sticky" aria-hidden="true">
          <div id="container-titre-sticky">
            <LogoSticky lang={lang} />
            <p>
              <Link to={mainPermalink[lang]}>
                <span data-icon="news">{I18N_MODEL[lang].news} </span>
              </Link>
              {news.title && (
                <span className="title">
                  <a href="#topbar" itemProp="name"> <LanguageFallback lang={lang} translatedAttribute={news.title} /></a>
                </span>
              )}
            </p>
          </div>
          {news.place && (
            <div
              style={{display: 'none'}}
              itemProp="location"
              itemScope
              itemType="https://schema.org/Place">
              <span itemProp="address">{news.place}</span>
            </div>
          )}
        </header>

        <div id="img-article" aria-hidden="true">
          <div className="activator" />
          <div className="container">
            <ProcessedImage size="large" image={news.coverImage && news.coverImage.processed && news.coverImage.processed.large} data={news} />
          </div>

        </div>

        <article id="article-contenu">

          <div className={`block-lang ${lang}`} lang={lang}>
            <hgroup>
              <h1 data-type="title"> <LanguageFallback lang={lang} translatedAttribute={news.title} /></h1>
              <HtmlFallback
                Tag="h2" data-type="description" content={news.description}
                lang={lang} />
            </hgroup>
            <div className="details">
              <p className="type-objet">
                <span data-icon="news" />
                <span className="type-news">{I18N_TYPE_LABELS.news[lang][news.type]}</span>
                {news.label && news.label[lang] ? <span>, {news.label[lang]}</span> : ''}
              </p>
              <DateNews startDate={news.startDate} endDate={news.endDate} lang={lang}
                prefix={(news.type === 'notice' && news.label.en === 'Job') ? {fr: 'Date limite : ', en: 'Deadline: '} : undefined} />
              <TimeNews startDate={news.startDate} endDate={news.endDate} />
              {news.place && (
                <p
                  className="place"
                  itemProp="location"
                  itemScope
                  itemType="https://schema.org/Place"
                  aria-label={i18n[lang].place}>
                  <span itemProp="address">{news.place}</span>
                </p>
              )}
              <Attachments attachments={news.attachments} lang={lang} />
            </div>
            <HtmlFallback lang={lang} content={news.content} className="article-contenu" />
          </div>
            {/* Toggle Langue */}
            <ToggleLang lang={lang} content={news.content} to={news.permalink} />

        </article>

        <aside id="all-aside">
          <RelatedPeople schemaRelationProp={news.type === 'post' ? 'author' : 'organizer'} people={news.people} lang={lang} />
          <RelatedActivities activities={news.activities} lang={lang} />
          <RelatedProductions productions={news.productions} lang={lang} />
        </aside>
      </main>
    </>
  );
}
