import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import ActivityListing from '../components/pages_list/ActivityListing';

export const query = graphql`
  query($allowedStatuses: [Boolean]!) {
    allActivitiesJson(filter: {active: {in: $allowedStatuses}}) {
      edges {
        node {
          id
          name
          active
          startDate
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
              large
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

    settingsJson {
      topActivities {
        model
        data {
          ... on Activities {
            id
          }
        }
      }
    }
  }
`;

export default ({data, pageContext}) => {
  // console.log(data, pageContext);

  const list = data.allActivitiesJson.edges.map(e => e.node);
  const statuses = data.facetedEnumsJson.activityStatuses;
  const topActivities = (data.settingsJson.topActivities || []).map(o => o.data.id);

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
        topActivities={topActivities}  />
    </Layout>
  );
};
