import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';
import Home from '../components/home/Home';

export const query = graphql`
  query($yesterday: Int!) {
    settingsJson {
      home {
        grid {
          model
          data {
            ... on Activities {
              coverImage {
                url
                processed {
                  medium
                }
              }
              description {
                en
                fr
              }
              name
              baseline {
                en
                fr
              }
              permalink {
                en
                fr
              }
              type
            }
            ... on News {
              coverImage {
                url
                processed {
                  medium
                }
              }
              description {
                en
                fr
              }
              title {
                en
                fr
              }
              permalink {
                en
                fr
              }
              type
              startDate
              endDate
            }
            ... on Productions {
              coverImage {
                url
                processed {
                  medium
                }
              }
              description {
                en
                fr
              }
              title {
                en
                fr
              }
              permalink {
                en
                fr
              }
              type
              typeLabel {
                en
                fr
              }
            }
          }
        }
        slider {
          model
          data {
            ... on Activities {
              name
              coverImage {
                url
                processed {
                  large
                  medium
                }
              }
              baseline {
                en
                fr
              }
              description {
                en
                fr
              }
              baseline {
                en
                fr
              }
              permalink {
                en
                fr
              }
            }
            ... on News {
              coverImage {
                url
                processed {
                  large
                  medium
                }
              }
              place
              startDate
              endDate
              label {
                en
                fr
              }
              title {
                en
                fr
              }
              permalink {
                en
                fr
              }
              description {
                en
                fr
              }
            }
            ... on Productions {
              coverImage {
                url
                processed {
                  large
                  medium
                }
              }
              description {
                en
                fr
              }
              authors
              title {
                en
                fr
              }
              permalink {
                en
                fr
              }
              typeLabel {
                en
                fr
              }
            }
          }
        }
      }
    }
    rdv: allNewsJson(limit: 7, filter: {expiry: {gte: $yesterday}}, sort: {fields: [expiry], order: [DESC]}) {
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
          permalink {
            en
            fr
          }
        }
      }
    }
  }
`;

const IndexPage = ({data, pageContext}) => {
  console.log(data, pageContext);

  const grid = data.settingsJson.home.grid;
  const slider = data.settingsJson.home.slider;
  const rdv = data.rdv ? data.rdv.edges.map(({node}) => node) : [];

  return (
    <Layout
      lang={pageContext.lang}
      className="page-home"
      permalinks={pageContext.permalinks}>
      <Home
        lang={pageContext.lang} grid={grid} slider={slider}
        rdv={rdv} />
    </Layout>
  );
};

export default IndexPage;
