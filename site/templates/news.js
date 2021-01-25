import React, {useContext} from 'react';

import SiteContext from '../context';
import Layout from '../components/Layout';
import NewsDetail from '../components/details/NewsDetail';
import EditInAdmin from '../components/details/fragments/EditInAdmin';

export default function NewsTemplate({data, pageContext}) {
  const meta = useContext(SiteContext);

  const news = data;

  return (
    <Layout
      lang={pageContext.lang}
      className="page-news body-page"
      permalinks={pageContext.permalinks}>
      {pageContext.linkToAdmin && (
        <EditInAdmin item={news} linkToAdmin={pageContext.linkToAdmin} />
      )}
      <NewsDetail lang={pageContext.lang} news={news} siteUrl={meta.siteUrl} />
    </Layout>
  );
}
