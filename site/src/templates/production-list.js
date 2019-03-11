import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import ProductionListing from '../components/ProductionListing';

// TODO: is the groupLabel necessary here?
export const query = graphql`
  query ($allowedTypes: [String]!) {
    allProductionsJson(filter: {type: {in: $allowedTypes}}) {
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
          typeLabel {
            en
            fr
          }
          groupLabel {
            en
            fr
          }
          permalink {
            en
            fr
          }
          slugs
          type
          authors
          date
          lastUpdated
        }
      }
    }

    facetedEnumsJson {
      productionTypes {
        label {
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
  console.log(data, pageContext);

  const list = data.allProductionsJson.edges.map(e => e.node);
  const permalink = 'productions';

  return (
    <Layout lang={pageContext.lang} className="page-production-list" permalink={permalink}>
      <ProductionListing
        lang={pageContext.lang}
        list={list}
        group={pageContext.group}
        types={data.facetedEnumsJson.productionTypes} />
    </Layout>
  );
};
/*
          lastUpdated(formatString: "dddd DD MMMM YYYY")

*/
