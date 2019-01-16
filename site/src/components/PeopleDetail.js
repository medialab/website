import React from 'react';
import {graphql} from 'gatsby';

import RawHtml from './RawHtml';
import Nav from './fragments/Nav.js';
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

export default function PeopleDetail({lang, data}) {
  console.log(lang, data);

  const bio = data.bio;

  return (
    <main id="main-personne">
      <p class="titre-sticky">L'équipe du Medialab<span> / {data.firstName} {data.lastname}</span></p>
      <article id="biographie">
        <figure>
        </figure>
        <hgroup>
          <h1 data-level-1="name" data-type="name">{data.lastName} {data.firstName}</h1>
          <h2 data-level-2="role" data-type="role">{data.title && data.title.fr}</h2>
          <p data-type="domaine">Domaine&#8239;: </p>
          <p data-type="statut">{templateMembership(data)}</p>

          <p data-type="activite">En ce moment, je chef et j'écris des papiers</p>
        </hgroup>
        <div class="biographie-contenu">
          {bio && bio.fr && <RawHtml html={bio.fr} />}
        </div>
      </article>
    </main>


  );
}

