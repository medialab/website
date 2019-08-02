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
          .sort((a, b) => {
            if (a.node.startDate > b.node.startDate) {
              return -1;
            } else return 1;
          })
          .filter((e, i) => i < FEED_MAX_NUMBER_OF_ITEMS)
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
        title: lang === 'fr' ? 'Programme du séminaire médialab Sciences Po' : 'Program of the médialab SciencesPo\'s seminar',
    }),
    /**
     * Productions feeds maker
     */
    lang => ({
        serialize: ({ query: { allProductionsJson } }) => {
          return allProductionsJson.edges
          .filter(edge => !edge.node.draft)
          .sort((a, b) => {
            if (a.node.date > b.node.date) {
              return -1;
            } else return 1;
          })
          .filter((e, i) => i < FEED_MAX_NUMBER_OF_ITEMS)
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
        title: lang === 'fr' ? 'Nouvelles productions du médialab Sciences Po' : 'New productions from médialab SciencesPo',
    }),
    /**
     * All objects feeds maker
     */
    lang => ({
      serialize: ({ query: { allProductionsJson, allNewsJson, allPeopleJson, allActivitiesJson } }) => {
        return [
          ...allPeopleJson.edges
          .filter(edge => !edge.node.draft)
          .map(edge => {
            return Object.assign( {
              title: `${edge.node.firstName} ${edge.node.lastName}`,
              description: languageFallback(edge.node.status, lang),
              date: edge.node.lastUpdated,
              url: edge.node.permalink[lang],
              guid: edge.node.id,
              custom_elements: [{ 'content:encoded': languageFallback(edge.node.bio, lang) }],
            })
          }),
          ...allNewsJson.edges
          .filter(edge => !edge.node.draft)
          .map(edge => {
            return Object.assign( {
              title: edge.node.title[lang],
              description: languageFallback(edge.node.description, lang),
              date: edge.node.lastUpdated,
              url: edge.node.permalink[lang],
              guid: edge.node.id,
              custom_elements: [{ 'content:encoded': languageFallback(edge.node.content, lang) }],
            })
          }),
          ...allProductionsJson.edges
            .filter(edge => !edge.node.draft)
            .map(edge => {
              return Object.assign( {
                title: `${languageFallback(edge.node.title, lang)} - ${edge.node.authors}`,
                description: languageFallback(edge.node.description, lang),
                date: edge.node.lastUpdated,
                url: edge.node.permalink[lang],
                guid: edge.node.id,
                custom_elements: [{ 'content:encoded': languageFallback(edge.node.content, lang) }],
              })
            }),
            ...allActivitiesJson.edges
            .filter(edge => !edge.node.draft)
            .map(edge => {
              return Object.assign( {
                title: edge.node.name,
                description: languageFallback(edge.node.baseline, lang),
                date: edge.node.lastUpdated,
                url: edge.node.permalink[lang],
                guid: edge.node.id,
                custom_elements: [{ 'content:encoded': languageFallback(edge.node.content, lang) }],
              })
            }),
        ]
        .sort((a, b) => {
          if (a.date > b.date) {
            return -1;
          } else return 1;
        })
        .filter((e, i) => i < FEED_MAX_NUMBER_OF_ITEMS)
      },
      query: `
        {
          allActivitiesJson {
            edges {
              node {
                id
                name
                draft
                lastUpdated
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
                content {
                  en
                  fr
                }
              }
            }
          }
          allPeopleJson {
            edges {
              node {
                firstName
                lastName
                bio {
                  en
                  fr
                }
                id
                draft
                lastUpdated
                status {
                  en
                  fr
                }
                permalink {
                  en
                  fr
                }
              }
            }
          }
          allNewsJson {
              edges {
                node {
                  id
                  lastUpdated
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
          allProductionsJson {
            edges {
              node {
                id
                lastUpdated
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

module.exports = feeds;