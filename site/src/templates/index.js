import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import Home from '../components/Home';

export const query = graphql`
  {
    allPeopleJson {
      edges {
        node {
          id
          slugs
          firstName
          lastName
        }
      }
    }
    allActivitiesJson {
      edges {
        node {
          id
          slugs
          name
        }
      }
    }
    allProductionsJson {
      edges {
        node {
          id
          slugs
          title {
            en
            fr
          }
        }
      }
    }
    allNewsJson {
      edges {
        node {
          id
          slugs
          title {
            en
            fr
          }
        }
      }
    }
    settingsJson {
      home {
        editorialization
      }
    }
  }
`;

const IndexPage = ({data, pageContext}) => {
  console.log(data);

  return (
    <Layout lang={pageContext}>
      <Home />
    </Layout>
  );
};

export default IndexPage;
