import React, {useContext} from 'react';

import SiteContext from '../context';
import Layout from '../components/Layout';
import ActivityDetail from '../components/details/ActivityDetail';
import EditInAdmin from '../components/details/fragments/EditInAdmin';

export default function ActivityTemplate({data, pageContext}) {
  // console.log(data, pageContext);
  const meta = useContext(SiteContext);

  const activity = data;

  return (
    <Layout
      lang={pageContext.lang}
      className="page-activity body-page"
      permalinks={pageContext.permalinks}>
      {pageContext.linkToAdmin && (
        <EditInAdmin item={activity} linkToAdmin={pageContext.linkToAdmin} />
      )}

      <ActivityDetail
        lang={pageContext.lang}
        activity={activity}
        siteUrl={meta.siteUrl}
      />
    </Layout>
  );
}
