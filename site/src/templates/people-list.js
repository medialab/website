import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import PeopleListing from '../components/listings/PeopleListing';

export const query = graphql`
  {
    allPeopleJson {
      edges {
        node {
          firstName
          lastName
          coverImage {
            url
          }
          domain
          active
          membership
          permalink {
            en
            fr
          }
          status {
            fr
            en
          }
          role {
            fr
            en
          }
        }
      }
    }
  }
`;

export default ({data, pageContext}) => {
  // console.log(data, pageContext);

  const list = data.allPeopleJson.edges.map(e => e.node);

  return (
    <Layout
      lang={pageContext.lang}
      className="page-people-list body-page"
      permalinks={pageContext.permalinks}>
      <PeopleListing lang={pageContext.lang} list={list} />
    </Layout>
  );
};
