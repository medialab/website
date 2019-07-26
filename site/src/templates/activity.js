import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import ActivityDetail from '../components/pages_object/ActivityDetail';
import EditInAdmin from '../components/pages_object/fragments/EditInAdmin';

export const query = graphql`
  query($id: String!) {
    activitiesJson(id: {eq: $id}) {
      ...ActivityDetail
    }
  }
`;

export default ({data, pageContext}) => {
  // console.log(data, pageContext);

  const activity = data.activitiesJson;

  return (
    <Layout
      lang={pageContext.lang}
      className="page-activity body-page"
      permalinks={pageContext.permalinks}>
      {pageContext.linkToAdmin && <EditInAdmin draft={activity.draft} linkToAdmin={pageContext.linkToAdmin} />}

      <ActivityDetail lang={pageContext.lang} activity={activity} />
    </Layout>
  );
};
