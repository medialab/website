import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import Home from '../components/Home';

export const query = graphql`
  query($ids: [String]!) {
    allActivitiesJson(filter: {identifier: {in: $ids}}) {
      edges {
        node {
          id
          name
        }
      }
    }
    allNewsJson(filter: {identifier: {in: $ids}}) {
      edges {
        node {
          id
          title {
            fr
            en
          }
        }
      }
    }
    allPeopleJson(filter: {identifier: {in: $ids}}) {
      edges {
        node {
          id
          firstName
          lastName
        }
      }
    }
    allProductionsJson(filter: {identifier: {in: $ids}}) {
      edges {
        node {
          id
          title {
            fr
            en
          }
        }
      }
    }
    rdv: allNewsJson(limit: 5) {
      edges {
        node {
          title {
            fr
            en
          }
          startDate
          endDate
        }
      }
    }
  }
`;

const IndexPage = ({data, pageContext}) => {
  console.log(data, pageContext);

  const index = {};

  data.allActivitiesJson.edges.forEach(({node}) => index[node.id] = node);
  data.allNewsJson.edges.forEach(({node}) => index[node.id] = node);
  data.allPeopleJson.edges.forEach(({node}) => index[node.id] = node);
  data.allProductionsJson.edges.forEach(({node}) => index[node.id] = node);

  const grid = pageContext.grid.map(({id}) => index[id]);
  const slider = pageContext.grid.map(({id}) => index[id]);
  const rdv = data.rdv.edges.map(({node}) => node);

  return (
    <Layout lang={pageContext.lang}>
      <Home grid={grid} slider={slider} rdv={rdv} />
    </Layout>
  );
};

export default IndexPage;
