import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import PeopleDetail from '../components/pages_object/PeopleDetail';
import EditInAdmin from '../components/pages_object/fragments/EditInAdmin';


export const query = graphql`
  query($id: String!) {
    peopleJson(id: {eq: $id}) {
      ...PeopleDetail
    }
  }
`;

export default ({data, pageContext}) => {
  // console.log(data, pageContext);

  const person = data.peopleJson;

  return (
    <Layout
      lang={pageContext.lang}
      className="page-people body-page"
      permalinks={pageContext.permalinks}>
      {pageContext.linkToAdmin && <EditInAdmin draft={person.draft} linkToAdmin={pageContext.linkToAdmin} />}
      <PeopleDetail lang={pageContext.lang} person={person} />
    </Layout>
  );
};
