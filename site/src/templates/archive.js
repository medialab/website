import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import Archive from '../components/Archive';

export const query = graphql`
  {
    allActivitiesJson {
      edges {
        node {
          name
          permalink {
            en
            fr
          }
        }
      }
    }

    allNewsJson {
      edges {
        node {
          title {
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

    allProductionsJson {
      edges {
        node {
          title {
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
  }
`;

const getNode = ({node}) => node;

export default ({data, pageContext}) => {
  console.log(data, pageContext);

  const activities = data.allActivitiesJson.edges.map(getNode),
        news = data.allNewsJson.edges.map(getNode),
        productions = data.allProductionsJson.edges.map(getNode);

  return (
    <Layout
      lang={pageContext.lang}
      className="page-archive"
      permalinks={pageContext.permalinks}>
      <Archive
        lang={pageContext.lang}
        activities={activities}
        news={news}
        productions={productions} />
    </Layout>
  );
};
