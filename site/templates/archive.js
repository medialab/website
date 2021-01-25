import React from 'react';

import Layout from '../components/Layout';
import Archive from '../components/Archive';

const getNode = ({node}) => node;

export default ({data, pageContext}) => {
  // console.log(data, pageContext);

  const activities = data.allActivitiesJson.edges.map(getNode),
    news = data.allNewsJson.edges.map(getNode),
    productions = data.allProductionsJson.edges.map(getNode);

  return (
    <Layout
      lang={pageContext.lang}
      className="page-archive body-page"
      permalinks={pageContext.permalinks}>
      <Archive
        lang={pageContext.lang}
        activities={activities}
        news={news}
        productions={productions}
      />
    </Layout>
  );
};
