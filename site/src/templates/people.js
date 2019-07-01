import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import PeopleDetail from '../components/pages_object/PeopleDetail';

export const query = graphql`
  query($identifier: String!) {
    peopleJson(identifier: {eq: $identifier}) {
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
      {pageContext.linkToAdmin && <div style={{textAlign: 'right'}}>{person.draft ? <b>DRAFT</b> : <b>PUBLIC</b>} <a href={pageContext.linkToAdmin} target="_blank" rel="noopener noreferrer">éditer dans l'admin</a></div>}
      <PeopleDetail lang={pageContext.lang} person={person} />
    </Layout>
  );
};
