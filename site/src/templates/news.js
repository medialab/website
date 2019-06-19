import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import NewsDetail from '../components/pages_object/NewsDetail';

export const query = graphql`
  query($identifier: String!) {
    newsJson(identifier: {eq: $identifier}) {
      ...NewsDetail
    }
  }
`;

export default ({data, pageContext}) => {
  // console.log(data, pageContext);

  const news = data.newsJson;

  return (
    <Layout
      lang={pageContext.lang}
      className="page-news body-page"
      permalinks={pageContext.permalinks}>
      {pageContext.linkToAdmin && <div style={{'text-align': 'right'}}>{news.draft ? <b>DRAFT</b> : <b>PUBLIC</b>} <a href={pageContext.linkToAdmin} target="_blank" rel="noopener noreferrer">éditer dans l'admin</a></div>}

      <NewsDetail lang={pageContext.lang} news={news} />
    </Layout>
  );
};
