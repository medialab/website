import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../components/layout';

export const query = graphql`
  query($identifier: String!) {
    allPostsJson(filter: {identifier: {eq: $identifier}}) {
      edges {
        node {
          title {
            fr
          }
          content {
            fr
          }
        }
      }
    }
  }
`;

export default ({data}) => {

  console.log(data)
  return (
    <Layout>
      <div>This is a post!</div>
    </Layout>
  );
};
