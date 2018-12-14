/* eslint no-console: 0 */
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const _ = require('lodash');

const {
  graphQLSchemaAdditionForSettings,
  graphQLSchemaAdditionFromJsonSchema
} = require('./schema.js');

const {
  hashNode,
  replaceHTMLAssetPaths,
  createI18nPage
} = require('./utils.js');

const ROOT_PATH = process.env.ROOT_PATH || '..';

const QUERIES = require('./queries.js');
const MODELS = require(path.join(ROOT_PATH, 'specs', 'models.json'));
const DB_PATH = path.join(ROOT_PATH, 'data');
const DB_GLOB = path.join(ROOT_PATH, 'data', '*.json');

const MODELS_PATHS = {};
const SCHEMAS = {};

MODELS.forEach(model => {
  MODELS_PATHS[model] = path.join(DB_PATH, `${model}.json`);
  SCHEMAS[model] = require(path.join(ROOT_PATH, 'specs', 'schemas', `${model}.json`));
});

MODELS_PATHS.settings = path.join(DB_PATH, 'settings.json');

const MODEL_READERS = {
  activities(createNode, deleteNode, getNode) {
    const rawData = fs.readFileSync(MODELS_PATHS.activities, 'utf-8');
    const data = JSON.parse(rawData);

    // Activities
    data.activities.forEach(activity => {

      const node = getNode(activity.id);

      if (node)
        deleteNode({node});

      const hash = hashNode(activity);

      createNode({
        ...activity,
        identifier: activity.id,
        internal: {
          type: 'ActivitiesJson',
          contentDigest: hash,
          mediaType: 'application/json'
        }
      });
    });
  },

  people(createNode, deleteNode, getNode) {
    const rawData = fs.readFileSync(MODELS_PATHS.people, 'utf-8');
    const data = JSON.parse(rawData);

    // People
    data.people.forEach(person => {

      const node = getNode(person.id);

      if (node)
        deleteNode({node});

      const hash = hashNode(person);

      createNode({
        ...person,
        identifier: person.id,
        internal: {
          type: 'PeopleJson',
          contentDigest: hash,
          mediaType: 'application/json'
        }
      });
    });
  },

  productions(createNode, deleteNode, getNode) {
    const rawData = fs.readFileSync(MODELS_PATHS.productions, 'utf-8');
    const data = JSON.parse(rawData);

    // Productions
    data.productions.forEach(production => {

      const node = getNode(production.id);

      if (node)
        deleteNode({node});

      const hash = hashNode(production);

      createNode({
        ...production,
        identifier: production.id,
        internal: {
          type: 'ProductionsJson',
          contentDigest: hash,
          mediaType: 'application/json'
        }
      });
    });
  },

  news(createNode, deleteNode, getNode) {
    const rawData = fs.readFileSync(MODELS_PATHS.news, 'utf-8');
    const data = JSON.parse(rawData);

    // News
    data.news.forEach(news => {

      const node = getNode(news.id);

      if (node)
        deleteNode({node});

      const hash = hashNode(news);

      createNode({
        ...news,
        identifier: news.id,
        internal: {
          type: 'NewsJson',
          contentDigest: hash,
          mediaType: 'application/json'
        }
      });
    });
  },

  settings(createdNode, deleteNode, getNode) {
    const rawData = fs.readFileSync(MODELS_PATHS.settings, 'utf-8');
    const data = JSON.parse(rawData);

    const node = getNode('site-settings-node');

    if (node)
      deleteNode({node});

    const hash = hashNode(data.settings);

    createdNode({
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

exports.sourceNodes = function({actions, getNode}) {
  const {createNode, deleteNode} = actions;

  for (const model in MODEL_READERS)
    MODEL_READERS[model](createNode, deleteNode, getNode);

  chokidar
    .watch(DB_GLOB)
    .on('change', p => {
      const model = path.basename(p, '.json');

      if (!(model in MODEL_READERS))
        return;

      console.log(`Updating ${model}.json`);
      const update = MODEL_READERS[model].bind(null, createNode, deleteNode, getNode);

      update();

      // TODO: fix this hack. something is fishy here...
      setTimeout(update, 100);
    });
};

exports.createPages = function({graphql, actions}) {
  const {createPage} = actions;

  let FILES = null;

  // Creating basic pages
  createI18nPage(createPage, {
    path: '/',
    component: path.resolve('./src/templates/index.js'),
    context: {}
  });

  // Chaining promises
  const promises = () => [

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
          identifier: person.identifier,
          bio: {}
        };

        // Processing HTML
        if (person.bio && person.bio.en)
          context.bio.en = replaceHTMLAssetPaths(person.bio.en, FILES);

        if (person.bio && person.bio.fr)
          context.bio.fr = replaceHTMLAssetPaths(person.bio.fr, FILES);

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

  return graphql(QUERIES.FILE).then(result => {
    FILES = _.keyBy(result.data.allFile.edges.map(e => e.node), 'base');
  }).then(() => Promise.all(promises()));
};

exports.setFieldsOnGraphQLNodeType = function({type}) {

  if (type.name === 'SettingsJson') {
    return graphQLSchemaAdditionForSettings();
  }

  else if (type.name === 'ActivitiesJson') {
    const schema = SCHEMAS.activities;
    return graphQLSchemaAdditionFromJsonSchema('activities', schema);
  }

  else if (type.name === 'PeopleJson') {
    const schema = SCHEMAS.people;
    return graphQLSchemaAdditionFromJsonSchema('people', schema);
  }

  else if (type.name === 'ProductionsJson') {
    const schema = SCHEMAS.productions;
    return graphQLSchemaAdditionFromJsonSchema('productions', schema);
  }

  else if (type.name === 'NewsJson') {
    const schema = SCHEMAS.news;
    return graphQLSchemaAdditionFromJsonSchema('news', schema);
  }

  return {};
};
