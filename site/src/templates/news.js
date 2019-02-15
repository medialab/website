import React from 'react';
import {graphql} from 'gatsby';

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
  const permalink = `news/${news.slugs[ news.slugs.length-1 ]}`

  return (
    <Layout lang={pageContext.lang} className="page-news" permalink={permalink}>
      <NewsDetail lang={pageContext.lang} news={news} />
    </Layout>
  );
};
