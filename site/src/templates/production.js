import React from 'react';
import {graphql} from 'gatsby';
import {replaceAssetPaths} from '../utils';

import Layout from '../components/Layout';
import ProductionDetail from '../components/ProductionDetail';

export const query = graphql`
  query($identifier: String!) {
    productionsJson(identifier: {eq: $identifier}) {
      ...ProductionDetail
    }
  }
`;

export default ({data, pageContext}) => {
  console.log(data, pageContext);

  const production = data.productionsJson;

  replaceAssetPaths(production.assets, production.content);

  return (
    <Layout lang={pageContext.lang}>
      <ProductionDetail lang={pageContext.lang} production={production} />
    </Layout>
  );
};
