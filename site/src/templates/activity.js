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
  // console.log(data, pageContext);

  const activity = data.activitiesJson;

  return (
    <Layout
      lang={pageContext.lang}
      className="page-activity body-page"
      permalinks={pageContext.permalinks}>
      {pageContext.linkToAdmin && <div style={{textAlign: 'right'}}>{activity.draft ? <b>DRAFT</b> : <b>PUBLIC</b>} <a href={pageContext.linkToAdmin} target="_blank" rel="noopener noreferrer">éditer dans l'admin</a></div>}

      <ActivityDetail lang={pageContext.lang} activity={activity} />
    </Layout>
  );
};
