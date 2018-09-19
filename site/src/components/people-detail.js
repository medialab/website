import React from 'react';
import {graphql} from 'gatsby';

export const queryFragment = graphql`
  fragment PeopleDetail on PeopleJson {
    firstName
    lastName
    bio
    activities {
      name
    }
  }
`;

export default function PeopleDetail({people}) {
  console.log(people);

  return (
    <div>
      <h1>{people.firstName} {people.lastName}</h1>
      <hr />
      <div dangerouslySetInnerHTML={{__html: people.bio}} />
    </div>
  );
}
