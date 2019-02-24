import React from 'react';
import {graphql} from 'gatsby';
import {Link} from 'gatsby';

import PublicationsAssocies from './fragments/pages/PublicationsAssocies.js';
import FichiersAssocies from './fragments/pages/FichiersAssocies.js';
import Nav from './fragments/Nav.js';

import RawHtml from './RawHtml';
import {templateMembership} from './helpers.js';
import './scss/page_personne.scss';

//import Img from './assets/images/sample/D-Cardon-bis.jpg';

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
  }
`;

/*let translated.body = null

if (lang === 'en') {
  translated.body = <span>Medialab's team</span>
} else {
  translated.body =
}*/

export default function PeopleDetail({lang, person}) {
  console.log(lang, person);

  const bio = person.bio;

  return (
    <>
      <Nav />
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
        <PublicationsAssocies lang={lang} person={person} publications={person.mainProductions} />
        <FichiersAssocies />
      </main>
    </>

  );
}

/* { contact.label + String.fromCharCode(8239) + ":"} <Link to={contact.value}>{contact.value}</Link>
*/