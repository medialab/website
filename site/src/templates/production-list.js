import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import ProductionListing from '../components/pages_list/ProductionListing';

export const query = graphql`
  query ($allowedTypes: [String]!) {
    allProductionsJson(filter: {type: {in: $allowedTypes}, external: {ne: true}}) {
      edges {
        node {
          id
          title {
            en
            fr
          }
          description {
            en
            fr
          }
          type,
          group,
          permalink {
            en
            fr
          }
          type
          authors
          date
          external
        }
      }
    }

    facetedEnumsJson {
      productionTypes {
        id
        label {
          en
          fr
        }
        permalink {
          en
          fr
        }
        values {
          type
          label {
            en
            fr
          }
        }
      }
    }
  }
`;

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
