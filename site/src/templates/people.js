import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/layout';
import PeopleDetail from '../components/people-detail';

export const query = graphql`
  query($identifier: String!) {
    peopleJson(identifier: {eq: $identifier}) {
      ...PeopleDetail
    }
  }
`;

export default ({data}) => {

  console.log(data)

  return (
    <Layout>
      <PeopleDetail people={data.peopleJson} />
    </Layout>
  );
};
