import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/layout';
import ProductionDetail from '../components/production-detail';

export const query = graphql`
  query($identifier: String!) {
    productionsJson(identifier: {eq: $identifier}) {
      ...ProductionDetail
    }
  }
`;

export default ({data, pageContext}) => {
  console.log(data, pageContext);

  return (
    <Layout lang={pageContext.lang}>
      <ProductionDetail data={data.productionsJson} />
    </Layout>
  );
};
