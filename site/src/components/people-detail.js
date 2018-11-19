import React from 'react';
import {graphql} from 'gatsby';

export const queryFragment = graphql`
  fragment PeopleDetail on PeopleJson {
    firstName
    lastName
    title {
      en
      fr
    }
    bio {
      en
      fr
    }
    membership
    active
    draft
  }
`;

export default function PeopleDetail({data}) {
  console.log(data);

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
      {data.bio && data.bio.en && <div dangerouslySetInnerHTML={{__html: data.bio.en}} />}
      <hr />
      {data.bio && data.bio.fr && <div dangerouslySetInnerHTML={{__html: data.bio.fr}} />}
    </div>
  );
}
