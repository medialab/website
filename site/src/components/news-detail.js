import React from 'react';
import {graphql} from 'gatsby';

export const queryFragment = graphql`
  fragment NewsDetail on NewsJson {
    title {
      en
      fr
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
    </div>
  );
}
