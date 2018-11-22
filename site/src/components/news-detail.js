import React from 'react';
import {graphql} from 'gatsby';

export const queryFragment = graphql`
  fragment NewsDetail on NewsJson {
    title {
      en
      fr
    }
    excerpt {
      en
      fr
    }
    label {
      en
      fr
    }
    content {
      en
      fr
    }
    activities {
      id
      name
    }
    people {
      id
      firstName
      lastName
    }
    publications {
      id
    }
    draft
  }
`;

export default function NewsDetail({data}) {
  console.log(data);

  return (
    <div>
      <h1>News: {data.title.fr || data.title.en}</h1>
      {data.draft && <p><em>This is a draft.</em></p>}
      <hr />
      <p>
        <strong>EN excerpt</strong>: {data.excerpt && data.excerpt.en}
      </p>
      <p>
        <strong>FR excerpt</strong>: {data.excerpt && data.excerpt.fr}
      </p>
      <hr />
      <p>
        <strong>EN label</strong>: {data.label && data.label.en}
      </p>
      <p>
        <strong>FR label</strong>: {data.label && data.label.fr}
      </p>
      <hr />
      <div>
        Related activities:
        <ul>
          {(data.activities || []).map(a => <li key={a.id}>{a.name}</li>)}
        </ul>
      </div>
      <hr />
      <div>
        Related people:
        <ul>
          {(data.people || []).map(p => <li key={p.id}>{p.firstName} {p.lastName}</li>)}
        </ul>
      </div>
      <div>
        Related publications:
        <ul>
          {(data.publications || []).map(p => <li key={p.id}>{p.id}</li>)}
        </ul>
      </div>
      <hr />
      {data.content && data.content.en && <div dangerouslySetInnerHTML={{__html: data.content.en}} />}
      <hr />
      {data.content && data.content.fr && <div dangerouslySetInnerHTML={{__html: data.content.fr}} />}
    </div>
  );
}
