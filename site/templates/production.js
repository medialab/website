import React, {useContext} from 'react';

import SiteContext from '../context';
import Layout from '../components/Layout';
import ProductionDetail from '../components/details/ProductionDetail';

import EditInAdmin from '../components/details/fragments/EditInAdmin';

export default function ProductionTemplate({data, pageContext}) {
  // console.log(data, pageContext);
  const meta = useContext(SiteContext);

  const production = data;

  return (
    <Layout
      lang={pageContext.lang}
      className="page-production body-page"
      permalinks={pageContext.permalinks}>
      {pageContext.linkToAdmin && <EditInAdmin draft={production.draft} linkToAdmin={pageContext.linkToAdmin} />}

      <ProductionDetail
        lang={pageContext.lang}
        production={production}
        siteUrl={meta.siteUrl} />
    </Layout>
  );
}
