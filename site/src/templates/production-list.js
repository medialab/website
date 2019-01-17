import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import ProductionListing from '../components/ProductionListing';

export const query = graphql`
  {
    allProductionsJson {
      edges {
        node {
          title {
            en
            fr
          }
        }
      }
    }
  }
`;

export default ({data, pageContext}) => {
  console.log(data, pageContext);

  const list = data.allProductionsJson.edges.map(e => e.node);

  return (
    <Layout lang={pageContext.lang}>
      <ProductionListing lang={pageContext.lang} list={list} />
    </Layout>
  );
};

