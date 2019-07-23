const path = require('path');
const config = require('config-secrets');
const fs = require('fs-extra');
const utils = require('../utils.js');

const DATA_PATH = config.get('data');
const ASSETS_PATH = path.join(DATA_PATH, 'assets');

module.exports = function(req, dbs, next) {

  const assets = fs.readdirSync(ASSETS_PATH);
  const changed = [];

  assets.forEach(filename => {
    const cleaned = utils.cleanAssetName(filename);

    if (cleaned === filename)
      return;

    changed.push([filename, cleaned]);
    fs.moveSync(path.join(ASSETS_PATH, filename), path.join(ASSETS_PATH, cleaned));
  });

  [
    'activities',
    'news',
    'people',
    'productions'
  ].forEach(plural => {
    dbs[plural].read();

    const state = dbs[plural].getState();

    let string = JSON.stringify(state);

    changed.forEach(([filename, cleaned]) => {
      string = string.replace(filename, cleaned);
    });

    dbs[plural].setState(JSON.parse(string));
  });

  dbs.activities.write();
  dbs.news.write();
  dbs.people.write();
  dbs.productions.write();

  return next(null, {success: true, changed});
};
