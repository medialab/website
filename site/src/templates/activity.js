import React from 'react';
import {graphql} from 'gatsby';
import {replaceAssetPaths} from '../utils';

import Layout_objet from '../components/Layout_objet';
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

  replaceAssetPaths(data.activitiesJson.assets, data.activitiesJson.bio);

  return (
    <Layout_objet lang={pageContext.lang}>
      <ActivityDetail lang={pageContext.lang} data={data.activitiesJson} />
    </Layout_objet>
  );
};
