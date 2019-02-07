import React from 'react';
import {graphql} from 'gatsby';
import {Link} from 'gatsby';

import PublicationsAssocies from './fragments/pages/PublicationsAssocies.js';
import FichiersAssocies from './fragments/pages/FichiersAssocies.js';
import Nav from './fragments/Nav.js';

import RawHtml from './RawHtml';
import {templateMembership} from './helpers.js';
import './scss/page_personne.scss';

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
    membership
    active
    draft
    lastUpdated
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
            <span>L'équipe du Medialab</span>
          </Link>
          <span className="personne">{person.lastname} {person.firstName}</span>
        </p>
        <article id="biographie">
          <figure>{person.firstName}</figure>
          <header>
            <h1 data-level-1="name" data-type="name">{person.lastName} {person.firstName}</h1>
            <h2 data-level-2="role" data-type="role">{person.title && person.title.fr}</h2>
            <p data-type="domaine">Domaine&#8239;: {person.domain}</p>
            { /*<p data-type="statut">if (membership != 'member') { if (active != 'false') { Membre associé inactif du Medialab } else { Membre inactif du Medialab } }</p>*/}
            <p data-type="activite">{person.status}</p>
            <ul className="contact">
              <li data-type="email"><Link to="/">Mail</Link></li>
              <li data-type="Twitter"><Link to="/">Twitter</Link></li>
              <li data-type="Git"><Link to="/">Git</Link></li>
            </ul>
          </header>
          <div className="biographie-contenu">
            {bio && bio.fr && <RawHtml html={bio.fr} />}
          </div>
        </article>
        <PublicationsAssocies />
        <FichiersAssocies />
      </main>
    </>

  );
}

