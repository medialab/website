import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/layout';
import PublicationDetail from '../components/publication-detail';

export const query = graphql`
  query($identifier: String!) {
    publicationsJson(identifier: {eq: $identifier}) {
      ...PublicationDetail
    }
  }
`;

export default ({data, pageContext}) => {
  console.log(data, pageContext);

  return (
    <Layout lang={pageContext.lang}>
      <PublicationDetail data={data.publicationsJson} />
    </Layout>
  );
};
