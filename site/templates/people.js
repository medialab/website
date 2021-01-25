import React, {useContext} from 'react';

import SiteContext from '../context';
import Layout from '../components/Layout';
import PeopleDetail from '../components/details/PeopleDetail';
import EditInAdmin from '../components/details/fragments/EditInAdmin';

export default function PeopleTemplate({data, pageContext}) {
  // console.log(data, pageContext);

  const meta = useContext(SiteContext);

  const person = data;

  return (
    <Layout
      lang={pageContext.lang}
      className="page-people body-page"
      permalinks={pageContext.permalinks}>
      {pageContext.linkToAdmin && (
        <EditInAdmin item={person} linkToAdmin={pageContext.linkToAdmin} />
      )}
      <PeopleDetail
        lang={pageContext.lang}
        person={person}
        siteUrl={meta.siteUrl}
      />
    </Layout>
  );
}
