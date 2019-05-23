import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import Page from '../components/ErrorPage';


const ErrorPage = ({data, pageContext}) => {
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
