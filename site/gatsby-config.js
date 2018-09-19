module.exports = {
  siteMetadata: {
    title: 'médialab website',
  },
  plugins: [
    // 'gatsby-transformer-lowdb',
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: 'data',
    //     path: '../data/assets'
    //   }
    // },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'medialab-website',
        short_name: 'medialab',
        start_url: '/'
      }
    },
    'gatsby-plugin-offline'
  ],
  // mapping: {
  //   'PeopleJson.activities': 'ActivitiesJson'
  // }
};
