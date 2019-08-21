import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import NewsDetail from '../components/details/NewsDetail';
import EditInAdmin from '../components/details/fragments/EditInAdmin';

export const query = graphql`
  query($id: String!) {
    newsJson(id: {eq: $id}) {
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
      {pageContext.linkToAdmin && <EditInAdmin draft={news.draft} linkToAdmin={pageContext.linkToAdmin} />}
      <NewsDetail lang={pageContext.lang} news={news} />
    </Layout>
  );
};
