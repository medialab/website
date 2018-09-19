import React from 'react';
import {graphql} from 'gatsby';

export const queryFragment = graphql`
  fragment PostDetail on PostsJson {
    title {
      fr
    }
    content {
      fr
    }
  }
`;

export default function PostDetail({post}) {
  console.log(post);

  return (
    <div>
      <h1>{post.title.fr}</h1>
      <p>{post.content.fr}</p>
    </div>
  );
}
