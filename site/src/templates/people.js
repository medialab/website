import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/layout';
import PeopleDetail from '../components/people-detail';

export const query = graphql`
  query($identifier: String!, $assets: [String]!) {
    peopleJson(identifier: {eq: $identifier}) {
      ...PeopleDetail
    }
    allFile(filter: {base: {in: $assets}}) {
      edges {
        node {
          base
          publicURL
        }
      }
    }
  }
`;

export default ({data, pageContext}) => {
  console.log(data, pageContext);

  if (data.allFile)
    data.allFile.edges.forEach(edge => {
      const {base, publicURL} = edge.node;

      data.peopleJson.bio = data.peopleJson.bio.replace(
        base,
        publicURL
      );
    });

  return (
    <Layout>
      <PeopleDetail people={data.peopleJson} />
    </Layout>
  );
};
