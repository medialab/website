import React from 'react';
import Link from '../helpers/Link';

import {getYear, parseISO} from 'date-fns';

import {
  compare,
  composeText,
  productionTypeToSchemaURL
} from '../helpers/helpers.js';
import {I18N_TYPE_LABELS} from '../../i18n.js';

import ToolFilter from '../listings/fragments/ToolFilter';

import ImagePlaceholder from '../helpers/ImagePlaceholder';
import PageMeta from '../helpers/PageMeta.js';

const messagesMeta = {
  title: {
    fr: 'Outils | médialab Sciences Po',
    en: 'Tools | médialab Sciences Po'
  },
  description: {
    fr: "Le médialab produit, mobilise et enseigne l'usage de nombreux outils numériques libres dédiés à l'enquête. Chaque outil listé sur cette page donne accès au code source, à la documentation et à des cas d'usages quand ils sont disponibles.",
    en: 'The medialab produces, mobilizes and teaches the use of numerous free digital tools dedicated to research. Each tool listed in this page gives access to its source code, documentation and use cases when available.'
  }
};

const i18n = {
  fr: {
    externalTool: 'recommandé par le médialab',
    internalTool: 'fait par le médialab'
  },
  en: {
    externalTool: 'recommended by the médialab',
    internalTool: 'made by the médialab'
  }
};

export default function ToolListing({lang, list}) {
  const nbItem = 0;
  const otherLang = lang === 'fr' ? 'en' : 'fr';
  const joinText = lang === 'fr' ? ' et ' : ' and ';

  const externalToolsSorted = list
    .filter(tool => {
      return tool.external;
    })
    .sort((a, b) => compare(b.date || '0', a.date || '0'));

  const toolsSorted = list
    .filter(tool => {
      return !tool.external;
    })
    .sort((a, b) => compare(b.date || '0', a.date || '0'));

  function renderTool(tool) {
    let usagesText;
    let usagesClass;
    if (tool.usages && tool.usages.length) {
      usagesText = composeText(
        tool.usages,
        joinText,
        I18N_TYPE_LABELS.toolsUsages[lang]
      );
      usagesClass = tool.usages.join(' ');
    }
    const dateYear = tool.date && getYear(parseISO(tool.date));

    return (
      <li
        key={tool.id}
        itemScope
        itemType={productionTypeToSchemaURL(tool.type)}
        data-item={nbItem}
        data-type={tool.type}
        className={`tool-portrait list-item ${tool.audience} ${tool.status} ${usagesClass}`}>
        <Link to={tool.permalink[lang]}>
          <figure>
            {tool.coverImage ? (
              <img itemProp="image" src={tool.coverImage.url} />
            ) : (
              <ImagePlaceholder
                type="tool"
                alt={tool.title[lang] || tool.title[otherLang]}
              />
            )}
          </figure>

          <div className="description">
            <div className="header">
              <h1 itemProp="name" data-level-1="title">
                {tool.title[lang] || tool.title[otherLang]}
              </h1>
              <h2 itemProp="description">
                {tool.description &&
                  (tool.description[lang] || tool.description[otherLang])}
              </h2>
            </div>
            <div className="details">
              {tool.usages && (
                <p className="detail-usages important">{usagesText}</p>
              )}
              <p className="detail-external">
                {tool.external
                  ? i18n[lang].externalTool
                  : i18n[lang].internalTool}
              </p>
              <p className="detail-date">{dateYear}</p>
            </div>
          </div>
        </Link>
      </li>
    );
  }

  return (
    <>
      <PageMeta
        title={messagesMeta.title[lang]}
        description={messagesMeta.description[lang]}
        lang={lang}
      />
      <main role="main" aria-describedby="aria-accroche">
        <ToolFilter lang={lang} />
        <section className="main-filters" />

        <section id="liste" className="main-container">
          <ul className="liste_objet list-grid-layout" id="liste-tools">
            {toolsSorted.map(renderTool)}
          </ul>
          <ul className="liste_objet list-grid-layout" id="liste-tools">
            {externalToolsSorted.map(renderTool)}
          </ul>
        </section>
      </main>
    </>
  );
}
