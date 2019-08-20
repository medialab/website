import React from 'react';

import Layout from '../components/Layout';
import Page from '../components/ErrorPage';

const ErrorPage = ({pageContext}) => {
  // console.log(data, pageContext);

  return (
    <Layout
      lang={pageContext.lang}
      className="page-error body-page"
      permalinks={pageContext.permalinks}>
      <Page code={pageContext.code} lang={pageContext.lang} />
    </Layout>
  );
};

export default ErrorPage;
