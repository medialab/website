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
            ... on ActivitiesJson {
              coverImage {
                url
                processed {
                  small
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
            ... on NewsJson {
              coverImage {
                url
                processed {
                  small
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
            ... on ProductionsJson {
              coverImage {
                url
                processed {
                  small
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
              authors
            }
          }
        }
        slider {
          model
          data {
            ... on ActivitiesJson {
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
              permalink {
                en
                fr
              }
            }
            ... on NewsJson {
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
              type
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
            ... on ProductionsJson {
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
              type
            }
          }
        }
      }
    }
    rdv: allNewsJson(
      limit: 7,
      filter: {expiry: {gte: $yesterday}, type: {eq: "event"}},
      sort: {fields: [expiry], order: [DESC]}
    ) {
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
          isInternal
          permalink {
            en
            fr
          }
        }
      }
    }
    tweets: allTwitterJson {
      edges {
        node {
          tweet
          text
          html
          date
          type
          originalTweet {
            tweet
            text
            html
            type
            name
            screenName
           }
        }
      }
    }
    github: allGithubJson {
      edges {
        node {
          repo,
          language,
          url,
          startDate,
          endDate,
          count,
          description,
          authors {
            nickname,
            url,
            slug,
            name,
            permalink {
              fr,
              en
            }
          }
        }
      }
    }
  }
`;

const IndexPage = ({data, pageContext}) => {
  // console.log(data, pageContext);

  const grid = data.settingsJson.home.grid.filter(item => !!item.data);
  const slider = data.settingsJson.home.slider.filter(item => !!item.data);
  const rdv = data.rdv ? data.rdv.edges.map(({node}) => node).filter(node => !!node) : [];
  const tweets = data.tweets ? data.tweets.edges.map(({node}) => node) : [];
  const github = data.github ? data.github.edges.map(({node}) => node) : [];

  return (
    <Layout
      lang={pageContext.lang}
      className="page-home body-page"
      permalinks={pageContext.permalinks}>
      <Home
        lang={pageContext.lang} grid={grid} slider={slider}
        rdv={rdv}
        tweets={tweets}
        github={github} />
    </Layout>
  );
};

export default IndexPage;
