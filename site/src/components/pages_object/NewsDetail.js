import React from 'react';
import {graphql} from 'gatsby';
import RawHtml from '../helpers/RawHtml.js';

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

  let coverImage = null;

  if (news.coverImage) {
    coverImage = (
      <ProcessedImage size="large" image={news.coverImage.processed ? news.coverImage.processed.large : null} />
    );
  }


  return (
    <>
      <main id="main">

      <header id="titre-sticky">
        <div id="container-titre-sticky">
          <div id="logo-sticky"><a href="/"><Logo /></a></div>
          <p><a href="#topbar"><span data-icon="news"></span>{news.title && (lang === 'fr' ? news.title.fr : news.title.en) }</a></p>
        </div>
      </header>

        <div id="img-article">
          <div className="activator"></div>
          <div className="container">{coverImage}</div>

        </div>

        <article id="article-contenu">
          {/* Toggle Langue */}
          <ToggleLang lang={lang} content={news.content} />

          {/* FR */}
          <div className="block-lang fr" lang="fr">
            <hgroup>
              <h1 data-type="title">{news.title && (news.title.fr)}</h1>
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
              <FichiersAssocies attachments={news.attachments} lang="fr" />
            </div>
            <div className="article-contenu">
              {news.content && (news.content.fr && <RawHtml html={news.content.fr} />)}
            </div>
          </div>

          {/* Chapô EN */}
          <div className="block-lang en" lang="en">
          <hgroup>
              <h1 data-type="title">{news.title && (news.title.en)}</h1>
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
