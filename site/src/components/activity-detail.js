import React from 'react';
import {graphql} from 'gatsby';

export const queryFragment = graphql`
  fragment ActivityDetail on ActivitiesJson {
    name
    type
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
    people {
      id
      firstName
      lastName
    }
    active
    draft
  }
`;

export default function ActivityDetail({data}) {
  console.log(data);

  return (
    <div>
      <h1>Activité: {data.name}</h1>
      {data.draft && <p><em>This is a draft.</em></p>}
      {data.active && <p><em>This activity is active.</em></p>}
      <p>
        <strong>Type</strong>: {data.type}
      </p>
      <hr />
      <p>
        <strong>EN baseline</strong>: {data.baseline && data.baseline.en}
      </p>
      <p>
        <strong>FR baseline</strong>: {data.baseline && data.baseline.fr}
      </p>
      <hr />
      <p>
        <strong>EN description</strong>: {data.description && data.description.en}
      </p>
      <p>
        <strong>FR description</strong>: {data.description && data.description.fr}
      </p>
      <hr />
      <div>
        Related people:
        <ul>
          {(data.people || []).map(p => <li key={p.id}>{p.firstName} {p.lastName}</li>)}
        </ul>
      </div>
      <hr />
      {data.content && data.content.en && <div dangerouslySetInnerHTML={{__html: data.content.en}} />}
      <hr />
      {data.content && data.content.fr && <div dangerouslySetInnerHTML={{__html: data.content.fr}} />}
    </div>
  );
}
