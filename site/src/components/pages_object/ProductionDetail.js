import React from 'react';
import {graphql} from 'gatsby';
import RawHtml from '../helpers/RawHtml.js';
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
  }
`;

export default function ProductionDetail({lang, production}) {


  let coverImage = null;

  if (production.coverImage) {
    coverImage = (
      <ProcessedImage size="large" image={production.coverImage.processed ? production.coverImage.processed.large : null} />
    );
  }


  return (
    <>
      <main id="main-objet">

      <header id="titre-sticky">
        <div id="container-titre-sticky">
          <div id="logo-sticky"><a href="/"><Logo /></a></div>
          <p>
            <Link to="/productions">
              <span data-icon="production">Productions</span>
            </Link>
              <span className="title"><a href="#topbar">{production.title && (lang === 'fr' ? production.title.fr : production.title.en) }</a></span>
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
          <div className="block-lang fr" lang="fr">
            <hgroup>
              <h1 data-level-1="title">{production.title.fr}</h1>
              {production.authors && <h2 data-level-2="authors"><span>{production.authors}</span></h2>}
            </hgroup>
            <div className="details">
              <p className="type-objet"><span data-icon="production"></span> {IsModel(production.group, "fr")} – {IsModel(production.type, "fr")}</p>
              <p className="date">{production.date}</p>
              <p className="production-ref"><RawHtml html={production.description && (production.description.fr)} /></p>
              <FichiersAssocies attachments={production.attachments} lang="fr" />

            </div>
            <div className="article-contenu">
            {production.content && (production.content.fr && <RawHtml html={production.content.fr} />)}
            </div>
          </div>

          {/* EN */}
          <div className="block-lang en" lang="en">
            <hgroup>
              <h1 data-level-1="title">{production.title.en}</h1>
              {production.authors && <h2 data-level-2="authors"><span>{production.authors}</span></h2>}
            </hgroup>
            <div className="details">
              <p className="type-objet"><span data-icon="production"></span> {IsModel(production.group, "en")} – {IsModel(production.type, "en")}</p>
              <p className="date">{production.date}</p>
              <p className="production-ref"><RawHtml html={production.description && (production.description.en)} /></p>
              <FichiersAssocies attachments={production.attachments} lang="en" />
            </div>
            <div className="article-contenu">
              {production.content && (production.content.en && <RawHtml html={production.content.en} />)}
            </div>
          </div>

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
