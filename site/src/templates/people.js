import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import PeopleDetail from '../components/PeopleDetail';

export const query = graphql`
  query($identifier: String!) {
    peopleJson(identifier: {eq: $identifier}) {
      ...PeopleDetail
    }
  }
`;

export default ({data, pageContext}) => {
  console.log(data, pageContext);

  const person = data.peopleJson;

  return (
    <Layout lang={pageContext.lang}>
      <PeopleDetail lang={pageContext.lang} person={person} />
    </Layout>
  );
};
