const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const chokidar = require('chokidar');
const createPaginatedPages = require('gatsby-paginate');
const cheerio = require('cheerio');
const _ = require('lodash');

const DB_PATH = '../data/db.json';

const OWN_TYPES = new Set(['PostsJson', 'PeopleJson', 'ActivitiesJson']);

const POSTS_QUERY = `
  {
    allPostsJson {
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
        bio
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

// Reading data helper
function readDatabase(createNode, deleteNode, getNode) {
  console.log('Updating from database...');

  const rawData = fs.readFileSync(DB_PATH, 'utf-8');
  const data = JSON.parse(rawData);

  const activitiesIndex = _.keyBy(data.activities, 'id');

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

  // People
  data.people.forEach(person => {

    const node = getNode(person.id);

    if (node)
      deleteNode({node});

    // Solving relations
    // TODO: solve by mapping if need to split the database in chunks?
    person = {
      ...person,
      activities: (person.activities || []).map(i => activitiesIndex[i])
    };

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

  // Posts
  data.posts.forEach(post => {

    const node = getNode(post.id);

    if (node)
      deleteNode({node});

    const hash = crypto
      .createHash('md5')
      .update(JSON.stringify(post))
      .digest('hex');

    createNode({
      ...post,
      identifier: post.id,
      internal: {
        type: 'PostsJson',
        contentDigest: hash,
        mediaType: 'application/json'
      }
    });
  });
}

exports.sourceNodes = ({actions, getNode}) => {
  const {createNode, deleteNode} = actions;

  const update = readDatabase.bind(null, createNode, deleteNode, getNode);

  update();

  chokidar
    .watch(DB_PATH)
    .on('change', (event, path) => {
      update();
    });
};

exports.createPages = function({graphql, actions, emitter})  {
  const {createPage, deletePage} = actions;

  const promises = [

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
        if (person.bio)
          context.assets = extractAssetsFromHtml(person.bio);

        createPage({
          path: slug,
          component: path.resolve('./src/templates/people.js'),
          context
        });
      });
    }),

    // Posts
    graphql(POSTS_QUERY).then(result => {

      if (!result.data)
        return;

      // Creating pages
      result.data.allPostsJson.edges.forEach(edge => {
        const post = edge.node;

        const slug = `/post-${post.identifier}/`;

        createPage({
          path: slug,
          component: path.resolve('./src/templates/post.js'),
          context: {
            identifier: post.identifier
          }
        });
      });
    })
  ];

  return Promise.all(promises);
};
