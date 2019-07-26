import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import ProductionDetail from '../components/pages_object/ProductionDetail';

import EditInAdmin from '../components/pages_object/fragments/EditInAdmin';

export const query = graphql`
  query($id: String!) {
    productionsJson(id: {eq: $id}) {
      ...ProductionDetail
    }
  }
`;

export default ({data, pageContext}) => {
  // console.log(data, pageContext);

  const production = data.productionsJson;

  return (
    <Layout
      lang={pageContext.lang}
      className="page-production body-page"
      permalinks={pageContext.permalinks}>
      {pageContext.linkToAdmin && <EditInAdmin draft={production.draft} linkToAdmin={pageContext.linkToAdmin} />}

      <ProductionDetail lang={pageContext.lang} production={production} />
    </Layout>
  );
};
