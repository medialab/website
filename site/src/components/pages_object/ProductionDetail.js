import React from 'react';
import {graphql} from 'gatsby';
import RawHtml from '../helpers/RawHtml.js';
import DateNews from '../helpers/DateNews.js';
import {Link} from 'gatsby';

import Nav from '../common/Nav.js';
import ToggleLang from './fragments/ToggleLang.js';
import {IsModel} from '../helpers/helpers.js';

import Logo from '../assets/svg/logo_medialab.svg';
import ProcessedImage from '../helpers/ProcessedImage.js';


import ProductionsAssociees from './fragments/ProductionsAssociees.js';
import ActivitesAssociees from './fragments/ActivitesAssociees.js';
import ActuAssociees from './fragments/ActuAssociees.js';
import MembresAssocies from './fragments/MembresAssocies.js';
import FichiersAssocies from './fragments/FichiersAssocies.js';

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
    description {
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
    draft
    url
  }
`;

export default function ProductionDetail({lang, production}) {


  let coverImage = null;

  if (production.coverImage) {
    coverImage = (
      <ProcessedImage size="large" image={production.coverImage.processed ? production.coverImage.processed.large : null} />
    );
  }

  const LangBlock = ({production, lang}) => {

    let ref = (<p className="production-ref">
      {production.description && <RawHtml html={production.description[lang]} />}
      {production.url && <br /> } {production.url ? production.url + ' ⤤' : ''}
    </p>);

    if (production.url) {
      ref = <a href={production.url} target="_blank" rel="noopener noreferrer">{ref}</a>;
    }
  
    return (<div className={`block-lang ${lang}`} lang={lang}>
      <hgroup>
        <h1 data-level-1="title"><LanguageFallback lang={lang} translatedAttribute={production.title} /></h1>
        {production.authors && <h2 data-level-2="authors"><span>{production.authors}</span></h2>}
      </hgroup>
      <div className="details">
        <p className="type-objet">
          <span data-icon="production"></span> {IsModel(production.group, lang)} – {IsModel(production.type, lang)}
        </p>
        <DateNews startDate={production.date} lang={lang} />
        {ref}
        { 
          // so far we don't have attachments on production also we planned to have some... I think...
          //<FichiersAssocies attachments={production.attachments} lang="fr" />
        }

      </div>
      <div className="article-contenu">
        {production.content && (production.content[lang] && <RawHtml html={production.content[lang]} />)}
      </div>
    </div>);
  };
  return (
    <>
      <PageMeta
        title={`${production.title && production.title[lang]}. ${production.authors} (${production.date}) – médialab Sciences Po`}
        description={production.content && production.content[lang]}
        date={production.date}
        author={production.authors}
        lang={lang}
        citation={production.description && production.description[lang]}
      />
      <main id="main-objet" role="main" aria-label={lang === "fr" ? "Contenu de la page " : " page content" }>

      <header id="titre-sticky" aria-hidden="true">
        <div id="container-titre-sticky">
          <div id="logo-sticky"><a href="/"><Logo /></a></div>
          <p>
            <Link to="/productions">
              <span data-icon="production">Productions</span>
            </Link>
              <span className="title">
                <a href="#topbar">
                  <LanguageFallback lang={lang} translatedAttribute={production.title} />
                </a>
              </span>
          </p>
        </div>
      </header>

      <div id="img-article">
        <div className="activator"></div>
        <div className="container">{ coverImage}</div>
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
          <MembresAssocies people={production.people} lang={lang} />
          <ActivitesAssociees activities={production.activities} lang={lang} />
          <ProductionsAssociees productions={production.productions} lang={lang} />
          <ActuAssociees actu={production.news} lang={lang} />
        </aside>

      </main>
    </>
  );
}
