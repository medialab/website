import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import Page from '../components/ErrorPage';


const ErrorPage = ({data, pageContext}) => {
  // console.log(data, pageContext);

  const {code} = pageContext;
  const permalink = `${code}.html`;

  return (
    <Layout lang={pageContext.lang} className="page-error body-page" permalink={permalink}>
      <Page code={code} lang={pageContext.lang} />
    </Layout>
  );
};

export default ErrorPage;
