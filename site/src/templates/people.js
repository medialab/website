import React from 'react';
import {graphql} from 'gatsby';
import {replaceAssetPaths} from '../utils';

import Layout from '../components/Layout';
import PeopleDetail from '../components/PeopleDetail';

export const query = graphql`
  query($identifier: String!) {
    peopleJson(identifier: {eq: $identifier}) {
      ...PeopleDetail
    }
    allActivitiesJson(filter: {rawPeople: {eq: $identifier}}) {
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

  const person = data.peopleJson;

  replaceAssetPaths(person.assets, person.bio);

  // Relations
  person.activities = data.allActivitiesJson.edges.map(e => e.node);

  return (
    <Layout lang={pageContext.lang}>
      <PeopleDetail lang={pageContext.lang} person={person} />
    </Layout>
  );
};
