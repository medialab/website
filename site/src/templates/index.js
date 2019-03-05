import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import Home from '../components/Home';

export const query = graphql`
  {
    settingsJson {
      home {
        grid {
          id
          model
          data {
            ... on Activities {
              slugs
              coverImage{
                url
              }
              description{
                en
                fr
              }
              name
            }
            ... on News {
              slugs
              coverImage{
                url
              }
              description{
                en
                fr
              }
              title {
                en
                fr
              }
            }
            ... on Productions {
              slugs
              coverImage{
                url
              }
              description{
                en
                fr
              }
              title {
                en
                fr
              }
            }
          }
        }
        slider {
          id
          model
          data {
            ... on Activities {
              slugs
              name
              coverImage{
                url
              }
              baseline{
                en
                fr
              }
              description{
                en
                fr
              }
              baseline{
                en
                fr
              }
            }
            ... on News {
              slugs
              coverImage{
                url
              }
              place
              startDate
              endDate
              label{
                en
                fr
              }
              title {
                en
                fr
              }
            }
            ... on Productions {
              slugs
              coverImage{
                url
              }
              description{
                en
                fr
              }
              authors
              title {
                en
                fr
              }
            }
          }
        }
      }
    }
    rdv: allNewsJson(limit: 5) {
      edges {
        node {
          title {
            fr
            en
          }
          startDate
          endDate,
          label {
            en
            fr
          }
          place
        }
      }
    }
  }
`;

const IndexPage = ({data, pageContext}) => {
  console.log(data, pageContext);

  const grid = data.settingsJson.home.grid;
  const slider = data.settingsJson.home.slider;
  const rdv = data.rdv.edges.map(({node}) => node);
  const permalink = '';

  return (
    <Layout lang={pageContext.lang} className="page-home" permalink={permalink}>
      <Home lang={pageContext.lang} grid={grid} slider={slider} rdv={rdv} />
    </Layout>
  );
};

export default IndexPage;
