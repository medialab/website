import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import Archive from '../components/Archive';


export default ({data, pageContext}) => {
  console.log(data, pageContext);

  return (
    <Layout
      lang={pageContext.lang}
      className="page-archive"
      permalinks={pageContext.permalinks}>
      <Archive lang={pageContext.lang} />
    </Layout>
  );
};
