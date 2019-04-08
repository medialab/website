import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import ActivityListing from '../components/ActivityListing';

export const query = graphql`
  query($allowedStatuses: [Boolean]!) {
    allActivitiesJson(filter: {active: {in: $allowedStatuses}}) {
      edges {
        node {
          id
          name
          active
          description {
            en
            fr
          }
          baseline {
            en
            fr
          }
          people {
            firstName
            lastName
          }
          permalink {
            en
            fr
          }
          coverImage {
            url
            processed {
              medium
            }
          }          
          type          
          lastUpdated
        }
      }
    }

    facetedEnumsJson {
      activityStatuses {
        id
        label {
          en
          fr
        }
        permalink {
          en
          fr
        }
      }
    }
  }
`;

export default ({data, pageContext}) => {
  console.log(data, pageContext);

  const list = data.allActivitiesJson.edges.map(e => e.node);
  const statuses = data.facetedEnumsJson.activityStatuses;

  return (
    <Layout
      lang={pageContext.lang}
      className="page-activity-list"
      permalinks={pageContext.permalinks}>
      <ActivityListing
        lang={pageContext.lang}
        list={list}
        status={pageContext.status}
        statuses={statuses} />
    </Layout>
  );
};
