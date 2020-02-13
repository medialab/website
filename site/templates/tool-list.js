import React from 'react';

import Layout from '../components/Layout';
import ToolListing from '../components/listings/ToolListing';

export default ({data, pageContext}) => {

  return (
    <Layout
      lang={pageContext.lang}
      className="page-tool-list body-page"
      permalinks={pageContext.permalinks}>
      <ToolListing
        lang={pageContext.lang}
        list={data.tools} />
    </Layout>
  );
};
