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
const config = require('config-secrets');
const shuffle = require('pandemonium/shuffle');
const path = require('path');
const sass = require('node-sass');
const rimraf = require('rimraf');
const fs = require('fs-extra');
const {renderPage} = require('./render.js');
const models = require('../specs/models.json');
const Database = require('./database.js');
const {permalinkToDiskPath} = require('./utils.js');
const enums = require('../specs/enums.json');
const {facetedEnums} = require('./facets.js');
const createSitemapFromPages = require('./sitemap.js');

const PERMALINKS = require('./permalinks.js');
const META = require('./meta.js');

// Constants
const TEMPLATES = {

  // Pages
  home: 'index',
  about: 'about',
  legal: 'legal',
  error: '404',

  // Models
  activitiesDetail: 'activity',
  activitiesListing: 'activity-list',
  newsDetail: 'news',
  newsListing: 'news-list',
  peopleListing: 'people-list',
  peopleDetail: 'people',
  productionsDetail: 'production',
  productionsListing: 'production-list'
};

for (const k in TEMPLATES)
  TEMPLATES[k] = require.resolve(`../site/src/templates/${TEMPLATES[k]}.js`);

const MODEL_TO_DETAIL_TEMPLATE = {};

models.forEach(model => (MODEL_TO_DETAIL_TEMPLATE[model] = TEMPLATES[`${model}Detail`]));

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

const IMG = [
  'people-placeholder.png',
  'cover-twitter.png',
  'cover-fb.png'
];

function copyAssets(inputDir, outputDir, callback) {
  async.parallel({
    assets(next) {
      return fs.copy(
        path.join(inputDir, 'assets'),
        path.join(outputDir, 'static'),
        next
      );
    },

    img(next) {
      const imgDir = path.join(outputDir, 'img');

      fs.ensureDirSync(imgDir);

      return async.each(IMG, (img, n) => {
        fs.copyFile(
          path.join(__dirname, '..', 'site', 'src', 'assets', 'images', img),
          path.join(imgDir, img),
          n
        );
      }, next);
    },

    js(next) {
      const jsDir = path.join(outputDir, 'js');

      fs.ensureDirSync(jsDir);

      return fs.copy(
        path.join(__dirname, '..', 'site', 'src', 'assets', 'js'),
        jsDir,
        next
      );
    }
  }, callback);
}

function buildSitemap(outputDir, siteUrl, pathPrefix, pages) {
  const sitemap = createSitemapFromPages(siteUrl, pathPrefix, pages);
  fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemap);
}

function build404Page(outputDir, pathPrefix) {
  const html = renderPage(
    pathPrefix,
    '/',
    TEMPLATES.error
  );

  fs.writeFileSync(path.join(outputDir, '404.html'), html);
}

// Main functions
function buildI18nPage(outputDir, pathPrefix, {permalinks, template, context, data, scripts}) {
  context = context || {};

  const versions = {};

  const commonContext = {
    permalinks,
    linkToAdmin: NODE_ENV !== 'production' ? '' : '', // TODO: fix this!
    ...context
  };

  const commonOptions = {
    googleAnalyticsId: config.get('googleAnalyticsId')
  };

  versions.fr = renderPage(
    pathPrefix,
    permalinks.fr,
    template,
    {
      ...commonContext,
      lang: 'fr'
    },
    data,
    {...commonOptions, scripts}
  );

  versions.en = renderPage(
    pathPrefix,
    permalinks.en,
    template,
    {
      ...commonContext,
      lang: 'en'
    },
    data,
    {...commonOptions, scripts}
  );

  writeI18nPermalinkToDisk(outputDir, versions, permalinks);
}

exports.build = function build(inputDir, outputDir, options, callback) {
  options = options || {};
  const pathPrefix = options.pathPrefix || '';
  const skipDrafts = options.skipDrafts || false;

  const db = new Database(inputDir, {pathPrefix, skipDrafts});

  // Cleanup & scaffolding
  rimraf.sync(outputDir);
  fs.ensureDirSync(outputDir);

  async.series({
    assets(next) {
      return copyAssets(inputDir, outputDir, next);
    },

    covers(next) {
      return db.processCovers(inputDir, outputDir, pathPrefix, next);
    },

    sass(next) {
      return buildSass(outputDir, next);
    },

    build(next) {

      console.time('buildPages');
      const pagesToRender = [];

      const settings = db.getSettings();

      // Static error page
      build404Page(outputDir, pathPrefix);

      // Home page
      pagesToRender.push({
        permalinks: PERMALINKS.home,
        template: TEMPLATES.home,
        data: {
          grid: settings.home.grid,
          slider: settings.home.slider,
          twitter: db.getTwitter(),
          github: db.getGithub(),
          rdv: db.getRdv()
        }
      });

      // Basic pages
      pagesToRender.push({
        permalinks: PERMALINKS.about,
        template: TEMPLATES.about
      });

      pagesToRender.push({
        permalinks: PERMALINKS.legal,
        template: TEMPLATES.legal
      });

      // Detail pages
      db.forEach(item => {
        pagesToRender.push({
          permalinks: item.permalink,
          template: MODEL_TO_DETAIL_TEMPLATE[item.model],
          data: item,
          scripts: item.model === 'people' ? ['people'] : null
        });
      });

      // Listing pages
      pagesToRender.push({
        permalinks: PERMALINKS.activities,
        template: TEMPLATES.activitiesListing,
        data: {
          activities: db.getModel('activities'),
          topActivities: settings.topActivities.map(o => o.id)
        },
        scripts: ['search', 'activity-listing']
      });

      pagesToRender.push({
        permalinks: PERMALINKS.news,
        template: TEMPLATES.newsListing,
        data: {
          news: db.getModel('news')
        },
        scripts: ['search', 'news-listing']
      });

      pagesToRender.push({
        permalinks: PERMALINKS.productions,
        template: TEMPLATES.productionsListing,
        context: {
          group: 'all'
        },
        data: {
          facetedEnums,
          productions: db.getModel('productions')
        },
        scripts: ['search', 'production-listing']
      });

      for (const group in enums.productionTypes.groups)
        pagesToRender.push({
          permalinks: {
            fr: PERMALINKS.productions.fr + '/' + group,
            en: PERMALINKS.productions.en + '/' + group
          },
          template: TEMPLATES.productionsListing,
          context: {
            group
          },
          data: {
            facetedEnums,
            productions: db.getModel('productions')
              .filter(p => p.group === group)
          },
          scripts: ['search', 'production-listing']
        });

      pagesToRender.push({
        permalinks: PERMALINKS.people,
        template: TEMPLATES.peopleListing,
        data: {
          people: shuffle(db.getModel('people'))
        },
        scripts: ['search']
      });

      // Building pages
      // TODO: async much?
      pagesToRender.forEach(page => {
        buildI18nPage(outputDir, pathPrefix, page);
      });

      // Sitemap
      buildSitemap(outputDir, META.siteUrl, pathPrefix, pagesToRender);

      process.nextTick(next);
    }
  }, callback);
}

console.time('build');
exports.build('./data', './wbuild', {skipDrafts: true}, err => {
  console.log(err);
  console.timeEnd('build');
  console.timeEnd('buildPages');
});
