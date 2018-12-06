const path = require('path');

const ROOT_PATH = process.env.ROOT_PATH || '..';

module.exports = {
  siteMetadata: {
    title: 'médialab website',
    siteUrl: 'https://medialab.sciencespo.fr'
  },
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: path.join(ROOT_PATH, 'data', 'assets')
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'medialab-website',
        short_name: 'medialab',
        start_url: '/'
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-sitemap'
  ],
  mapping: {
    'ActivitiesJson.people': 'PeopleJson',
    'PublicationsJson.activities': 'ActivitiesJson',
    'PublicationsJson.people': 'PeopleJson',
    'PublicationsJson.publications': 'PublicationsJson',
    'NewsJson.activities': 'ActivitiesJson',
    'NewsJson.people': 'PeopleJson',
    'NewsJson.publications': 'PublicationsJson'
  }
};
