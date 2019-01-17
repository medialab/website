import React from 'react';
import {graphql} from 'gatsby';
import {replaceAssetPaths} from '../utils';

import Layout from '../components/Layout';
import PeopleDetail from '../components/PeopleDetail';

export const query = graphql`
  query($identifier: String!) {
    peopleJson(identifier: {eq: $identifier}) {
      ...PeopleDetail
    }
  }
`;

export default ({data, pageContext}) => {
  console.log(data, pageContext);

  replaceAssetPaths(data.peopleJson.assets, data.peopleJson.bio);

  return (
    <Layout lang={pageContext.lang}>
      <PeopleDetail lang={pageContext.lang} person={data.peopleJson} />
    </Layout>
  );
};
