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
  const permalink = `people/${person.slugs[ person.slugs.length-1 ]}`;

  return (
    <Layout lang={pageContext.lang} className="page-people" permalink={permalink}>
      <PeopleDetail lang={pageContext.lang} person={person} />
    </Layout>
  );
};
