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
        }
      }
    }
  }
`;

export default ({data, pageContext}) => {
  console.log(data, pageContext);

  const list = data.allPeopleJson.edges.map(e => e.node);

  return (
    <Layout lang={pageContext.lang}>
      <PeopleListing lang={pageContext.lang} list={list} />
    </Layout>
  );
};
