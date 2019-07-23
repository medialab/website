const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID;

const plugins = [
  'gatsby-plugin-sass',
  'gatsby-plugin-react-svg',
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
];

if (GOOGLE_ANALYTICS_ID)
  plugins.push({
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      trackingId: GOOGLE_ANALYTICS_ID,
      anonymize: true,
      respectDNT: true
    }
  });

module.exports = {
  siteMetadata: {
    title: 'médialab website',
    siteUrl: 'https://medialab.sciencespo.fr'
  },
  plugins,
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
