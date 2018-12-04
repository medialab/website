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

export default ({data, pageContext}) => {
  console.log(data, pageContext);

  return (
    <Layout>
      <PeopleDetail data={data.peopleJson} bio={pageContext.bio} />
    </Layout>
  );
};
