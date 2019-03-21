import React from 'react';
//import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import Legal from '../components/Legal';

export default ({data, pageContext}) => {
  console.log(data, pageContext);

  return (
    <Layout
      lang={pageContext.lang}
      className="page-legal"
      permalinks={pageContext.permalinks}>
      <Legal lang={pageContext.lang} />
    </Layout>
  );
};
