/* eslint no-console: 0 */
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const chokidar = require('chokidar');
const GraphQLTypes = require('gatsby/graphql');
const _ = require('lodash');

const ROOT_PATH = process.env.ROOT_PATH || '..';

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

const FILE_QUERY = `
  {
    allFile(filter: {sourceInstanceName: {eq: "assets"}}) {
      edges {
        node {
          base,
          publicURL
        }
      }
    }
  }
`;

const ACTIVITIES_QUERY = `
  {
    allActivitiesJson {
      edges {
        node {
          identifier
          slugs
        }
      }
    }
  }
`;

const PEOPLE_QUERY = `
  {
    allPeopleJson {
      edges {
        node {
          identifier
          slugs
          bio {
            en
            fr
          }
        }
      }
    }
  }
`;

const PUBLICATION_QUERY = `
  {
    allPublicationsJson {
      edges {
        node {
          identifier
          slugs
        }
      }
    }
  }
`;

const NEWS_QUERY = `
  {
    allNewsJson {
      edges {
        node {
          identifier
          slugs
        }
      }
    }
  }
`;

// Helper hashing a node's data
function hashNode(data) {

  return crypto
    .createHash('md5')
    .update(JSON.stringify(data))
    .digest('hex');
}

// Helper replacing HTML assets
function replaceHTMLAssetPaths(html, index) {

  // TODO: this approach may be too slow in the future!
  for (const base in index) {
    const publicURL = index[base].publicURL;
    html = html.replace(base, publicURL);
  }

  return html;
}

// Helper creating an internationalized page
function createI18nPage(createPage, page) {

  // Default page
  createPage({
    ...page,
    context: {
      ...page.context,
      lang: 'fr'
    }
  });

  // French page
  createPage({
    ...page,
    path: '/fr' + page.path,
    context: {
      ...page.context,
      lang: 'fr'
    }
  });

  // English page
  createPage({
    ...page,
    path: '/en' + page.path,
    context: {
      ...page.context,
      lang: 'en'
    }
  });
}

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

  publications(createNode, deleteNode, getNode) {
    const rawData = fs.readFileSync(MODELS_PATHS.publications, 'utf-8');
    const data = JSON.parse(rawData);

    // Publications
    data.publications.forEach(publication => {

      const node = getNode(publication.id);

      if (node)
        deleteNode({node});

      const hash = hashNode(publication);

      createNode({
        ...publication,
        identifier: publication.id,
        internal: {
          type: 'PublicationsJson',
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
    graphql(ACTIVITIES_QUERY).then(result => {
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
    graphql(PEOPLE_QUERY).then(result => {
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

    // Publications
    graphql(PUBLICATION_QUERY).then(result => {
      if (!result.data)
        return;

      // Creating pages
      result.data.allPublicationsJson.edges.forEach(edge => {
        const publication = edge.node;

        const context = {
          identifier: publication.identifier
        };

        publication.slugs.forEach(slug => {
          createI18nPage(createPage, {
            path: `/publications/${slug}`,
            component: path.resolve('./src/templates/publication.js'),
            context
          });
        });
      });
    }),

    // News
    graphql(NEWS_QUERY).then(result => {
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

  return graphql(FILE_QUERY).then(result => {
    FILES = _.keyBy(result.data.allFile.edges.map(e => e.node), 'base');
  }).then(() => Promise.all(promises()));
};

function recurseIntoSchema(model, meta) {

  if (meta.type === 'string')
    return {type: GraphQLTypes.GraphQLString};

  if (meta.type === 'number')
    return {type: GraphQLTypes.GraphQLFloat};

  if (meta.type === 'boolean')
    return {type: GraphQLTypes.GraphQLBoolean};

  // if (meta.type === 'array')
  //   return {type: new GraphQLTypes.GraphQLList(GraphQLTypes.GraphQLString)};

  if (meta.type === 'object') {
    const fields = {};

    for (const k in meta.properties)
      fields[k] = recurseIntoSchema(model, meta.properties[k]);

    return {
      type: new GraphQLTypes.GraphQLObjectType({
        name: model + '__' + _.deburr(meta.title),
        fields
      })
    };
  }
}

function graphQLSchemaAdditionFromJsonSchema(model, schema) {
  const item = {};

  for (const k in schema.properties) {
    if (k === 'id')
      continue;

    const meta = schema.properties[k];
    const addition = recurseIntoSchema(model, meta);

    if (addition)
      item[k] = addition;
  }

  return item;
}

function getSettingsSchema() {
  return {
    home: {
      type: new GraphQLTypes.GraphQLObjectType({
        name: 'settings__home',
        fields: {
          editorialization: {
            type: new GraphQLTypes.GraphQLList(
              new GraphQLTypes.GraphQLList(GraphQLTypes.GraphQLString)
            )
          }
        }
      })
    }
  };
}

exports.setFieldsOnGraphQLNodeType = function({type}) {

  if (type.name === 'SettingsJson') {
    return getSettingsSchema();
  }

  else if (type.name === 'ActivitiesJson') {
    const schema = SCHEMAS.activities;
    return graphQLSchemaAdditionFromJsonSchema('activities', schema);
  }

  else if (type.name === 'PeopleJson') {
    const schema = SCHEMAS.people;
    return graphQLSchemaAdditionFromJsonSchema('people', schema);
  }

  else if (type.name === 'PublicationsJson') {
    const schema = SCHEMAS.publications;
    return graphQLSchemaAdditionFromJsonSchema('publications', schema);
  }

  else if (type.name === 'NewsJson') {
    const schema = SCHEMAS.news;
    return graphQLSchemaAdditionFromJsonSchema('news', schema);
  }

  return {};
};
