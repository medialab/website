const get = require('lodash/fp/get');
const siteUrl = require('./meta.js').siteUrl;

const languageFallback = (obj, lang) => {
  if (obj) {
    if (obj[lang]) {
      return obj[lang];
    }
    else {
      const other = lang === 'fr' ? 'en' : 'fr';

      if (obj[other]) {
        return obj[other];
      }
    }
  }
};

const createComparator = prop => (a, b) => {
  a = get(prop, a);
  b = get(prop, b);

  if (a > b)
    return -1;

  else if (a < b)
    return 1;

  return 0;
};

const FEED_MAX_NUMBER_OF_ITEMS = 50;

const feedsMakers = [

    /**
     * All objects feeds maker
     */
    lang => ({
      serialize: ({query: {allProductionsJson, allNewsJson, allPeopleJson, allActivitiesJson}}) => {
        return [
          ...allPeopleJson.edges
          .filter(edge => !edge.node.draft)
          .map(edge => {
            return Object.assign({
              title: `${edge.node.firstName} ${edge.node.lastName}`,
              description: languageFallback(edge.node.status, lang),
              date: edge.node.lastUpdated,
              url: siteUrl + edge.node.permalink[lang],
              guid: siteUrl + edge.node.permalink[lang],
              custom_elements: [{'content:encoded': languageFallback(edge.node.bio, lang)}]
            });
          }),
          ...allNewsJson.edges
          .filter(edge => !edge.node.draft)
          .map(edge => {
            return Object.assign({
              title: edge.node.title[lang],
              description: languageFallback(edge.node.description, lang),
              date: edge.node.lastUpdated,
              url: siteUrl + edge.node.permalink[lang],
              guid: siteUrl + edge.node.permalink[lang],
              custom_elements: [{'content:encoded': languageFallback(edge.node.content, lang)}]
            });
          }),
          ...allProductionsJson.edges
            .filter(edge => !edge.node.draft)
            .map(edge => {
              return Object.assign({
                title: `${languageFallback(edge.node.title, lang)} - ${edge.node.authors}`,
                description: languageFallback(edge.node.description, lang),
                date: edge.node.lastUpdated,
                url: siteUrl + edge.node.permalink[lang],
                guid: siteUrl + edge.node.permalink[lang],
                custom_elements: [{'content:encoded': languageFallback(edge.node.content, lang)}]
              });
            }),
            ...allActivitiesJson.edges
            .filter(edge => !edge.node.draft)
            .map(edge => {
              return Object.assign({
                title: edge.node.name,
                description: languageFallback(edge.node.baseline, lang),
                date: edge.node.lastUpdated,
                url: siteUrl + edge.node.permalink[lang],
                guid: siteUrl + edge.node.permalink[lang],
                custom_elements: [{'content:encoded': languageFallback(edge.node.content, lang)}]
              });
            }),
        ]
        .sort(createComparator('date'))
        .slice(0, FEED_MAX_NUMBER_OF_ITEMS);
      },
      output: lang === 'fr' ? '/all-updates-fr.feed.xml' : '/all-updates-en.feed.xml',
      title: lang === 'fr' ? 'Toutes les mises à jour du médialab Sciences Po' : 'All updates from médialab SciencesPo',
  }),
];

const feeds = feedsMakers.reduce((result, feedMaker) => {
  return [
    ...result,
    feedMaker('fr'),
    feedMaker('en')
  ];
}, []);

// Adding the main feed
const mainFeed = {
  ...feeds.find(feed => feed.output === '/all-updates-fr.feed.xml')
};
mainFeed.output = '/feed';
feeds.push(mainFeed);

module.exports = feeds;
