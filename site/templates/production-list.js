import React from 'react';

import Layout from '../components/Layout';
import ProductionListing from '../components/listings/ProductionListing';

export default ({data, pageContext}) => {
  // console.log(data, pageContext);

  return (
    <Layout
      lang={pageContext.lang}
      className="page-production-list body-page"
      permalinks={pageContext.permalinks}>
      <ProductionListing
        lang={pageContext.lang}
        list={data.productions}
        group={pageContext.group}
        types={data.facetedEnums.productionTypes}
      />
    </Layout>
  );
};
