import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import ProductionDetail from '../components/pages_object/ProductionDetail';

export const query = graphql`
  query($identifier: String!) {
    productionsJson(identifier: {eq: $identifier}) {
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
      {pageContext.linkToAdmin && <div style={{textAlign: 'right'}}>{production.draft ? <b>DRAFT</b> : <b>PUBLIC</b>} <a href={pageContext.linkToAdmin} target="_blank" rel="noopener noreferrer">éditer dans l'admin</a></div>}

      <ProductionDetail lang={pageContext.lang} production={production} />
    </Layout>
  );
};
