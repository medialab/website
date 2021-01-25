/* eslint no-console: 0 */
const async = require('async');
const assert = require('assert');
const cloneDeep = require('lodash/cloneDeep');
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
  productions: 'productions',
  news: 'news'
};

class Database {
  constructor(store, options) {
    options = options || {};

    const pathPrefix = options.pathPrefix || '';
    const skipDrafts = options.skipDrafts || false;

    const draftIds = new Set();

    this.options = options;
    this.store = store;
    this.graph = new Graph();

    // Hydrating graph & filtering drafts
    models.forEach(model => {
      store[model] = store[model].filter(item => {
        if (skipDrafts && item.draft) {
          draftIds.add(item.id);
          return false;
        }

        // Tagging model
        item.model = model;

        this.graph.addNode(item.id);
        return true;
      });
    });

    // Adding edges and reducing items
    models.forEach(model => {
      const forward = FORWARD_LINKS[model];

      this.store[model] = this.store[model].map(item => {
        // Applying reducers
        item = reducers[model](pathPrefix, item);

        for (const k in forward) {
          if (!(k in item)) continue;

          item[k].forEach(target => {
            if (!this.graph.hasNode(target)) {
              if (!draftIds.has(target))
                console.warn(
                  `wilson/database: "${target}" - ${k} node not found (from "${item.id}" - ${item.model})!`
                );
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

        this.graph.replaceNodeAttributes(item.id, item);

        return item;
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
            return this.graph.getNodeAttributes(neighbor);
          });
      }

      // Backwards
      const backlinks = this.graph.inNeighbors(node).map(neighbor => {
        return this.graph.getNodeAttributes(neighbor);
      });

      const groupedBacklinks = groupBy(backlinks, item => item.model);

      if (attr.model in BACKWARD_LINKS) {
        const backward = BACKWARD_LINKS[attr.model];

        for (const k in backward) attr[k] = groupedBacklinks[k] || [];
      }
    });

    // Filling productions authors
    this.store.productions.forEach(production => {
      if (
        !production.authors &&
        production.people &&
        production.people.length > 0
      ) {
        production.authors = production.people
          .map(p => `${p.firstName} ${p.lastName}`)
          .join(', ');
      }
    });

    // Hydrating home settings
    const homeSettings = this.store.settings.home;

    homeSettings.grid = homeSettings.grid
      .filter(item => {
        if (draftIds.has(item.id)) {
          console.warn(
            `wilson/database: found draft ${item.model} "${item.id}" in home grid.`
          );
          return false;
        }

        return true;
      })
      .map(item => {
        return this.graph.getNodeAttributes(item.id);
      });

    homeSettings.slider = homeSettings.slider
      .filter(item => {
        if (draftIds.has(item.id)) {
          console.warn(
            `wilson/database: found draft ${item.model} "${item.id}" in home slider.`
          );
          return false;
        }

        return true;
      })
      .map(item => {
        return this.graph.getNodeAttributes(item.id);
      });
  }

  processCovers(inputDir, outputDir, pathPrefix, options, callback) {
    this.coverImageCache = {};

    const data = this.graph
      .nodes()
      .map(node => {
        return this.graph.getNodeAttributes(node);
      })
      .filter(item => {
        if (!item.cover) return false;

        // TODO: could be more efficient since we have the relevant ids
        if (options.only && !options.only.has(item.id)) return false;

        return true;
      });

    async.eachLimit(
      data,
      10,
      (item, next) => {
        // Using provided external cache (typically from long-running preview)
        if (this.options.coverImageCache) {
          const cache = this.options.coverImageCache[item.id];

          if (cache && cache.file === item.cover.file) {
            item.coverImage = cache.data;

            return next();
          }
        }

        return buildCover(
          inputDir,
          outputDir,
          pathPrefix,
          item,
          options,
          (err, coverImage) => {
            if (err) return next(err);

            item.coverImage = coverImage;
            this.coverImageCache[item.id] = {
              file: item.cover.file,
              data: coverImage
            };

            return next();
          }
        );
      },
      err => {
        if (err) return callback(err);

        const bufferIndex = {};

        data.forEach(item => {
          if (item.coverImage.buffer)
            bufferIndex[item.coverImage.url] = item.coverImage.buffer;
        });

        return callback(null, bufferIndex);
      }
    );
  }

  get(id) {
    assert(this.graph.hasNode(id));

    return this.graph.getNodeAttributes(id);
  }

  getModel(model) {
    return this.store[model].slice();
  }

  getSettings() {
    return this.store.settings;
  }

  getTwitter() {
    return this.store.twitter;
  }

  getGithub() {
    return this.store.github;
  }

  getRdv() {
    const today = (+new Date() / 1000) | 0;

    return this.getModel('news')
      .filter(news => {
        return news.expiry > today && news.type === 'event';
      })
      .sort((a, b) => {
        return a.expiry - b.expiry;
      })
      .slice(0, 7);
  }

  forEach(callback) {
    this.graph.forEachNode((node, attr) => {
      callback(attr);
    });
  }
}

function loadFluxFromDisk(inputDir) {
  const data = {
    github: [],
    twitter: []
  };

  const githubPath = path.join(inputDir, 'github.json');
  const twitterPath = path.join(inputDir, 'twitter.json');

  if (fs.existsSync(githubPath)) {
    try {
      data.github = fs.readJSONSync(githubPath).map(reducers.github);
    } catch (e) {
      console.error('Error while loading Github flux data!');
    }
  }

  if (fs.existsSync(twitterPath)) {
    try {
      data.twitter = fs.readJSONSync(twitterPath);
    } catch (e) {
      console.error('Error while loading Twitter flux data!');
    }
  }

  return data;
}

Database.fromDisk = function (inputDir, options) {
  const store = {};

  models.forEach(model => {
    const modelData = fs.readJSONSync(path.join(inputDir, `${model}.json`));
    store[model] = modelData[model];
  });

  store.settings = fs.readJSONSync(
    path.join(inputDir, 'settings.json')
  ).settings;

  Object.assign(store, loadFluxFromDisk(inputDir));

  return new Database(store, options);
};

Database.fromLowDB = function (inputDir, lowdbs, options) {
  const store = {};

  models.forEach(model => {
    const lowdb = lowdbs[model];
    lowdb.read();
    store[model] = cloneDeep(lowdb.getState()[model]);
  });

  lowdbs.settings.read();
  store.settings = cloneDeep(lowdbs.settings.getState().settings);

  Object.assign(store, loadFluxFromDisk(inputDir));

  return new Database(store, options);
};

Database.FORWARD_LINKS = FORWARD_LINKS;
Database.BACKWARD_LINKS = BACKWARD_LINKS;
Database.SELF_LINKS = SELF_LINKS;

module.exports = Database;
