import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/layout';
import PostDetail from '../components/post-detail';

export const query = graphql`
  query($id: String!) {
    postsJson(id: {eq: $id}) {
      ...PostDetail
    }
  }
`;

export default ({data}) => {

  console.log(data)

  return (
    <Layout>
      <PostDetail post={data.postsJson} />
    </Layout>
  );
};
