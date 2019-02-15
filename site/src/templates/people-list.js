import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import PeopleListing from '../components/PeopleListing';

export const query = graphql`
  {
    allPeopleJson {
      edges {
        node {
          firstName
          lastName
          slugs
          id
          domain
          active
          membership
          role{
            fr
            en
          }
        }
      }
    }
  }
`;

export default ({data, pageContext}) => {
  console.log(data, pageContext);

  const list = data.allPeopleJson.edges.map(e => e.node);

  return (
    <Layout lang={pageContext.lang} className="page-people-list">
      <PeopleListing lang={pageContext.lang} list={list} />
    </Layout>
  );
};
