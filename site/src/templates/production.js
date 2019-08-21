import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import ProductionDetail from '../components/details/ProductionDetail';

import EditInAdmin from '../components/details/fragments/EditInAdmin';

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
