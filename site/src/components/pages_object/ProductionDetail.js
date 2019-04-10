import React from 'react';
import {graphql} from 'gatsby';
import RawHtml from './RawHtml.js';

import Nav from './fragments/Nav.js';
import ToggleLang from './fragments/pages/ToggleLang.js';
import {IsModel} from './helpers.js';

import ProductionsAssociees from './fragments/pages/ProductionsAssociees.js';
import ActivitesAssociees from './fragments/pages/ActivitesAssociees.js';
import ActuAssociees from './fragments/pages/ActuAssociees.js';
import MembresAssocies from './fragments/pages/MembresAssocies.js';
import FichiersAssocies from './fragments/pages/FichiersAssocies.js';
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
  console.log(production);
  return (
    <>
      <Nav lang={lang} data={production} order={['main', 'people', 'productions', 'activities', 'news', 'attachments']} />
      <main id="main">
        <p className="titre-sticky"><a href="#main-objet"><span data-icon="production"></span><span className="title">{production.title && (lang === 'fr' ? production.title.fr : production.title.en) }</span></a></p>
        <article id="article-contenu">
          {/* Toggle Langue */}
          <ToggleLang lang={lang} content={production.content} />


          {/* FR */}
          <div className="block-lang fr" lang="fr">
            <hgroup>
              <h1 data-level-1="title">{production.title.fr}</h1>
              {production.authors && <h2 data-level-2="authors"><span>{production.authors}</span></h2>}
            </hgroup>
            <div class="details">             
              <p className="type-objet"><span data-icon="production"></span> {IsModel(production.group, "fr")} – {IsModel(production.type, "fr")}</p>
              <p className="date">{production.date}</p>  
              <p className="production-ref"><RawHtml html={production.description && (production.description.fr)} /></p>        
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
            <div class="details">
              <p className="type-objet"><span data-icon="production"></span> {IsModel(production.group, "en")} – {IsModel(production.type, "en")}</p>
              <p className="date">{production.date}</p>  
              <p className="production-ref"><RawHtml html={production.description && (production.description.en)} /></p>   
            </div>
            <div className="article-contenu">                
              {production.content && (production.content.en && <RawHtml html={production.content.en} />)}
            </div>
          </div>

        </article>

        <MembresAssocies people={production.people} lang={lang} />
        <ProductionsAssociees productions={production.productions} lang={lang} />
        <ActivitesAssociees activities={production.activities} lang={lang} />
        <ActuAssociees actu={production.news} lang={lang} />
        <FichiersAssocies attachments={production.attachments} lang={lang} />
      </main>
    </>
  );
}
