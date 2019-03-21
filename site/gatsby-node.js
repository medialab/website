/* eslint no-console: 0 */
const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');
const _ = require('lodash');

const {
  addBacklinkToGraphQLSchema,
  graphQLSchemaAdditionForSettings,
  graphQLSchemaAdditionFromJsonSchema,
  patchGraphQLSchema
} = require('./schema.js');

const {
  hashNode,
  createI18nPage
} = require('./utils.js');

const {
  template,
  resolveAttachments
} = require('./templating.js');

const ROOT_PATH = process.env.ROOT_PATH || '..';

const QUERIES = require('./queries.js');
const ENUMS = require(path.join(ROOT_PATH, 'specs', 'enums.json'));
const MODELS = require(path.join(ROOT_PATH, 'specs', 'models.json'));
const DB_PATH = path.join(ROOT_PATH, 'data');
const DB_GLOB = path.join(ROOT_PATH, 'data', '*.json');
const ASSETS_PATH = path.join(ROOT_PATH, 'data', 'assets');
const ASSETS_GLOB = path.join(ASSETS_PATH, '*');
const PUBLIC_PATH = path.join(process.cwd(), 'public', 'static');

const PRODUCTION_TYPE_TO_GROUP = {};

_.forEach(ENUMS.productionTypes.groups, (group, key) => {
  group.values.forEach(type => PRODUCTION_TYPE_TO_GROUP[type] = key);
});

const processing = require(path.join(ROOT_PATH, 'specs', 'processing.js')).sharpToString;

const MODELS_PATHS = {};
const SCHEMAS = {};
const GRAPHQL_SCHEMAS = {};

MODELS.forEach(model => {
  MODELS_PATHS[model] = path.join(DB_PATH, `${model}.json`);
  SCHEMAS[model] = require(path.join(ROOT_PATH, 'specs', 'schemas', `${model}.json`));
  GRAPHQL_SCHEMAS[model] = graphQLSchemaAdditionFromJsonSchema(model, SCHEMAS[model]);
});

MODELS_PATHS.settings = path.join(DB_PATH, 'settings.json');

function solveEnum(e, target, o) {
  const k = target + 'Label';

  o[k] = {};

  if (o[target]) {
    o[k].fr = e.fr[o[target]];
    o[k].en = e.en[o[target]];
  }
}

const MODEL_READERS = {
  activities({actions: {createNode, deleteNode}, getNode, pathPrefix}) {
    const rawData = fs.readFileSync(MODELS_PATHS.activities, 'utf-8');
    const data = JSON.parse(rawData);

    // Activities
    data.activities.forEach(activity => {

      const node = getNode(activity.id);

      if (node)
        deleteNode({node});

      // Processing HTML
      const content = template(pathPrefix, activity.content);

      const hash = hashNode(activity);

      const slug = _.last(activity.slugs);

      createNode({
        ...activity,
        content,
        attachments: resolveAttachments(pathPrefix, activity.attachments || []),
        permalink: {
          fr: `/activities/${slug}`,
          en: `/en/activities/${slug}`
        },
        identifier: activity.id,
        internal: {
          type: 'ActivitiesJson',
          contentDigest: hash,
          mediaType: 'application/json'
        }
      });
    });
  },

  people({actions: {createNode, deleteNode}, getNode, pathPrefix}) {
    const rawData = fs.readFileSync(MODELS_PATHS.people, 'utf-8');
    const data = JSON.parse(rawData);

    // People
    data.people.forEach(person => {

      const node = getNode(person.id);

      if (node)
        deleteNode({node});

      // Processing HTML
      const content = template(pathPrefix, person.bio);

      const hash = hashNode(person);

      const slug = _.last(person.slugs);

      createNode({
        ...person,
        bio: content,
        contacts: resolveAttachments(pathPrefix, person.contacts || []),
        permalink: {
          fr: `/people/${slug}`,
          en: `/en/people/${slug}`
        },
        identifier: person.id,
        internal: {
          type: 'PeopleJson',
          contentDigest: hash,
          mediaType: 'application/json'
        }
      });
    });
  },

  productions({actions: {createNode, deleteNode}, getNode, pathPrefix}) {
    const rawData = fs.readFileSync(MODELS_PATHS.productions, 'utf-8');
    const data = JSON.parse(rawData);

    // Productions
    data.productions.forEach(production => {

      const node = getNode(production.id);

      if (node)
        deleteNode({node});

      // Solving enums
      solveEnum(ENUMS.productionTypes, 'type', production);

      production.group = PRODUCTION_TYPE_TO_GROUP[production.type];

      const relevantGroupInfo = ENUMS.productionTypes.groups[production.group];

      production.groupLabel = {
        en: relevantGroupInfo.en,
        fr: relevantGroupInfo.fr
      };

      // Processing HTML
      const content = template(pathPrefix, production.content);

      const hash = hashNode(production);

      const slug = _.last(production.slugs);

      createNode({
        ...production,
        content,
        permalink: {
          fr: `/productions/${slug}`,
          en: `/en/productions/${slug}`
        },
        identifier: production.id,
        internal: {
          type: 'ProductionsJson',
          contentDigest: hash,
          mediaType: 'application/json'
        }
      });
    });
  },

  news({actions: {createNode, deleteNode}, getNode, pathPrefix}) {
    const rawData = fs.readFileSync(MODELS_PATHS.news, 'utf-8');
    const data = JSON.parse(rawData);

    // News
    data.news.forEach(news => {

      const node = getNode(news.id);

      if (node)
        deleteNode({node});

      // NOTE: renaming our `internal` prop because Gatsby does not like this very much...
      news.isInternal = news.internal;
      delete news.internal;

      // Processing HTML
      const content = template(pathPrefix, news.content);

      const hash = hashNode(news);

      const slug = _.last(news.slugs);

      createNode({
        ...news,
        content: content,
        permalink: {
          fr: `/news/${slug}`,
          en: `/en/news/${slug}`
        },
        identifier: news.id,
        internal: {
          type: 'NewsJson',
          contentDigest: hash,
          mediaType: 'application/json'
        }
      });
    });
  },

  settings({actions: {createNode, deleteNode}, getNode}) {
    const rawData = fs.readFileSync(MODELS_PATHS.settings, 'utf-8');
    const data = JSON.parse(rawData);

    const node = getNode('site-settings-node');

    if (node)
      deleteNode({node});

    const hash = hashNode(data.settings);

    createNode({
      ...data.settings,
      id: 'site-settings-node',
      internal: {
        type: 'SettingsJson',
        contentDigest: hash,
        mediaType: 'application/json'
      }
    });
  }
};

exports.sourceNodes = function(args) {

  const copyAsset = asset => {
    fs.copySync(
      asset,
      path.join(PUBLIC_PATH, path.basename(asset)),
      {overwrite: true}
    );
  };

  const deleteAsset = asset => {
    fs.unlinkSync(path.join(PUBLIC_PATH, path.basename(asset)));
  };

  // Handling assets
  chokidar
    .watch(ASSETS_GLOB)
    .on('add', copyAsset)
    .on('unlink', deleteAsset);

  // Handling database
  for (const model in MODEL_READERS)
    MODEL_READERS[model](args);

  chokidar
    .watch(DB_GLOB)
    .on('change', p => {
      const model = path.basename(p, '.json');

      if (!(model in MODEL_READERS))
        return;

      console.log(`Updating ${model}.json`);
      MODEL_READERS[model](args);
    });

  // Creating enum nodes
  const {actions: {createNode}} = args;

  const enumHash = hashNode(ENUMS);

  createNode({
    ...ENUMS,
    id: 'site-enums-node',
    internal: {
      type: 'EnumsJson',
      contentDigest: enumHash,
      mediaType: 'application/json'
    }
  });

  // Some faceted enums for templating convenience
  const facetedEnums = {
    activityStatuses: [
      {
        id: 'current',
        label: {
          en: 'Active',
          fr: 'Actives'
        },
        permalink: {
          en: '/en/activities/current',
          fr: '/activities/current'
        }
      },
      {
        id: 'past',
        label: {
          en: 'Past',
          fr: 'Passées'
        },
        permalink: {
          en: '/en/activities/past',
          fr: '/activities/past'
        }
      }
    ],
    productionTypes: ENUMS.productionTypes.groupOrder.map(group => {
      const e = ENUMS.productionTypes.groups[group];

      return {
        id: group,
        label: {
          en: e.en,
          fr: e.fr
        },
        permalink: {
          en: '/en/productions/' + group,
          fr: '/productions/' + group
        },
        values: e.values.map(v => {
          return {
            label: {
              en: ENUMS.productionTypes.en[v],
              fr: ENUMS.productionTypes.fr[v]
            },
            type: v
          }
        })
      }
    })
  };

  const facetedEnumHash = hashNode(facetedEnums);

  createNode({
    ...facetedEnums,
    id: 'site-faceted-enums-node',
    internal: {
      type: 'FacetedEnumsJson',
      contentDigest: facetedEnumHash,
      mediaType: 'application/json'
    }
  });
};

exports.createPages = function({graphql, actions}) {
  const {createPage} = actions;

  // Creating basic pages
  createI18nPage(createPage, {
    path: '/',
    component: path.resolve('./src/templates/index.js'),
    context: {
      today: (new Date()).toISOString().split('T')[0]
    }
  });

  createI18nPage(createPage, {
    path: '/about',
    component: path.resolve('./src/templates/about.js')
  });

  createI18nPage(createPage, {
    path: '/legal',
    component: path.resolve('./src/templates/legal.js')
  });

  createI18nPage(createPage, {
    path: '/404.html',
    component: path.resolve('./src/templates/error.js'),
    context: {
      code: 404
    }
  });

  // Activities
  createI18nPage(createPage, {
    path: '/activities',
    component: path.resolve('./src/templates/activity-list.js'),
    context: {
      status: 'all',
      allowedStatuses: [true, false]
    }
  });

  createI18nPage(createPage, {
    path: '/activities/current',
    component: path.resolve('./src/templates/activity-list.js'),
    context: {
      status: 'current',
      allowedStatuses: [true]
    }
  });

  createI18nPage(createPage, {
    path: '/activities/past',
    component: path.resolve('./src/templates/activity-list.js'),
    context: {
      status: 'past',
      allowedStatuses: [false]
    }
  });

  // News
  createI18nPage(createPage, {
    path: '/news',
    component: path.resolve('./src/templates/news-list.js')
  });

  // Productions
  createI18nPage(createPage, {
    path: '/productions',
    component: path.resolve('./src/templates/production-list.js'),
    context: {
      group: 'all',
      allowedTypes: Object.keys(ENUMS.productionTypes.en)
    }
  });

  for (const group in ENUMS.productionTypes.groups) {
    createI18nPage(createPage, {
      path: `/productions/${group}`,
      component: path.resolve('./src/templates/production-list.js'),
      context: {
        group,
        allowedTypes: ENUMS.productionTypes.groups[group].values
      }
    });
  }

  // People
  createI18nPage(createPage, {
    path: '/people',
    component: path.resolve('./src/templates/people-list.js')
  });

  // Chaining promises
  const promises = [

    // Activities
    graphql(QUERIES.ACTIVITIES).then(result => {
      if (!result.data)
        return;

      // Creating pages
      result.data.allActivitiesJson.edges.forEach(edge => {
        const activity = edge.node;

        const context = {
          identifier: activity.identifier
        };

        activity.slugs.forEach(slug => {
          createI18nPage(createPage, {
            path: `/activities/${slug}`,
            component: path.resolve('./src/templates/activity.js'),
            context
          });
        });
      });
    }),

    // People
    graphql(QUERIES.PEOPLE).then(result => {
      if (!result.data)
        return;

      // Creating pages
      result.data.allPeopleJson.edges.forEach(edge => {
        const person = edge.node;

        const context = {
          identifier: person.identifier
        };

        person.slugs.forEach(slug => {
          createI18nPage(createPage, {
            path: `/people/${slug}`,
            component: path.resolve('./src/templates/people.js'),
            context
          });
        });
      });
    }),

    // Productions
    graphql(QUERIES.PUBLICATION).then(result => {
      if (!result.data)
        return;

      // Creating pages
      result.data.allProductionsJson.edges.forEach(edge => {
        const production = edge.node;

        const context = {
          identifier: production.identifier
        };

        production.slugs.forEach(slug => {
          createI18nPage(createPage, {
            path: `/productions/${slug}`,
            component: path.resolve('./src/templates/production.js'),
            context
          });
        });
      });
    }),

    // News
    graphql(QUERIES.NEWS).then(result => {
      if (!result.data)
        return;

      // Creating pages
      result.data.allNewsJson.edges.forEach(edge => {
        const news = edge.node;

        const context = {
          identifier: news.identifier
        };

        news.slugs.forEach(slug => {
          createI18nPage(createPage, {
            path: `/news/${slug}`,
            component: path.resolve('./src/templates/news.js'),
            context
          });
        });

      });
    })
  ];

  return Promise.all(promises);
};

exports.setFieldsOnGraphQLNodeType = function({type, getNode, getNodesByType, pathPrefix}) {

  const settings = {
    assetsPath: ASSETS_PATH,
    publicPath: PUBLIC_PATH,
    prefix: pathPrefix,
    processing
  };

  if (type.name === 'SettingsJson') {
    return graphQLSchemaAdditionForSettings(GRAPHQL_SCHEMAS, getNode);
  }

  else if (type.name === 'ActivitiesJson') {
    patchGraphQLSchema(GRAPHQL_SCHEMAS, 'activities', type, SCHEMAS.activities, settings);
    return GRAPHQL_SCHEMAS.activities;
  }

  else if (type.name === 'PeopleJson') {
    patchGraphQLSchema(GRAPHQL_SCHEMAS, 'people', type, SCHEMAS.people, settings);
    addBacklinkToGraphQLSchema(
      getNodesByType.bind(null, 'ActivitiesJson'),
      GRAPHQL_SCHEMAS,
      'people',
      'activities'
    );
    addBacklinkToGraphQLSchema(
      getNodesByType.bind(null, 'NewsJson'),
      GRAPHQL_SCHEMAS,
      'people',
      'news'
    );
    addBacklinkToGraphQLSchema(
      getNodesByType.bind(null, 'ProductionsJson'),
      GRAPHQL_SCHEMAS,
      'people',
      'productions'
    );
    return GRAPHQL_SCHEMAS.people;
  }

  else if (type.name === 'ProductionsJson') {
    patchGraphQLSchema(GRAPHQL_SCHEMAS, 'productions', type, SCHEMAS.productions, settings);
    return GRAPHQL_SCHEMAS.productions;
  }

  else if (type.name === 'NewsJson') {
    patchGraphQLSchema(GRAPHQL_SCHEMAS, 'news', type, SCHEMAS.news, settings);
    return GRAPHQL_SCHEMAS.news;
  }

  return {};
};
