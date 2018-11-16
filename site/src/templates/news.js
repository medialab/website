import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/layout';
import NewsDetail from '../components/news-detail';

export const query = graphql`
  query($identifier: String!) {
    newsJson(identifier: {eq: $identifier}) {
      ...NewsDetail
    }
  }
`;

export default ({data, pageContext}) => {
  console.log(data, pageContext);

  return (
    <Layout>
      <NewsDetail data={data.newsJson} />
    </Layout>
  );
};
