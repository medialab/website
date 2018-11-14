import React from 'react';
import {graphql} from 'gatsby';

export const queryFragment = graphql`
  fragment ActivityDetail on ActivitiesJson {
    name
    baseline {
      en
      fr
    }
    description {
      en
      fr
    }
    type
    content {
      en
      fr
    }
    people
  }
`;

export default function ActivityDetail({data}) {
  console.log(data);

  return (
    <div>
      <h1>Activité: {data.name}</h1>
      <p>
        <strong>EN baseline</strong>: {data.baseline.en}
      </p>
      <p>
        <strong>FR baseline</strong>: {data.baseline.fr}
      </p>
    </div>
  );
}
