import React from 'react';

import Layout from '../components/Layout';
import ProductionListing from '../components/listings/ProductionListing';

export default ({data, pageContext}) => {
  // console.log(data, pageContext);

  const list = data.allProductionsJson ?
    data.allProductionsJson.edges.map(e => e.node) :
    [];

  return (
    <Layout
      lang={pageContext.lang}
      className="page-production-list body-page"
      permalinks={pageContext.permalinks}>
      <ProductionListing
        lang={pageContext.lang}
        list={list}
        group={pageContext.group}
        types={data.facetedEnumsJson.productionTypes} />
    </Layout>
  );
};
