import React from 'react';
import {graphql} from 'gatsby';
import {Link} from 'gatsby';

import Highlight from './fragments/pageEquipe/Highlight.js';
import PublicationsAssociees from './fragments/pages/PublicationsAssociees.js';
import ActivitesAssociees from './fragments/pages/ActivitesAssociees.js';
import Nav from './fragments/Nav.js';

import RawHtml from './RawHtml';
import {templateMembership} from './helpers.js';
//import './scss/page_personne.scss';

import Img from './assets/images/sample/D-Cardon-bis.jpg';

export const queryFragment = graphql`
  fragment PeopleDetail on PeopleJson {
    firstName
    lastName
    role {
      en
      fr
    }
    bio {
      fr
      en
    }
    coverImage {
      url
    }
    membership
    active
    draft
    lastUpdated
    domain
    role{
      en
      fr
    }
    slugs
    contacts{
      label
      value
    }
    status {
      en
      fr
    }
    cover {
      file
      crop{
        height
        width
      }
    }
    mainProductions {
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
    mainActivities {
      id
      description {
        en
        fr
      }
      slugs
      name
      type
    }
  }
`;

/*let translated.body = null

if (lang === 'en') {
  translated.body = <span>Medialab's team</span>
} else {
  translated.body =
}*/



const relatedElements = [
  

  {
    id: 'main-objet',
    en: 'Main article',
    fr: 'Article principal',
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
  /*{
    id: 'membres-associes',
    exist : ({people}) => Boolean(people),
    en: 'Related people',
    fr: 'Membres en lien'
  },*/
];


export default function PeopleDetail({lang, person}) {
  console.log(lang, person);

  const bio = person.bio;
  //const people = null; // is there related people ?
  const productions = person.mainProductions; // Sync mainProd
  const activities = person.mainActivities;  // Sync mainActivities


  return (
    <>
      <Nav lang={lang} object={person} related={relatedElements} />
      <main id="main-personne">
        <p className="titre-sticky">
          <Link to="/people">
            <span>{lang === "fr" ? "L'équipe du Medialab" : "Medialab team"} </span>
          </Link>
          <span className="personne">{person.lastname} {person.firstName}</span>
        </p>
        <article id="biographie">
          <figure><img src={person.coverImage ? person.coverImage.url : Img}   alt={lang === "fr" ? "Photo de profil de " + person.firstName + person.lastName : person.firstName + person.lastName + " profil picture"} /></figure>
          <header>
            
            <h1 data-level-1="name" data-type="name">{person.firstName} {person.lastName}</h1>
            <h2 data-level-2="role" data-type="role">{lang === "fr" ? person.role.fr : person.role.en}</h2>
            <p data-type="domaine">{lang === "fr" ? "Domaine" + String.fromCharCode(8239) +":" : "Domain:"} {person.domain}</p>
            <p data-type="statut">{templateMembership(person)}</p>
            <p data-type="activite">{person.status && (lang === "fr" ? person.status.fr : person.status.en)}</p>
            <ul className="contact">
              {person.contacts.map(contact => <li data-type={contact.label}>
                <Link to={contact.value}>{contact.label}</Link>
                </li>)}
            </ul>
          </header>
          <div className="biographie-contenu">
            {person.bio && (lang === "fr" ? person.bio.fr && <RawHtml html={bio.fr} />  : person.bio.en && <RawHtml html={bio.en} />)}
          </div>
        </article>
        <Highlight highlight={person.mainProductions} lang={lang}/>
        <PublicationsAssociees productions={person.mainProductions} person={person} context="people" lang={lang}/>
        <ActivitesAssociees activities={person.mainActivities} person={person} context="people" lang={lang}/>
        {/*<FichiersAssocies lang={lang} attachments={person.attachments} context="people" person={person} />*/}
      </main>
    </>
  );
}

/* { contact.label + String.fromCharCode(8239) + ":"} <Link to={contact.value}>{contact.value}</Link>
*/