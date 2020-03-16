import React from 'react';
import HtmlFallback from '../helpers/HtmlFallback.js';
import DateNews from '../helpers/DateNews.js';
import Link from '../helpers/Link';

import {getYear, parseISO} from 'date-fns';

import ToggleLang from './fragments/ToggleLang.js';
import {composeText, productionTypeToSchemaURL, productionTypeToZoteroType} from '../helpers/helpers.js';
import {I18N_TYPE_LABELS, I18N_GROUP_LABELS} from '../../i18n.js';
import LogoSticky from './fragments/LogoSticky.js';
import RelatedProductions from './fragments/RelatedProductions.js';
import RelatedActivities from './fragments/RelatedActivities.js';
import RelatedNews from './fragments/RelatedNews.js';
import RelatedPeople from './fragments/RelatedPeople.js';
import Attachments from './fragments/Attachments';

import PageMeta from '../helpers/PageMeta.js';

const i18n = {
  fr: {
    contentAriaLabel: 'Contenu de la page',
    externalTool: 'recommandé par le médialab',
    internalTool: 'fait par le médialab'
  },
  en: {
    contentAriaLabel: 'Page content',
    externalTool: 'recommended by the médialab',
    internalTool: 'made by the médialab'
  }
};

const mainPermalink = {
  fr: '/productions',
  en: '/en/productions'
};

const LangBlock = ({tool, lang, dateYear, usagesText}) => {

  const otherLang = lang === 'fr' ? 'en' : 'fr';

  return (
    <div className={`block-lang ${lang}`} lang={lang}>
      <hgroup>
        <h1 itemProp="name" data-level-1="title">
          {tool.title[lang] || tool.title[otherLang]}
          {tool.external ?
            <span className="label">{i18n[lang].externalTool}</span> :
            <span className="label">{i18n[lang].internalTool}</span>
          }
        </h1>
        {tool.description && <h2 data-level-2="description"><span>{tool.description[lang] || tool.description[otherLang]}</span></h2>}
      </hgroup>
      <div className="details">
        <p className="type-objet">
          <span data-icon="production" /> {I18N_GROUP_LABELS.productions[lang][tool.group]} – {I18N_TYPE_LABELS.productions[lang][tool.type]}
        </p>
        {tool.authors && <p>{tool.authors}</p>}
        <p />
        {/* {ref} */}
        {tool.attachments && tool.attachments.length > 0 &&
          <div className="tool-attachments">
            <Attachments attachments={tool.attachments} lang={lang} />
          </div>
        }
      </div>
      <HtmlFallback
        lang={lang}
        content={tool.content}
        className="article-contenu"
        itemProp="headline" />
      <div className="details as-main">
        {tool.usages && <p className="type-objet important">{usagesText}</p>}
        {tool.audience && <p className="type-objet">{I18N_TYPE_LABELS.toolsAudience[lang][tool.audience]}</p>}
        {tool.status && <p className="type-objet">{I18N_TYPE_LABELS.toolsStatus[lang][tool.status]}</p>}
        {tool.date && <p>{dateYear}</p>}
      </div>
    </div>
  );

};

function createProductionTitle(lang, tool) {
  let title = tool.title;

  if (title)
    title = title[lang] || title.fr || title.en;

  return (
    (title ? `${title}. ` : '') +
    `${tool.authors}` +
    (tool.date ? ` (${tool.date})` : '') +
    ' | médialab Sciences Po'
  );
}

export default function ToolDetail({lang, tool, siteUrl}) {

  const otherLang = lang === 'fr' ? 'en' : 'fr';
  const joinText = lang === 'fr' ? ' et ' : ' and ';

  let usagesText;
  if (tool.usages && tool.usages.length) {
    usagesText = composeText(tool.usages, joinText, I18N_TYPE_LABELS.toolsUsages[lang]);
  }
  const dateYear = tool.date && getYear(parseISO(tool.date));

  return (
    <>
      <PageMeta
        title={createProductionTitle(lang, tool)}
        citationTitle={tool.title && tool.title[lang]}
        zoteroType={productionTypeToZoteroType(tool.type)}
        description={tool.content && tool.content[lang]}
        date={tool.date}
        author={tool.authors.split(', ')}
        lang={lang}
        type={tool.type}
        imageData={tool.coverImage && tool.coverImage.processed && tool.coverImage.processed.raster}
        uri={`${siteUrl}${mainPermalink[lang]}`}
        citation={tool.description && tool.description[lang]} />
      <main
        id="main-objet"
        itemScope
        itemType={productionTypeToSchemaURL(tool.type)}
        role="main"
        aria-label={i18n[lang].contentAriaLabel}>
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
            usagesClassitemProp="itemListElement" itemScope
            itemType="https://schema.org/ListItem">
            <a
              itemType="https://schema.org/Thing"
              href={`${siteUrl}${mainPermalink[lang]}`}
              itemProp="item">
              <span itemProp="name">Productions</span></a>
            <meta itemProp="position" content="2" />
          </li>
          <li
            itemProp="itemListElement" itemScope
            itemType="https://schema.org/ListItem">
            <a
              itemType="https://schema.org/Thing"
              href={`${siteUrl}${tool.permalink[lang]}`}
              itemProp="item">
              <span itemProp="name">
                {tool.title[lang] || tool.title[otherLang]}
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
                  {tool.title[lang] || tool.title[otherLang]}
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
          <LangBlock
            tool={tool}
            lang={lang}
            dateYear={dateYear}
            usagesText={usagesText} />

          {/* Toggle Langue */}
          <ToggleLang lang={lang} content={tool.content} to={tool.permalink} />
        </article>

        <aside id="all-aside">
          <div className="details as-aside">
            {tool.usages && <p className="type-objet important">{usagesText}</p>}
            {tool.audience && <p className="type-objet">{I18N_TYPE_LABELS.toolsAudience[lang][tool.audience]}</p>}
            {tool.status && <p className="type-objet">{I18N_TYPE_LABELS.toolsStatus[lang][tool.status]}</p>}
            {tool.date && <p className="type-objet">{dateYear}</p>}
          </div>
          <RelatedPeople people={tool.people} schemaRelationProp="author" lang={lang} />
          <RelatedActivities activities={tool.activities} lang={lang} />
          <RelatedProductions productions={tool.productions} lang={lang} />
          <RelatedNews actu={tool.news} lang={lang} />
        </aside>

      </main>
    </>
  );
}
