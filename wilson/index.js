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
const async = require('async');
const path = require('path');
const sass = require('node-sass');
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
function writePermalinkToDisk(outputDir, html, permalink) {
  const diskPath = permalinkToDiskPath(outputDir, permalink);

  fs.ensureDirSync(diskPath);
  fs.writeFileSync(path.join(diskPath, 'index.html'), html);
}

function writeI18nPermalinkToDisk(outputDir, versions, permalinks) {
  writePermalinkToDisk(outputDir, versions.fr, permalinks.fr);
  writePermalinkToDisk(outputDir, versions.en, permalinks.en);
}

const FONT_PATH = path.join(__dirname, '..', 'site', 'src', 'assets', 'font');
const BEL2_FONT_PATH = path.join(FONT_PATH, 'Bel2');
const SYMBOL_FONT_PATH = path.join(FONT_PATH, 'Symbol');

// TODO: compress, sourceMap false
function buildSass(outputDir, callback) {

  const fontDir = path.join(outputDir, 'font');
  fs.ensureDirSync(fontDir);

  fs.copySync(BEL2_FONT_PATH, path.join(fontDir, 'bel2'));
  fs.copySync(SYMBOL_FONT_PATH, path.join(fontDir, 'symbol'));

  return sass.render({
    file: path.join(__dirname, '..', 'site', 'src', 'assets', 'scss', 'global.scss')
  }, (err, result) => {
    if (err)
      return callback(err);

    fs.writeFileSync(path.join(outputDir, 'medialab.css'), result.css);

    return callback();
  });
}

function buildAssets(inputDir, outputDir, callback) {
  fs.copy(
    path.join(inputDir, 'assets'),
    path.join(outputDir, 'static'),
    callback
  );
}

function renderModelI18nPage(item) {
  const model = item.model;

  const template = MODEL_TO_TEMPLATE[model];

  const versions = {};

  // French page
  versions.fr = renderPage(
    item.permalink.fr,
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
    {pretty: false}
  );

  // English page
  versions.en = renderPage(
    item.permalink.en,
    template,

    // Page context
    {
      lang: 'en',
      permalinks: item.permalink,
      linkToAdmin: NODE_ENV !== 'production' ? '' : '' // TODO: fix this!
    },

    // Page data
    item,

    // Options
    {pretty: false}
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

  async.series({
    assets(next) {
      return buildAssets(inputDir, outputDir, next);
    },

    covers(next) {
      return db.processCovers(inputDir, outputDir, pathPrefix, next);
    },

    sass(next) {
      return buildSass(outputDir, next);
    },

    build(next) {
      db.forEach(item => {
        const versions = renderModelI18nPage(item);

        writeI18nPermalinkToDisk(outputDir, versions, item.permalink);
      });

      process.nextTick(next);
    }
  }, callback);
}

console.time('build');
exports.build('./data', './wbuild', {}, () => console.timeEnd('build'));
