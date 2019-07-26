import React from 'react';
import {graphql} from 'gatsby';
import RawHtml from '../helpers/RawHtml.js';
import {Link} from 'gatsby';

import Nav from '../common/Nav.js';
import ToggleLang from './fragments/ToggleLang.js';
import DateNews from '../helpers/DateNews.js';
import TimeNews from '../helpers/TimeNews.js';
import {format as formatDate, getYear, parseISO} from 'date-fns';
import {IsModel} from '../helpers/helpers.js';

import Logo from '../assets/svg/logo_medialab.svg';
import ProcessedImage from '../helpers/ProcessedImage.js';

import ProductionsAssociees from './fragments/ProductionsAssociees.js';
import ActivitesAssociees from './fragments/ActivitesAssociees.js';
import MembresAssocies from './fragments/MembresAssocies.js';
import FichiersAssocies from './fragments/FichiersAssocies.js';

import LanguageFallback from '../helpers/LanguageFallback';

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
    attachments {
      label
      value
      type
    }
    type
    typeLabel {
      en
      fr
    }
    startDate
    endDate
    place
  }
`;

export default function NewsDetail({lang, news}) {



  return (
    <>
      <main id="main-objet" role="main" aria-label={lang === "fr" ? "Contenu de la page " + news.title.fr : news.title.en + " page content" }>

      <header id="titre-sticky" aria-hidden="true">
        <div id="container-titre-sticky">
          <div id="logo-sticky"><a href="/"><Logo /></a></div>
          <p>
            <Link to={lang === 'fr' ? '/actu' : '/en/news'}>
              <span data-icon="news">{lang === 'fr' ? "Actualité" : 'News'} </span>
            </Link>
            {news.title && <span className="title">
              <a href="#topbar"> <LanguageFallback lang={lang} translatedAttribute={news.title} /></a>
            </span>}
          </p>
        </div>
      </header>

        <div id="img-article" aria-hidden="true">
          <div className="activator"></div>
          <div className="container">
            <ProcessedImage size="large" image={news.coverImage && news.coverImage.processed && news.coverImage.processed.large} data={news}/>
          </div>

        </div>

        <article id="article-contenu">
          {/* Toggle Langue */}
          <ToggleLang lang={lang} content={news.content} />

          {/* FR */}
          <div className="block-lang fr" lang="fr">
            <hgroup>
              <h1 data-type="title"> <LanguageFallback lang={lang} translatedAttribute={news.title} /></h1>
              <h2 data-type="description"><RawHtml html={news.description && (news.description.fr)} /></h2>
            </hgroup>
            <div className="details">
              <p className="type-objet">
                <span data-icon="news"></span>
                <span className="type-news">{IsModel(news.type, "fr")}</span>
                {news.label ? <span>, {news.label.fr}</span> : ''}
              </p>
              <DateNews startDate={news.startDate} endDate={news.endDate} lang="fr" />
              <TimeNews startDate={news.startDate} endDate={news.endDate} />
              { news.place && <p className="place" aria-label={lang === "fr" ? "Lieu" : "Place" }>{news.place}</p> }
              <FichiersAssocies attachments={news.attachments} lang="fr" />
            </div>
            <div className="article-contenu">
              {news.content && (news.content.fr && <RawHtml html={news.content.fr} />)}
            </div>
          </div>

          {/* Chapô EN */}
          <div className="block-lang en" lang="en">
          <hgroup>
              <h1 data-type="title"><LanguageFallback lang={lang} translatedAttribute={news.title} /></h1>
              <h2 data-type="description"><RawHtml html={news.description && (news.description.en)} /></h2>
            </hgroup>
            <div className="details">
              <p className="type-objet">
                <span data-icon="news"></span>
                <span className="type-news">{IsModel(news.type, "en")}</span>
                {news.label ? <span>, {news.label.en}</span> : ''}
              </p>
              <DateNews startDate={news.startDate} endDate={news.endDate} lang="en" />
              <TimeNews startDate={news.startDate} endDate={news.endDate} />
              { news.place && <p className="place" aria-label={lang === "fr" ? "Lieu" : "Place" }>{news.place}</p> }
              <FichiersAssocies attachments={news.attachments} lang="en" />
            </div>
            <div className="article-contenu">
            {news.content && (news.content.en && <RawHtml html={news.content.en} />)}
            </div>
          </div>



        </article>

        <aside id="all-aside">
          <MembresAssocies people={news.people} lang={lang} />
          <ActivitesAssociees activities={news.activities} lang={lang} />
          <ProductionsAssociees productions={news.productions} lang={lang} />
        </aside>


      </main>
    </>
  );
}
