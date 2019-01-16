import React from 'react';
import {graphql} from 'gatsby';
import {replaceAssetPaths} from '../utils';

import Layout from '../components/Layout';
import NewsDetail from '../components/NewsDetail';

export const query = graphql`
  query($identifier: String!) {
    newsJson(identifier: {eq: $identifier}) {
      ...NewsDetail
    }
  }
`;

export default ({data, pageContext}) => {
  console.log(data, pageContext);

  replaceAssetPaths(data.newsJson.assets, data.newsJson.content);

  return (
    <Layout lang={pageContext.lang}>
      <NewsDetail lang={pageContext.lang} data={data.newsJson} />
    </Layout>
  );
};
