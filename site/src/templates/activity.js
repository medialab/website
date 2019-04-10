import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import ActivityDetail from '../components/pages_object/ActivityDetail';

export const query = graphql`
  query($identifier: String!) {
    activitiesJson(identifier: {eq: $identifier}) {
      ...ActivityDetail
    }
  }
`;

export default ({data, pageContext}) => {
  console.log(data, pageContext);

  const activity = data.activitiesJson;

  return (
    <Layout
      lang={pageContext.lang}
      className="page-activity"
      permalinks={pageContext.permalinks}>
      <ActivityDetail lang={pageContext.lang} activity={activity} />
    </Layout>
  );
};
