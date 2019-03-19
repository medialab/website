import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import NewsListing from '../components/NewsListing';

export const query = graphql`
  {
    allNewsJson {
      edges {
        node {
          id
          title{
            en
            fr
          }
          description {
            en
            fr
          }
          place
          label {
            en
            fr
          }
          startDate
          endDate
          isInternal
          permalink {
            en
            fr
          }
          type
          lastUpdated
        }
      }
    }
  }
`;

export default ({data, pageContext}) => {
  console.log(data, pageContext);

  const list = data.allNewsJson.edges
    .map(e => e.node)
    .sort(({startDate:aStart, endDate:aEnd}, {startDate:bStart, endDate:bEnd}) => {
      if (bEnd && aEnd) {
        return bEnd.localeCompare(aEnd)
      }
      else if (!bEnd && aEnd) {
        return bStart.localeCompare(aEnd);
      }
      else if (bEnd && !aEnd) {
        return bEnd.localeCompare(aStart);
      }
      else {
        return bStart.localeCompare(aStart);
      }
    });

  return (
    <Layout
      lang={pageContext.lang}
      className="page-news-list"
      permalinks={pageContext.permalinks}>
      <NewsListing lang={pageContext.lang} list={list} />
    </Layout>
  );
};
