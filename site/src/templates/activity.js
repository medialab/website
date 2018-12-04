import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/layout';
import ActivityDetail from '../components/activity-detail';

export const query = graphql`
  query($identifier: String!) {
    activitiesJson(identifier: {eq: $identifier}) {
      ...ActivityDetail
    }
  }
`;

export default ({data, pageContext}) => {
  console.log(data, pageContext);

  return (
    <Layout>
      <ActivityDetail data={data.activitiesJson} />
    </Layout>
  );
};
