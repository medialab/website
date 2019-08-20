import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import Archive from '../components/Archive';

export const query = graphql`
  {
    allActivitiesJson {
      edges {
        node {
          id
          active
          name
          permalink {
            en
            fr
          }
          type
          typeLabel {
            en
            fr
          }
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
        }
      }
    }

    allNewsJson {
      edges {
        node {
          id
          title {
            en
            fr
          }
          permalink {
            en
            fr
          }
          description {
            en
            fr
          }
          place
          label {
            en
            fr
          }
          type
          typeLabel {
            en
            fr
          }
          startDate
          endDate
        }
      }
    }

    allProductionsJson {
      edges {
        node {
          title {
            en
            fr
          }
          description {
            en
            fr
          }
          type,
          group,
          typeLabel {
            en
            fr
          }
          permalink {
            en
            fr
          }
          type
          authors
          date
        }
      }
    }
  }
`;

const getNode = ({node}) => node;

export default ({data, pageContext}) => {
  // console.log(data, pageContext);

  const activities = data.allActivitiesJson.edges.map(getNode),
        news = data.allNewsJson.edges.map(getNode),
        productions = data.allProductionsJson.edges.map(getNode);

  return (
    <Layout
      lang={pageContext.lang}
      className="page-archive body-page"
      permalinks={pageContext.permalinks}>
      <Archive
        lang={pageContext.lang}
        activities={activities}
        news={news}
        productions={productions} />
    </Layout>
  );
};
