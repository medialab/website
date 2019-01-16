const path = require('path');

const ROOT_PATH = process.env.ROOT_PATH || '..';

module.exports = {
  siteMetadata: {
    title: 'médialab website',
    siteUrl: 'https://medialab.sciencespo.fr'
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-svg',
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
    'ActivitiesJson.assets': 'File.base',
    'ActivitiesJson.people': 'PeopleJson',
    'PeopleJson.assets': 'File.base',
    'PeopleJson.mainActivities': 'ActivitiesJson',
    'PeopleJson.mainProductions': 'ProductionsJson',
    'ProductionsJson.assets': 'File.base',
    'ProductionsJson.activities': 'ActivitiesJson',
    'ProductionsJson.people': 'PeopleJson',
    'ProductionsJson.productions': 'ProductionsJson',
    'NewsJson.assets': 'File.base',
    'NewsJson.activities': 'ActivitiesJson',
    'NewsJson.people': 'PeopleJson',
    'NewsJson.productions': 'ProductionsJson'
  }
};
