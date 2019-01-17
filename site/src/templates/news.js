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

  const news = data.newsJson;

  replaceAssetPaths(news.assets, news.content);

  return (
    <Layout lang={pageContext.lang}>
      <NewsDetail lang={pageContext.lang} news={news} />
    </Layout>
  );
};
