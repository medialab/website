import React from 'react';
import {graphql} from 'gatsby';
import RawHtml from './RawHtml';

import Nav from './fragments/Nav.js';
import ToggleLang from './fragments/pages/ToggleLang.js';
//import {PlaceHolder} from './helpers.js';
//import './scss/page_objet.scss';

import PublicationsAssociees from './fragments/pages/PublicationsAssociees.js';
import FichiersAssocies from './fragments/pages/FichiersAssocies.js';
import MembresAssocies from './fragments/pages/MembresAssocies.js';
import ActivitesAssociees from './fragments/pages/ActivitesAssociees.js';

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
    people {
      id
      firstName
      lastName
    }
    draft
    slugs
    activities {
      id
      description {
        en
        fr
      }
      slugs
      name
      type
    }
    productions {
      id
      description {
        en
        fr
      }
      slugs
      title {
        en
        fr
      }
      type
    }
    attachments {
      label
      value
      type
    }
  }
`;

  const relatedElements = [
    {
      id: 'main-objet',
      en: 'Main article',
      fr: 'Article principal',
    },
    {
      id: 'membres-associes',
      exist : ({people}) => Boolean(people),
      en: 'Related people',
      fr: 'Membres en lien'
    },
    {
      id: 'productions-associes',
      exist : ({productions}) => Boolean(productions),
      en: 'Related poduction',
      fr: 'Production en liens'
    },
    {
      id: 'activites-associees',
      exist : ({activities}) => Boolean(activities),
      en: 'Related Activities',
      fr: 'Activités en lien',
    },
    {
      id: 'fichiers-associes',
      exist : ({files}) => Boolean(files),
      en: 'Related files',
      fr: 'Fichier associés'
    },

  ];



export default function NewsDetail({lang, news}) {

  //Placeholder
  news.attachments = [{label: "Faux_files.xml", value: "Faux_files", type: 'XML',},{label: "Faux_files.pdf", value: "Faux_files", type: 'PDF',}];
  news.productions = [{title: { fr: "Faux", en: "Fake"}, description: { fr: "Fausse", en: "Fake"}, slugs: "fakeslug"}];
  news.activities = [{name: "Fausse Activité", baseline: { fr: "Fausse baseline", en: "Fake Baseline"}, slugs: "fakeslug"}];
  news.people = [{firstName: "Bob", lastName: "Morane", slugs: "fakeslug"}];
  console.log(news);

  return (
    <>
      <Nav lang={lang} object={news} related={relatedElements} />
      <main id="main-objet">
        <p className="titre-sticky">{news.title && (lang === "fr" ? news.title.fr : news.title.en ) }</p>
        <article id="article-contenu">
          {/* Toggle Langue */}
          <ToggleLang lang={lang} content={news.content} />
          {/* Chapô FR */}
          <hgroup className="fr" lang="fr">
            <h1>{news.title && (news.title.fr)}</h1>
            <h2>{news.description && (news.description.fr)}</h2>
            <p className="date">{news.endDate}</p>
            <p className="type-objet">{news.type}</p>
          </hgroup>
          {/* Article FR */}
          <div className="article-contenu fr" lang="fr">
            {news.content && ( news.content.fr && <RawHtml html={news.content.fr} /> )}
          </div>

          {/* Chapô EN */}
          <hgroup className="en" lang="en">
            <h1>{news.title && (news.title.en)}</h1>
            <h2>{news.description && (news.description.en)}</h2>
            <p className="date">{news.endDate}</p>
            <p className="type-objet">{news.type}</p>
          </hgroup>
          {/* Article EN */}
          <div className="article-contenu en" lang="en">
            {news.content && ( news.content.en && <RawHtml html={news.content.en} /> )}
          </div>

        </article>

        {/* Block Associes */}
        <MembresAssocies person={news.people} context="news" lang={lang}/>
        <PublicationsAssociees productions={news.productions} context="news" lang={lang}/>
        <ActivitesAssociees activities={news.activities} context="news" lang={lang}/>
        <FichiersAssocies lang={lang} attachments={news.attachments} context="news" person="" />

      </main>
    </>
  );
}
