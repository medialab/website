import React from 'react';
import {graphql} from 'gatsby';
import {replaceAssetPaths} from '../utils';

import Layout from '../components/Layout';
import PeopleDetail from '../components/PeopleDetail';

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

  replaceAssetPaths(data.allFile, data.peopleJson.bio);

  return (
    <Layout lang={pageContext.lang}>
      <PeopleDetail data={data.peopleJson} />
    </Layout>
  );
};
