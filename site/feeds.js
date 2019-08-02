const languageFallback = (obj, lang) => {
    if (obj) {
        if (obj[lang]) {
            return obj[lang];
        } else {
            const other = lang === 'fr' ? 'en' : 'fr';
            if (obj[other]) {
                return obj[other]
            }
        }
    }
};

const FEED_MAX_NUMBER_OF_ITEMS = 50;

const feedsMakers = [
    /**
     * News feeds maker
     */
    lang => ({
        serialize: ({ query: { allNewsJson } }) => {
          return allNewsJson.edges
          .filter(edge => !edge.node.draft)
          .filter((e, i) => i < FEED_MAX_NUMBER_OF_ITEMS)
          .sort((a, b) => {
            if (a.node.startDate > b.node.startDate) {
              return -1;
            } else return 1;
          })
          .map(edge => {
            return Object.assign( {
              title: languageFallback(edge.node.title, lang),
              description: languageFallback(edge.node.description, lang),
              date: edge.node.startDate,
              url: edge.node.permalink[lang],
              guid: edge.node.id,
              custom_elements: [{ 'content:encoded': languageFallback(edge.node.content, lang) }],
            })
          })
        },
        query: `
          {
            allNewsJson {
              edges {
                node {
                  id
                  title {
                    en
                    fr
                  }
                  draft
                  description {
                    en
                    fr
                  }
                  startDate
                  permalink {
                    en
                    fr
                  }
                  content {
                    en
                    fr
                  }
                }
              }
            }
          }
        `,
        output: lang === 'fr' ? '/actualites.feed.xml' : '/news.feed.xml',
        title: lang === 'fr' ? 'Actualités du médialab Sciences Po' : 'News from médialab SciencesPo',
    }),
    /**
     * Seminar sessions feeds maker
     */
    lang => ({
        serialize: ({ query: { allNewsJson } }) => {
          return allNewsJson.edges
          .sort((a, b) => {
            if (a.node.startDate > b.node.startDate) {
              return -1;
            } else return 1;
          })
          .filter(edge => !edge.node.draft && edge.node.label && edge.node.label.fr ===  'Séminaire de recherche')
          .filter((e, i) => i < FEED_MAX_NUMBER_OF_ITEMS)
          .map(edge => {
            return Object.assign( {
              title: edge.node.title[lang],
              description: languageFallback(edge.node.description, lang),
              date: edge.node.startDate,
              url: edge.node.permalink[lang],
              guid: edge.node.id,
              custom_elements: [{ 'content:encoded': languageFallback(edge.node.content, lang) }],
            })
          })
        },
        query: `
          {
            allNewsJson {
              edges {
                node {
                  id
                  title {
                    en
                    fr
                  }
                  draft
                  description {
                    en
                    fr
                  }
                  label {
                    en
                    fr
                  }
                  startDate
                  permalink {
                    en
                    fr
                  }
                  content {
                    en
                    fr
                  }
                }
              }
            }
          }
        `,
        output: lang === 'fr' ? '/seminaire.feed.xml' : '/seminar.feed.xml',
        title: lang === 'fr' ? 'Actualités du séminaire médialab Sciences Po' : 'News from médialab SciencesPo\s seminar',
    }),
    /**
     * Productions feeds maker
     */
    lang => ({
        serialize: ({ query: { allProductionsJson } }) => {
          return allProductionsJson.edges
          .filter(edge => !edge.node.draft)
          .filter((e, i) => i < FEED_MAX_NUMBER_OF_ITEMS)
          .sort((a, b) => {
            if (a.node.date > b.node.date) {
              return -1;
            } else return 1;
          })
          .map(edge => {
            return Object.assign( {
              title: `${languageFallback(edge.node.title, lang)} - ${edge.node.authors}`,
              description: languageFallback(edge.node.description, lang),
              date: edge.node.date,
              url: edge.node.permalink[lang],
              guid: edge.node.id,
              custom_elements: [{ 'content:encoded': languageFallback(edge.node.content, lang) }],
            })
          })
        },
        query: `
          {
            allProductionsJson {
              edges {
                node {
                  id
                  title {
                    en
                    fr
                  }
                  description {
                    en
                    fr
                  }
                  authors
                  date
                  draft
                  permalink {
                    en
                    fr
                  }
                  content {
                    en
                    fr
                  }
                }
              }
            }
          }
        `,
        output: lang === 'fr' ? '/productions-fr.feed.xml' : '/productions-en.feed.xml',
        title: lang === 'fr' ? 'Nouvelles productions du médialab Sciences Po' : 'New productions from médialab SciencesPo\s',
    }),
];

const feeds = feedsMakers.reduce((result, feedMaker) => {
    return [
        ...result,
        feedMaker('fr'),
        feedMaker('en')
    ];
}, []);

module.exports = feeds;