import React from 'react';
import {graphql} from 'gatsby';

import RawHtml from './RawHtml';

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
    <div>
      <h1>People: {data.firstName} {data.lastName}</h1>
      {data.draft && <p><em>This is a draft.</em></p>}
      {data.active && <p><em>This people is active.</em></p>}
      <p>
        <strong>Membership type</strong>: {data.membership}
      </p>
      <hr />
      <p>
        <strong>EN title</strong>: {data.title && data.title.en}
      </p>
      <p>
        <strong>FR title</strong>: {data.title && data.title.fr}
      </p>
      <hr />
      {bio && bio.en && <RawHtml html={bio.en} />}
      <hr />
      {bio && bio.fr && <RawHtml html={bio.fr} />}
      <div>dernière mise à jour : {data.lastUpdated ? new Date(data.lastUpdated).toLocaleString() : 'jamais modifié !'}</div>
    </div>

  );
}
