import React from 'react';
import HtmlFallback from '../helpers/HtmlFallback.js';
import DateNews from '../helpers/DateNews.js';
import Link from '../helpers/Link';

import ToggleLang from './fragments/ToggleLang.js';
import {
  productionTypeToSchemaURL,
  productionTypeToZoteroType
} from '../helpers/helpers.js';
import {I18N_TYPE_LABELS, I18N_GROUP_LABELS} from '../../i18n.js';
import LogoSticky from './fragments/LogoSticky.js';
import RelatedProductions from './fragments/RelatedProductions.js';
import RelatedActivities from './fragments/RelatedActivities.js';
import RelatedNews from './fragments/RelatedNews.js';
import RelatedPeople from './fragments/RelatedPeople.js';

import PageMeta from '../helpers/PageMeta.js';

import RawHtml from '../helpers/RawHtml.js';

const i18n = {
  fr: {
    contentAriaLabel: 'Contenu de la page'
  },
  en: {
    contentAriaLabel: 'Page content'
  }
};

const mainPermalink = {
  fr: '/productions',
  en: '/en/productions'
};

const LangBlock = ({production, lang}) => {
  const otherLang = lang === 'fr' ? 'en' : 'fr';

  const description =
    (production.description &&
      (production.description[lang] || production.description[otherLang])) ||
    production.url;

  let ref = (
    <span>
      <span>
        <RawHtml html={description} wrapper="span" />
        {production.url ? ' ⤤' : ''}
      </span>
    </span>
  );

  if (production.url) {
    ref = (
      <p itemProp="description" className="p-ref">
        <a
          itemProp="url"
          href={production.url}
          target="_blank"
          rel="noopener noreferrer">
          {ref}
        </a>
      </p>
    );
  }

  return (
    <div className={`block-lang ${lang}`} lang={lang}>
      <hgroup>
        <h1 itemProp="name" data-level-1="title">
          {production.title[lang] || production.title[otherLang]}
        </h1>
        {production.authors && (
          <h2 data-level-2="authors">
            <span>{production.authors}</span>
          </h2>
        )}
      </hgroup>
      <div className="details">
        <p className="type-objet">
          <span data-icon="production" />{' '}
          {I18N_GROUP_LABELS.productions[lang][production.group]} –{' '}
          {I18N_TYPE_LABELS.productions[lang][production.type]}
        </p>
        <DateNews
          startDateSchemaProp="datePublished"
          startDate={production.date}
          lang={lang}
        />
        {ref}
      </div>
      <HtmlFallback
        lang={lang}
        content={production.content}
        className="article-contenu"
        itemProp="headline"
      />
    </div>
  );
};

function createProductionTitle(lang, production) {
  let title = production.title;

  if (title) title = title[lang] || title.fr || title.en;

  return (
    (title ? `${title}. ` : '') +
    `${production.authors}` +
    (production.date ? ` (${production.date})` : '') +
    ' | médialab Sciences Po'
  );
}

export default function ProductionDetail({lang, production, siteUrl}) {
  const otherLang = lang === 'fr' ? 'en' : 'fr';
  return (
    <>
      <PageMeta
        title={createProductionTitle(lang, production)}
        citationTitle={production.title && production.title[lang]}
        zoteroType={productionTypeToZoteroType(production.type)}
        description={production.content && production.content[lang]}
        date={production.date}
        author={production.authors.split(', ')}
        lang={lang}
        type={production.type}
        imageData={
          production.coverImage &&
          production.coverImage.processed &&
          production.coverImage.processed.raster
        }
        uri={`${siteUrl}${mainPermalink[lang]}`}
        citation={production.description && production.description[lang]}
      />
      <main
        id="main-objet"
        itemScope
        itemType={productionTypeToSchemaURL(production.type)}
        role="main"
        aria-label={i18n[lang].contentAriaLabel}>
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
              href={`${siteUrl}${mainPermalink[lang]}`}
              itemProp="item">
              <span itemProp="name">Productions</span>
            </a>
            <meta itemProp="position" content="2" />
          </li>
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem">
            <a
              itemType="https://schema.org/Thing"
              href={`${siteUrl}${production.permalink[lang]}`}
              itemProp="item">
              <span itemProp="name">
                {production.title[lang] || production.title[otherLang]}
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
                <span data-icon="production">Productions</span>
              </Link>
              <span itemProp="name" className="title">
                <a href="#topbar">
                  {production.title[lang] || production.title[otherLang]}
                </a>
              </span>
            </p>
          </div>
        </header>

        <div id="img-article">
          <div className="activator" />
        </div>

        <article id="article-contenu">
          {/* FR */}
          <LangBlock production={production} lang={lang} />

          {/* Toggle Langue */}
          <ToggleLang
            lang={lang}
            content={production.content}
            to={production.permalink}
          />
        </article>

        <aside id="all-aside">
          <RelatedPeople
            people={production.people}
            schemaRelationProp="author"
            lang={lang}
          />
          <RelatedActivities activities={production.activities} lang={lang} />
          <RelatedProductions
            productions={production.productions}
            lang={lang}
          />
          <RelatedNews actu={production.news} lang={lang} />
        </aside>
      </main>
    </>
  );
}
