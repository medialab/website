import React from 'react';

import Layout from '../components/Layout';
import PeopleListing from '../components/listings/PeopleListing';

export default ({data, pageContext}) => {
  // console.log(data, pageContext);

  const list = data.allPeopleJson.edges.map(e => e.node);

  return (
    <Layout
      lang={pageContext.lang}
      className="page-people-list body-page"
      permalinks={pageContext.permalinks}>
      <PeopleListing lang={pageContext.lang} list={list} />
    </Layout>
  );
};
