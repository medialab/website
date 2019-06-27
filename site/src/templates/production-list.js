import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import ProductionListing from '../components/pages_list/ProductionListing';

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
          type
          authors
          date
          lastUpdated
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
/*
          lastUpdated(formatString: "dddd DD MMMM YYYY")

*/
