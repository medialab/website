import React from 'react';

import Layout from '../components/Layout';
import JobListing from '../components/listings/JobListing';
import {compare} from '../components/helpers/helpers';

export default ({data, pageContext}) => {
  // console.log(data, pageContext);

  // TODO: could be done in wilson
  let list = data.news.sort(
    (
      {startDate: aStart, endDate: aEnd},
      {startDate: bStart, endDate: bEnd}
    ) => {
      if (bEnd && aEnd) {
        return compare(bEnd, aEnd);
      } else if (!bEnd && aEnd) {
        return compare(bStart, aEnd);
      } else if (bEnd && !aEnd) {
        return compare(bEnd, aStart);
      } else {
        return compare(bStart, aStart);
      }
    }
  );

  list = list.filter(item => {
    return (
      item.label &&
      (item.label.fr === 'Emploi' || item.label.en === 'Job') &&
      !item.endDate &&
      !(item.title.fr || '').toLowerCase().includes('pourvu')
    );
  });

  return (
    <Layout
      lang={pageContext.lang}
      className="page-news-list body-page"
      permalinks={pageContext.permalinks}>
      <JobListing lang={pageContext.lang} list={list} />
    </Layout>
  );
};
