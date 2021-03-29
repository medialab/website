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
  productionsListing: 'production-list',
  toolsListing: 'tool-list'
};

for (const k in TEMPLATES)
  TEMPLATES[k] = require.resolve(`../site/templates/${TEMPLATES[k]}.js`);

const MODEL_TO_DETAIL_TEMPLATE = {};

models.forEach(
  model => (MODEL_TO_DETAIL_TEMPLATE[model] = TEMPLATES[`${model}Detail`])
);

module.exports = class Website {
  constructor(db) {
    this.pages = [];
    this.index = {fr: {}, en: {}};

    const settings = db.getSettings();

    // TODO: maybe data should be a function to avoid mutation time travel

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
      },
      scripts: ['internal-search'],
      itemsWithCover(data) {
        return data.grid.concat(data.slider).filter(item => item.cover);
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
        scripts: item.model === 'people' ? ['people'] : null,
        itemsWithCover(data) {
          if (data.cover) return [data];

          return [];
        }
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
      scripts: ['search', 'activity-listing'],
      itemsWithCover(data) {
        return data.activities.filter(item => item.cover);
      }
    });

    this.pages.push({
      permalinks: PERMALINKS.news,
      template: TEMPLATES.newsListing,
      data: {
        news: db.getModel('news')
      },
      scripts: ['search', 'news-listing'],
      itemsWithCover(data) {
        return data.news.filter(item => item.cover);
      }
    });

    this.pages.push({
      permalinks: PERMALINKS.tools,
      template: TEMPLATES.toolsListing,
      data: {
        tools: db
          .getModel('productions')
          .filter(item => item.type === 'code' || item.type === 'software')
      },
      scripts: ['search'],
      itemsWithCover(data) {
        return data.tools.filter(item => item.cover);
      }
    });

    // Filter out external productions
    const productions = db
      .getModel('productions')
      .filter(item => !item.external);

    this.pages.push({
      permalinks: PERMALINKS.productions,
      template: TEMPLATES.productionsListing,
      context: {
        group: 'all'
      },
      data: {
        facetedEnums,
        productions
      },
      scripts: ['search', 'production-listing'],
      itemsWithCover(data) {
        return data.productions.filter(item => item.cover);
      }
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
          productions: productions.filter(p => p.group === group)
        },
        scripts: ['search', 'production-listing'],
        itemsWithCover(data) {
          return data.productions.filter(item => item.cover);
        }
      });

    this.pages.push({
      permalinks: PERMALINKS.people,
      template: TEMPLATES.peopleListing,
      data: {
        people: shuffle(db.getModel('people'))
      },
      scripts: ['search'],
      itemsWithCover(data) {
        return data.people.filter(item => item.cover);
      }
    });

    // Indexing pages
    this.pages.forEach(page => {
      this.index.fr[page.permalinks.fr] = page;
      this.index.en[page.permalinks.en] = page;
    });
  }

  getPagesToRender() {
    return this.pages;
  }

  get(permalink) {
    let page = this.index.fr[permalink];

    if (page)
      return {
        lang: 'fr',
        page
      };

    page = this.index.en[permalink];

    if (page)
      return {
        lang: 'en',
        page
      };

    return;
  }
};
