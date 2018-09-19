import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/layout';
import PeopleDetail from '../components/people-detail';

export const query = graphql`
  query($id: String!) {
    peopleJson(id: {eq: $id}) {
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
