import React from 'react';
import {graphql} from 'gatsby';

export const queryFragment = graphql`
  fragment PeopleDetail on PeopleJson {
    firstName
    lastName
    bio {
      en
      fr
    }
  }
`;

export default function PeopleDetail({data}) {
  console.log(data);

  return (
    <div>
      <h1>{data.firstName} {data.lastName}</h1>
      <hr />
      <div dangerouslySetInnerHTML={{__html: data.bio.fr || data.bio.en}} />
    </div>
  );
}
