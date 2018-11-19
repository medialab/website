const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const chokidar = require('chokidar');
const createPaginatedPages = require('gatsby-paginate');
const cheerio = require('cheerio');
const _ = require('lodash');

const MODELS = require('../specs/models.json');
const DB_PATH = '../data';
const DB_GLOB = '../data/*.json';

const MODELS_PATHS = {};

MODELS.forEach(model => MODELS_PATHS[model] = path.join(DB_PATH, `${model}.json`));

const ACTIVITIES_QUERY = `
  {
    allActivitiesJson {
      edges {
        node {
          identifier
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
        }
      }
    }
  }
`;

// Helper extracting asset paths from html
function extractAssetsFromHtml(html) {
  const $ = cheerio.load(html);

  const assets = [];

  $('img').each(function() {
    assets.push($(this).attr('src'));
  });

  return assets;
}

const MODEL_READERS = {
  activities: function(createNode, deleteNode, getNode) {
    const rawData = fs.readFileSync(MODELS_PATHS.activities, 'utf-8');
    const data = JSON.parse(rawData);

    // Activities
    data.activities.forEach(activity => {

      const node = getNode(activity.id);

      if (node)
        deleteNode({node});

      const hash = crypto
        .createHash('md5')
        .update(JSON.stringify(activity))
        .digest('hex');

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

  people: function(createNode, deleteNode, getNode) {
    const rawData = fs.readFileSync(MODELS_PATHS.people, 'utf-8');
    const data = JSON.parse(rawData);

    // People
    data.people.forEach(person => {

      const node = getNode(person.id);

      if (node)
        deleteNode({node});

      const hash = crypto
        .createHash('md5')
        .update(JSON.stringify(person))
        .digest('hex');

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

  publications: function(createNode, deleteNode, getNode) {
    const rawData = fs.readFileSync(MODELS_PATHS.publications, 'utf-8');
    const data = JSON.parse(rawData);

    // Publications
    data.publications.forEach(publication => {

      const node = getNode(publication.id);

      if (node)
        deleteNode({node});

      const hash = crypto
        .createHash('md5')
        .update(JSON.stringify(publication))
        .digest('hex');

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

  news: function(createNode, deleteNode, getNode) {
    const rawData = fs.readFileSync(MODELS_PATHS.news, 'utf-8');
    const data = JSON.parse(rawData);

    // News
    data.news.forEach(news => {

      const node = getNode(news.id);

      if (node)
        deleteNode({node});

      const hash = crypto
        .createHash('md5')
        .update(JSON.stringify(news))
        .digest('hex');

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
  }
};

exports.sourceNodes = function({actions, getNode})  {
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

exports.createPages = function({graphql, actions, emitter})  {
  const {createPage, deletePage} = actions;

  const promises = [

    // Activities
    graphql(ACTIVITIES_QUERY).then(result => {
      if (!result.data)
        return;

      // Creating pages
      result.data.allActivitiesJson.edges.forEach(edge => {
        const activity = edge.node;

        const slug = `/activity-${activity.identifier}/`;

        const context = {
          identifier: activity.identifier
        };

        createPage({
          path: slug,
          component: path.resolve('./src/templates/activity.js'),
          context
        });
      });
    }),

    // People
    graphql(PEOPLE_QUERY).then(result => {
      if (!result.data)
        return;

      // Pagination
      createPaginatedPages({
        edges: result.data.allPeopleJson.edges,
        createPage,
        pageTemplate: path.resolve('./src/templates/people-index.js'),
        pageLength: 2,
        pathPrefix: 'people',
      });

      // Creating pages
      result.data.allPeopleJson.edges.forEach(edge => {
        const person = edge.node;

        const slug = `/people-${person.identifier}/`;

        const context = {
          assets: [],
          identifier: person.identifier
        };

        // Processing HTML
        if (person.bio && person.bio.fr)
          context.assets = extractAssetsFromHtml(person.bio.fr);

        if (person.bio && person.bio.en)
          context.assets = context.assets.concat(extractAssetsFromHtml(person.bio.en));

        createPage({
          path: slug,
          component: path.resolve('./src/templates/people.js'),
          context
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

        const slug = `/publication-${publication.identifier}/`;

        const context = {
          identifier: publication.identifier
        };

        createPage({
          path: slug,
          component: path.resolve('./src/templates/publication.js'),
          context
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

        const slug = `/news-${news.identifier}/`;

        const context = {
          identifier: news.identifier
        };

        createPage({
          path: slug,
          component: path.resolve('./src/templates/news.js'),
          context
        });
      });
    })
  ];

  return Promise.all(promises);
};
