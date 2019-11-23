const NODE_ENV = process.env.NODE_ENV;

// Babel require hook to transpile React/ES6 imports from static site templates
require('@babel/register')({
  cache: NODE_ENV === 'production' ? false : true,
  only: [
    /site\/src/,
    /wilson\/render\.js/
  ],
  presets: ['@babel/preset-env', '@babel/preset-react']
});

// Dependencies
const path = require('path');
const rimraf = require('rimraf');
const fs = require('fs-extra');
const {renderPage} = require('./render.js');
const models = require('../specs/models.json');
const Database = require('./database.js');
const {permalinkToDiskPath} = require('./utils.js');

// Constants
const TEMPLATES = {
  activitiesDetail: 'activity',
  newsDetail: 'news',
  peopleListing: 'people-list',
  peopleDetail: 'people',
  productionsDetail: 'production'
};

for (const k in TEMPLATES)
  TEMPLATES[k] = require.resolve(`../site/src/templates/${TEMPLATES[k]}.js`);

const MODEL_TO_TEMPLATE = {};

models.forEach(model => (MODEL_TO_TEMPLATE[model] = TEMPLATES[`${model}Detail`]));

// Helpers
function createModelI18nPage(item) {
  const model = item.model;

  const template = MODEL_TO_TEMPLATE[model];

  const versions = {};

  // French page
  versions.fr = renderPage(
    template,

    // Page context
    {
      lang: 'fr',
      permalinks: item.permalink,
      linkToAdmin: NODE_ENV !== 'production' ? '' : '' // TODO: fix this!
    },

    // Page data
    item,

    // Options
    {pretty: true}
  );

  return versions;
}

// Main functions
exports.build = function build(inputDir, outputDir, options, callback) {
  options = options || {};
  const pathPrefix = options.pathPrefix || '';

  const db = new Database(inputDir, pathPrefix);

  // Cleanup & scaffolding
  rimraf.sync(outputDir);
  fs.ensureDirSync(outputDir);

  db.forEach(item => {
    const versions = createModelI18nPage(item);

    const diskPaths = {
      fr: permalinkToDiskPath(outputDir, item.permalink.fr),
      en: permalinkToDiskPath(outputDir, item.permalink.en)
    };

    fs.ensureDirSync(diskPaths.fr);
    fs.ensureDirSync(diskPaths.en);

    fs.writeFileSync(path.join(diskPaths.fr, 'index.html'), versions.fr);
    fs.writeFileSync(path.join(diskPaths.en, 'index.html'), versions.en);
  });

  process.nextTick(callback);
}

console.time('build');
exports.build('./data', './wbuild', {}, () => console.timeEnd('build'));
