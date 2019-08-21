import React from 'react';
import {graphql} from 'gatsby';
import RawHtml from '../helpers/RawHtml.js';
import DateNews from '../helpers/DateNews.js';
import {Link} from 'gatsby';

import ToggleLang from './fragments/ToggleLang.js';
import {productionTypeToSchemaURL, productionTypeToZoteroType} from '../helpers/helpers.js';
import {I18N_TYPE_LABELS, I18N_GROUP_LABELS} from '../../i18n.js';
import LogoSticky from './fragments/LogoSticky.js';
import RelatedProductions from './fragments/RelatedProductions.js';
import RelatedActivities from './fragments/RelatedActivities.js';
import RelatedNews from './fragments/RelatedNews.js';
import RelatedPeople from './fragments/RelatedPeople.js';

import LanguageFallback from '../helpers/LanguageFallback';
import PageMeta from '../helpers/PageMeta.js';

export const queryFragment = graphql`
  fragment ProductionDetail on ProductionsJson {
    title {
      en
      fr
    }
    authors
    group
    type
    date
    coverImage {
      processed {
        raster {
          url
          width
          height
        }
      }
    }
    description {
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
      description {
        en
        fr
      }
      permalink {
        en
        fr
      }
      name
      baseline {
        en
        fr
      }
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
    draft
    url
  }
`;

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

const LangBlock = ({production, lang, siteUrl}) => {
  let ref = (
    <p itemProp="description" className="p-ref">
      {production.description && <RawHtml html={production.description[lang]} />}
      {production.url && <br /> } {production.url ? production.url + ' ⤤' : ''}
    </p>
  );

  if (production.url) {
    ref = (
      <a
        itemProp="url"
        href={production.url}
        target="_blank"
        rel="noopener noreferrer">
        {ref}
      </a>
    );
  }

  return (
    <div className={`block-lang ${lang}`} lang={lang}>
      <hgroup>
        <h1 itemProp="name" data-level-1="title">
          <LanguageFallback lang={lang} translatedAttribute={production.title} />
        </h1>
        {production.authors && <h2 data-level-2="authors"><span>{production.authors}</span></h2>}
      </hgroup>
      <div className="details">
        <p className="type-objet">
          <span data-icon="production" /> {I18N_GROUP_LABELS.productions[lang][production.group]} – {I18N_TYPE_LABELS.productions[lang][production.type]}
        </p>
        <DateNews startDateSchemaProp="datePublished" startDate={production.date} lang={lang} />
        {ref}
      </div>
      <div className="article-contenu" itemProp="headline">
        {production.content && (production.content[lang] && <RawHtml html={production.content[lang]} />)}
      </div>
    </div>
  );
};

function createProductionTitle(lang, production) {
  let title = production.title;

  if (title)
    title = title[lang] || title.fr || title.en;

  return (
    (title ? `${title}. ` : '') +
    `${production.authors}` +
    (production.date ? ` (${production.date})` : '') +
    ' | médialab Sciences Po'
  );
}

export default function ProductionDetail({lang, production}) {
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
        imageData={production.coverImage && production.coverImage.processed && production.coverImage.processed.raster}
        uri={`${siteUrl}${mainPermalink[lang]}`}
        citation={production.description && production.description[lang]} />
      <main
        id="main-objet"
        itemScope
        itemType={productionTypeToSchemaURL(production.type)}
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
            itemProp="itemListElement" itemScope
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
              href={`${siteUrl}${production.permalink[lang]}`}
              itemProp="item">
              <span itemProp="name">
                <LanguageFallback lang={lang} translatedAttribute={production.title} />
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
                  <LanguageFallback lang={lang} translatedAttribute={production.title} />
                </a>
              </span>
            </p>
          </div>
        </header>

        <div id="img-article">
          <div className="activator" />
        </div>

        <article id="article-contenu">
          {/* Toggle Langue */}
          <ToggleLang lang={lang} content={production.content} />

          {/* FR */}
          <LangBlock production={production} lang="fr" />

          {/* EN */}
          <LangBlock production={production} lang="en" />
        </article>

        <aside id="all-aside">
          <RelatedPeople people={production.people} schemaRelationProp="author" lang={lang} />
          <RelatedActivities activities={production.activities} lang={lang} />
          <RelatedProductions productions={production.productions} lang={lang} />
          <RelatedNews actu={production.news} lang={lang} />
        </aside>

      </main>
    </>
  );
}
