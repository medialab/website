import React from 'react';

import Layout from '../components/Layout';
import PeopleDetail from '../components/details/PeopleDetail';
import EditInAdmin from '../components/details/fragments/EditInAdmin';

export default ({data, pageContext}) => {
  // console.log(data, pageContext);

  const person = data.person;

  return (
    <Layout
      lang={pageContext.lang}
      className="page-people body-page"
      permalinks={pageContext.permalinks}>
      {pageContext.linkToAdmin && <EditInAdmin draft={person.draft} linkToAdmin={pageContext.linkToAdmin} />}
      <PeopleDetail
        lang={pageContext.lang}
        person={person}
        siteUrl={data.site.siteMetadata.siteUrl} />
    </Layout>
  );
};
