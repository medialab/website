import React from 'react';

import Layout from '../components/Layout';
import NewsListing from '../components/listings/NewsListing';
import {compare} from '../components/helpers/helpers';

export default ({data, pageContext}) => {
  // console.log(data, pageContext);

  // TODO: could be done in wilson
  const list = data.news
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
