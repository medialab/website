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
function createI18nPage(item) {
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
      linkToAdmin: NODE_ENV !== 'production'
    },

    // Page data
    item,

    // Options
    {pretty: true}
  );

  return versions;
}

// Main functions
exports.build = function build(inputDir, outputDir, pathPrefix='') {
  const db = new Database(inputDir, pathPrefix);

  // Cleanup & scaffolding
  rimraf.sync(outputDir);
  fs.ensureDirSync(outputDir);

  db.forEach(item => {
    const versions = createI18nPage(item);

    const diskPaths = {
      fr: permalinkToDiskPath(outputDir, item.permalink.fr),
      en: permalinkToDiskPath(outputDir, item.permalink.en)
    };

    fs.ensureDirSync(diskPaths.fr);
    fs.ensureDirSync(diskPaths.en);

    fs.writeFileSync(path.join(diskPaths.fr, 'index.html'), versions.fr);
    fs.writeFileSync(path.join(diskPaths.en, 'index.html'), versions.en);
  });
}

exports.build('./data', './wbuild');

// console.log(DATABASE.get('03c4c794-8063-441b-afae-0a833e1548a9'))

// const guillaume = require('../data/people.json').people.find(p => p.lastName === 'Plique');

// createI18nPage(createPage, {
//   path: `/news/${slug}`,
//   frenchPath: `/actu/${slug}`,
//   component: path.resolve('./src/templates/news.js'),
//   context
// });

// const result = renderPage(
//   TEMPLATES.peopleDetail,
//   {lang: 'fr', permalinks: {fr: '', en: ''}, linkToAdmin: false},
//   {person: DATABASE.get('03c4c794-8063-441b-afae-0a833e1548a9')},
//   {pretty: true}
// );
