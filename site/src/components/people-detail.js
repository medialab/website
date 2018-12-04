import React from 'react';
import {graphql} from 'gatsby';

export const queryFragment = graphql`
  fragment PeopleDetail on PeopleJson {
    firstName
    lastName
    title {
      en
      fr
    }
    membership
    active
    draft
    lastUpdated
  }
`;

export default function PeopleDetail({data, bio}) {
  console.log(data, bio);

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
      {bio && bio.en && <div dangerouslySetInnerHTML={{__html: bio.en}} />}
      <hr />
      {bio && bio.fr && <div dangerouslySetInnerHTML={{__html: bio.fr}} />}
      <div>dernière mise à jour : {data.lastUpdated ? new Date(data.lastUpdated).toLocaleString() : 'jamais modifié !'}</div>
    </div>

  );
}
