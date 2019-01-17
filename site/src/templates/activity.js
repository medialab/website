import React from 'react';
import {graphql} from 'gatsby';
import {replaceAssetPaths} from '../utils';

import Layout from '../components/Layout';
import ActivityDetail from '../components/ActivityDetail';

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

  replaceAssetPaths(activity.assets, activity.content);

  return (
    <Layout lang={pageContext.lang}>
      <ActivityDetail lang={pageContext.lang} activity={activity} />
    </Layout>
  );
};

