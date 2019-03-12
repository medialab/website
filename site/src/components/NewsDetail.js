import React from 'react';
import {graphql} from 'gatsby';
import RawHtml from './RawHtml';

import Nav from './fragments/Nav.js';
import ToggleLang from './fragments/pages/ToggleLang.js';
//import {PlaceHolder} from './helpers.js';
//import './scss/page_objet.scss';
import DateNews from './fragments/DateNews.js';
import TimeNews from './fragments/TimeNews.js';

import PublicationsAssociees from './fragments/pages/PublicationsAssociees.js';
import ActivitesAssociees from './fragments/pages/ActivitesAssociees.js';
import ActuAssociees from './fragments/pages/ActuAssociees.js';
import MembresAssocies from './fragments/pages/MembresAssocies.js';
import FichiersAssocies from './fragments/pages/FichiersAssocies.js';

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
    activities {
      id
      description {
        en
        fr
      }
      name
      type
    }
    productions {
      id
      description {
        en
        fr
      }
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
    type
    startDate
    endDate  
    place  
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
      id: 'actualités-associes',
      exist : ({news}) => Boolean(news),
      en: 'Related news',
      fr: 'Actualités associés'
    },    {
      id: 'fichiers-associes',
      exist : ({files}) => Boolean(files),
      en: 'Related files',
      fr: 'Fichier associés'
    },
  ];

export default function NewsDetail({lang, news}) {

  //Placeholder
  news.attachments = [{label: "Faux_files.xml", value: "Faux_files", type: 'XML',},{label: "Faux_files.pdf", value: "Faux_files", type: 'PDF',}];
  news.productions = [{title: { fr: "Faux", en: "Fake"}, description: { fr: "Fausse", en: "Fake"}, permalink: {en: "Faux permalink en", fr: "Faux permalink fr"}}];
  news.activities = [{name: "Fausse Activité", baseline: { fr: "Fausse baseline", en: "Fake Baseline"}, permalink: {en: "Faux permalink en", fr: "Faux permalink fr"}}];
  news.people = [{firstName: "Bob", lastName: "Morane", permalink: {en: "Faux permalink en", fr: "Faux permalink fr"}}];
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
            <h1 data-type="title">{news.title && (news.title.fr)}</h1>
            <h2 data-type="description">{news.description && (news.description.fr)}</h2>
            <DateNews startDate={news.startDate} endDate={news.endDate} lang={lang} />
            <TimeNews startDate={news.startDate} endDate={news.endDate} />
            {news.type && <p className="type-objet">{news.type}</p> }
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
        <MembresAssocies people={news.people} related={relatedElements[1]} lang={lang} />
        <PublicationsAssociees productions={news.productions} related={relatedElements[2]} lang={lang} />
        <ActivitesAssociees activities={news.activities} related={relatedElements[3]} lang={lang} />
        <FichiersAssocies attachments={news.attachments} related={relatedElements[4]} lang={lang}  />
      </main>
    </>
  );
}
