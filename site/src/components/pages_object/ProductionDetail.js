import React from 'react';
import {graphql} from 'gatsby';
import RawHtml from '../helpers/RawHtml.js';
import DateNews from '../helpers/DateNews.js';
import {Link} from 'gatsby';

import ToggleLang from './fragments/ToggleLang.js';
import {productionTypeToSchemaURL, productionTypeToZoteroType} from '../helpers/helpers.js';
import {I18N_TYPE_LABELS, I18N_GROUP_LABELS} from '../../i18n.js';

import Logo from '../assets/svg/logo_medialab.svg';

import ProductionsAssociees from './fragments/ProductionsAssociees.js';
import ActivitesAssociees from './fragments/ActivitesAssociees.js';
import ActuAssociees from './fragments/ActuAssociees.js';
import MembresAssocies from './fragments/MembresAssocies.js';

import LanguageFallback from '../helpers/LanguageFallback';
import PageMeta from '../helpers/PageMeta.js';

//import './scss/page_objet.scss';

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
    slugs
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

const LangBlock = ({production, lang}) => {
  let ref = (
    <p itemProp="description" className="p-ref">
      {production.description && <RawHtml html={production.description[lang]} />}
      {production.url && <br /> } {production.url ? production.url + ' ⤤' : ''}
    </p>
  );

  if (production.url) {
    ref = (<a
      itemProp="url" href={production.url} target="_blank"
      rel="noopener noreferrer">{ref}</a>);
  }

  return (<div className={`block-lang ${lang}`} lang={lang}>
    <hgroup>
      <h1 itemProp="name" data-level-1="title"><LanguageFallback lang={lang} translatedAttribute={production.title} /></h1>
      {production.authors && <h2 data-level-2="authors"><span>{production.authors}</span></h2>}
    </hgroup>
    <div className="details">
      <p className="type-objet">
        <span data-icon="production" /> {I18N_GROUP_LABELS.productions[lang][production.group]} – {I18N_TYPE_LABELS.productions[lang][production.type]}
      </p>
      <DateNews startDateSchemaProp="datePublished" startDate={production.date} lang={lang} />
      {ref}
      {
        // so far we don't have attachments on production also we planned to have some... I think...
        //<FichiersAssocies attachments={production.attachments} lang="fr" />
      }

    </div>
    <div className="article-contenu" itemProp="headline">
      {production.content && (production.content[lang] && <RawHtml html={production.content[lang]} />)}
    </div>
  </div>);
};

export default function ProductionDetail({lang, production}) {
  return (
    <>
      <PageMeta
        title={`${production.title && production.title[lang]}. ${production.authors} (${production.date}) | médialab Sciences Po`}
        citationTitle={production.title && production.title[lang]}
        zoteroType={productionTypeToZoteroType(production.type)}
        description={production.content && production.content[lang]}
        date={production.date}
        author={production.authors.split(',')}
        lang={lang}
        type={production.type}
        imageData={production.coverImage && production.coverImage.processed && production.coverImage.processed.raster}
        uri={`https://medialab.sciencespo.fr/${lang === 'fr' ? 'productions' : 'en/productions'}/${production.slugs && production.slugs[0]}`}
        citation={production.description && production.description[lang]} />
      <main
        itemScope itemType={productionTypeToSchemaURL(production.type)} id="main-objet"
        role="main" aria-label={lang === 'fr' ? 'Contenu de la page ' : ' page content'}>
        <ol style={{display: 'none'}} itemScope itemType="https://schema.org/BreadcrumbList">
          <li
            itemProp="itemListElement" itemScope
            itemType="https://schema.org/ListItem">
            <a
              itemType="https://schema.org/Organization"
              itemProp="item" href="https://medialab.sciencespo.fr">
              <span itemProp="name">médialab Sciences Po</span></a>
            <meta itemProp="position" content="1" />
          </li>
          <li
            itemProp="itemListElement" itemScope
            itemType="https://schema.org/ListItem">
            <a
              itemType="https://schema.org/Thing"
              href={`https://medialab.sciencespo.fr/${lang === 'fr' ? 'productions' : 'en/productions'}`}
              itemProp="item">
              <span itemProp="name">{'Productions'}</span></a>
            <meta itemProp="position" content="2" />
          </li>
          <li
            itemProp="itemListElement" itemScope
            itemType="https://schema.org/ListItem">
            <a
              itemType="https://schema.org/Thing"
              href={`https://medialab.sciencespo.fr/${lang === 'fr' ? 'productions' : 'en/productions'}/${production.slugs && production.slugs[0]}`}
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
            <div id="logo-sticky"><a href="/"><Logo /></a></div>
            <p>
              <Link to={lang === 'fr' ? '/productions' : '/en/productions'}>
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
          <MembresAssocies people={production.people} schemaRelationProp="author" lang={lang} />
          <ActivitesAssociees activities={production.activities} lang={lang} />
          <ProductionsAssociees productions={production.productions} lang={lang} />
          <ActuAssociees actu={production.news} lang={lang} />
        </aside>

      </main>
    </>
  );
}
