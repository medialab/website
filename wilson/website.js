const PERMALINKS = require('./permalinks.js');
const enums = require('../specs/enums.json');
const {facetedEnums} = require('./facets.js');
const models = require('../specs/models.json');
const shuffle = require('pandemonium/shuffle');

// Constants
const TEMPLATES = {

  // Pages
  home: 'index',
  about: 'about',
  legal: 'legal',

  // Models
  activitiesDetail: 'activity',
  activitiesListing: 'activity-list',
  newsDetail: 'news',
  newsListing: 'news-list',
  peopleListing: 'people-list',
  peopleDetail: 'people',
  productionsDetail: 'production',
  productionsListing: 'production-list'
};

for (const k in TEMPLATES)
  TEMPLATES[k] = require.resolve(`../site/templates/${TEMPLATES[k]}.js`);

const MODEL_TO_DETAIL_TEMPLATE = {};

models.forEach(model => (MODEL_TO_DETAIL_TEMPLATE[model] = TEMPLATES[`${model}Detail`]));

module.exports = class Website {
  constructor(db) {
    this.pages = [];

    const settings = db.getSettings();

    // Home page
    this.pages.push({
      permalinks: PERMALINKS.home,
      template: TEMPLATES.home,
      data: {
        grid: settings.home.grid,
        slider: settings.home.slider,
        twitter: db.getTwitter(),
        github: db.getGithub(),
        rdv: db.getRdv()
      }
    });

    // Basic pages
    this.pages.push({
      permalinks: PERMALINKS.about,
      template: TEMPLATES.about
    });

    this.pages.push({
      permalinks: PERMALINKS.legal,
      template: TEMPLATES.legal
    });

    // Detail pages
    db.forEach(item => {
      this.pages.push({
        permalinks: item.permalink,
        template: MODEL_TO_DETAIL_TEMPLATE[item.model],
        data: item,
        scripts: item.model === 'people' ? ['people'] : null
      });
    });

    // Listing pages
    this.pages.push({
      permalinks: PERMALINKS.activities,
      template: TEMPLATES.activitiesListing,
      data: {
        activities: db.getModel('activities'),
        topActivities: settings.topActivities.map(o => o.id)
      },
      scripts: ['search', 'activity-listing']
    });

    this.pages.push({
      permalinks: PERMALINKS.news,
      template: TEMPLATES.newsListing,
      data: {
        news: db.getModel('news')
      },
      scripts: ['search', 'news-listing']
    });

    this.pages.push({
      permalinks: PERMALINKS.productions,
      template: TEMPLATES.productionsListing,
      context: {
        group: 'all'
      },
      data: {
        facetedEnums,
        productions: db.getModel('productions')
      },
      scripts: ['search', 'production-listing']
    });

    for (const group in enums.productionTypes.groups)
      this.pages.push({
        permalinks: {
          fr: PERMALINKS.productions.fr + '/' + group,
          en: PERMALINKS.productions.en + '/' + group
        },
        template: TEMPLATES.productionsListing,
        context: {
          group
        },
        data: {
          facetedEnums,
          productions: db.getModel('productions')
            .filter(p => p.group === group)
        },
        scripts: ['search', 'production-listing']
      });

    this.pages.push({
      permalinks: PERMALINKS.people,
      template: TEMPLATES.peopleListing,
      data: {
        people: shuffle(db.getModel('people'))
      },
      scripts: ['search']
    });
  }

  getPagesToRender() {
    return this.pages;
  }
};
