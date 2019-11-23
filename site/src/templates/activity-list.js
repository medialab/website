import React from 'react';

import Layout from '../components/Layout';
import ActivityListing from '../components/listings/ActivityListing';

export default ({data, pageContext}) => {
  // console.log(data, pageContext);

  const list = data.allActivitiesJson.edges.map(e => e.node);
  const statuses = data.facetedEnumsJson.activityStatuses;
  const topActivities = (data.settingsJson.topActivities || []).map(o => o.id);

  return (
    <Layout
      lang={pageContext.lang}
      className="page-activity-list body-page"
      permalinks={pageContext.permalinks}>
      <ActivityListing
        lang={pageContext.lang}
        list={list}
        status={pageContext.status}
        statuses={statuses}
        topActivities={topActivities} />
    </Layout>
  );
};
