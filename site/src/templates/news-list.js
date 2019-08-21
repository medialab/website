import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import NewsListing from '../components/listings/NewsListing';
import {compare} from '../components/helpers/helpers';

export const query = graphql`
  {
    allNewsJson {
      edges {
        node {
          title {
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
          coverImage {
            url
            processed {
              medium
            }
          }
        }
      }
    }
  }
`;

export default ({data, pageContext}) => {
  // console.log(data, pageContext);

  const list = data.allNewsJson.edges
    .map(e => e.node)
    .sort(({startDate: aStart, endDate: aEnd}, {startDate: bStart, endDate: bEnd}) => {
      if (bEnd && aEnd) {
        return compare(bEnd, aEnd);
      }
      else if (!bEnd && aEnd) {
        return compare(bStart, aEnd);
      }
      else if (bEnd && !aEnd) {
        return compare(bEnd, aStart);
      }
      else {
        return compare(bStart, aStart);
      }
    });

  return (
    <Layout
      lang={pageContext.lang}
      className="page-news-list body-page"
      permalinks={pageContext.permalinks}>
      <NewsListing lang={pageContext.lang} list={list} />
    </Layout>
  );
};
