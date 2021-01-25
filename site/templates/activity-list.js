import React from 'react';

import Layout from '../components/Layout';
import ActivityListing from '../components/listings/ActivityListing';

export default ({data, pageContext}) => {
  const topActivities = data.topActivities;

  return (
    <Layout
      lang={pageContext.lang}
      className="page-activity-list body-page"
      permalinks={pageContext.permalinks}>
      <ActivityListing
        lang={pageContext.lang}
        list={data.activities}
        topActivities={topActivities}
      />
    </Layout>
  );
};
