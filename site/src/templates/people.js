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

  return (
    <Layout lang={pageContext.lang}>
      <PeopleDetail data={data.peopleJson} bio={pageContext.bio} />
    </Layout>
  );
};
