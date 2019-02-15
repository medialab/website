import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import NewsListing from '../components/NewsListing';

export const query = graphql`
  {
    allNewsJson {
      edges {
        node {
          id
          title {
            fr
            en
          }
        }
      }
    }
  }
`;

export default ({data, pageContext}) => {
  console.log(data, pageContext);

  const list = data.allNewsJson.edges.map(e => e.node);
  const permalink = 'news';

  return (
    <Layout lang={pageContext.lang} className="page-news-list" permalink={permalink}>
      <NewsListing lang={pageContext.lang} list={list} />
    </Layout>
  );
};
