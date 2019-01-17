import React from 'react';
import {graphql} from 'gatsby';

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
    assets {
      base
      publicURL
    }
    membership
    active
    draft
    lastUpdated
  }
`;

export default function PeopleDetail({lang, person}) {
  console.log(lang, person);

  const bio = person.bio;

  return (
    <main id="main-personne">
      <p class="titre-sticky">L'équipe du Medialab<span> / {person.firstName} {person.lastname}</span></p>
      <article id="biographie">
        <figure>
        </figure>
        <hgroup>
          <h1 data-level-1="name" data-type="name">{person.lastName} {person.firstName}</h1>
          <h2 data-level-2="role" data-type="role">{person.title && person.title.fr}</h2>
          <p data-type="domaine">Domaine&#8239;: </p>
          <p data-type="statut">{templateMembership(person)}</p>

          <p data-type="activite">En ce moment, je chef et j'écris des papiers</p>
        </hgroup>
        <div class="biographie-contenu">
          {bio && bio.fr && <RawHtml html={bio.fr} />}
        </div>
      </article>
    </main>


  );
}

