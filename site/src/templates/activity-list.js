import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import ActivityListing from '../components/ActivityListing';

export const query = graphql`
  {
    allActivitiesJson {
      edges {
        node {
          name
        }
      }
    }
  }
`;

export default ({data, pageContext}) => {
  console.log(data, pageContext);

  const list = data.allActivitiesJson.edges.map(e => e.node);

  return (
    <Layout lang={pageContext.lang}>
      <ActivityListing lang={pageContext.lang} list={list} />
    </Layout>
  );
};

