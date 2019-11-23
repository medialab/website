const assert = require('assert');
const groupBy = require('lodash/groupBy');
const Graph = require('graphology').Graph;
const path = require('path');
const fs = require('fs-extra');
const reducers = require('./reducers.js');
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
    this.store.github = fs.readJSONSync(path.join(directory, 'github.json'));
    this.store.twitter = fs.readJSONSync(path.join(directory, 'twitter.json'));

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
              console.warn(`wilson/database: "${target}" node not found!`);
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

  get(id) {
    assert(this.graph.hasNode(id));

    return this.graph.getNodeAttributes(id);
  }

  getModel(model) {
    return this.store[model];
  }

  forEach(callback) {
    this.graph.forEachNode((node, attr) => {
      callback(attr);
    });
  }
}
