import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/layout';
import PublicationDetail from '../components/production-detail';

export const query = graphql`
  query($identifier: String!) {
    productionsJson(identifier: {eq: $identifier}) {
      ...PublicationDetail
    }
  }
`;

export default ({data, pageContext}) => {
  console.log(data, pageContext);

  return (
    <Layout lang={pageContext.lang}>
      <PublicationDetail data={data.productionsJson} />
    </Layout>
  );
};
