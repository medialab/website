const async = require('async');
const assert = require('assert');
const groupBy = require('lodash/groupBy');
const Graph = require('graphology').Graph;
const path = require('path');
const fs = require('fs-extra');
const reducers = require('./reducers.js');
const {buildCover} = require('./images.js');
const models = require('../specs/models.json');

const FORWARD_LINKS = {
  activities: {
    people: 'people'
  },
  news: {
    activities: 'activities',
    people: 'people',
    productions: 'productions'
  },
  people: {
    mainActivities: 'activities',
    mainProductions: 'productions'
  },
  productions: {
    activities: 'activities',
    people: 'people'
  }
};

const BACKWARD_LINKS = {
  activities: {
    news: 'news',
    productions: 'productions'
  },
  people: {
    activities: 'activities',
    news: 'news',
    productions: 'productions'
  }
};

const SELF_LINKS = {
  activities: 'activities',
  productions: 'productions'
};

module.exports = class Database {
  constructor(directory, pathPrefix='') {
    this.store = {};
    this.graph = new Graph();

    models.forEach(model => {
      const modelData = fs.readJSONSync(path.join(directory, `${model}.json`));

      this.store[model] = modelData[model];

      this.store[model].forEach(item => {
        item.model = model;
        this.graph.addNode(item.id);
      });
    });

    this.store.settings = fs.readJSONSync(path.join(directory, 'settings.json')).settings;

    this.store.github = [];
    this.store.twitter = [];

    const githubPath = path.join(directory, 'github.json');
    const twitterPath = path.join(directory, 'twitter.json');

    if (fs.existsSync(githubPath))
      this.store.github = fs.readJSONSync(githubPath).map(reducers.github);

    if (fs.existsSync(twitterPath))
      this.store.twitter = fs.readJSONSync(twitterPath);

    // Adding edges and reducing items
    models.forEach(model => {
      const forward = FORWARD_LINKS[model];

      this.store[model] = this.store[model].map(item => {

        // Applying reducers
        const data = reducers[model](pathPrefix, item);

        for (const k in forward) {
          if (!(k in item))
            continue

          item[k].forEach(target => {
            if (!this.graph.hasNode(target)) {
              console.warn(`wilson/database: "${target}" - ${k} node not found (from "${item.id}" - ${item.model})!`);
              return;
            }

            this.graph.addEdge(item.id, target);
          });
        }

        if (model in SELF_LINKS && SELF_LINKS[model] in item) {
          item[SELF_LINKS[model]].forEach(target => {
            this.graph.mergeUndirectedEdge(item.id, target);
          });
        }

        this.graph.replaceNodeAttributes(item.id, data);

        return data;
      });
    });

    // Hydrating links
    this.graph.forEachNode((node, attr) => {

      // Forward
      if (attr.model in FORWARD_LINKS) {
        const forward = FORWARD_LINKS[attr.model];

        for (const k in forward) {
          if (!(k in attr)) {
            attr[k] = [];
            continue;
          }

          attr[k] = attr[k]
            .filter(id => this.graph.hasNode(id))
            .map(id => this.graph.getNodeAttributes(id));
        }
      }

      // Self
      if (attr.model in SELF_LINKS) {
        attr[SELF_LINKS[attr.model]] = this.graph
          .undirectedNeighbors(node)
          .map(neighbor => {
            return this.graph.getNodeAttributes(neighbor)
          });
      }

      // Backwards
      const backlinks = this.graph
        .inNeighbors(node)
        .map(neighbor => {
          return this.graph.getNodeAttributes(neighbor);
        });

      const groupedBacklinks = groupBy(backlinks, item => item.model);

      if (attr.model in BACKWARD_LINKS) {
        const backward = BACKWARD_LINKS[attr.model];

        for (const k in backward)
          attr[k] = groupedBacklinks[k] || [];
      }
    });
  }

  processCovers(inputDir, outputDir, pathPrefix, callback) {
    const data = this.graph.nodes()
      .map(node => {
        return this.graph.getNodeAttributes(node);
      })
      .filter(item => {
        return !!item.cover;
      });

    async.eachLimit(data, 10, (item, next) => {
      return buildCover(inputDir, outputDir, pathPrefix, item, (err, coverImage) => {
        if (err)
          return next(err);

        item.coverImage = coverImage;

        return next();
      });
    }, callback);
  }

  get(id) {
    assert(this.graph.hasNode(id));

    return this.graph.getNodeAttributes(id);
  }

  getModel(model) {
    return this.store[model];
  }

  getSettings() {
    return this.store.settings;
  }

  forEach(callback) {
    this.graph.forEachNode((node, attr) => {
      callback(attr);
    });
  }
}
