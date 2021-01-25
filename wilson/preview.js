/* eslint no-console: 0 */
require('./require-hook.js');

const path = require('path');
const debounce = require('lodash/debounce');
const sass = require('node-sass');
const chokidar = require('chokidar');
const Database = require('./database.js');
const Website = require('./website.js');
const EventEmitter = require('events').EventEmitter;
const objectHash = require('object-hash');
const {renderPage} = require('./render.js');

class Preview extends EventEmitter {
  constructor(inputDir, pathPrefix, lowdbs, options) {
    super();

    options = options || {};

    this.inputDir = inputDir;
    this.lowdbs = lowdbs;
    this.pathPrefix = pathPrefix;
    this.linkToAdmin = options.linkToAdmin || null;
    this.livereloadUrl = options.livereloadUrl || null;
    this.devMode = options.devMode || false;

    this.stylesheet = null;
    this.coverBuffers = {};
    this.coverCache = {};

    this.upgradeDatabase();
    this.watchDatabase();

    if (this.devMode) {
      this.watchSass();
      this.watchTemplates();
    }

    this.debouncedUpgradeDatabase = debounce(
      this.upgradeDatabase.bind(this),
      500
    );
  }

  testCoverCache(item) {
    const hash = objectHash(item.cover);

    if (item.id in this.coverCache) {
      const currentHash = this.coverCache[item.id];

      if (hash === currentHash) return true;
    }

    this.coverCache[item.id] = hash;
    return false;
  }

  watchDatabase() {
    chokidar
      .watch(path.join(this.inputDir, '*.json'), {awaitWriteFinish: true})
      .on('change', () => this.debouncedUpgradeDatabase());
  }

  watchSass() {
    console.log('wilson.preview: Watching SASS...');

    const compile = debounce(() => {
      console.log('wilson.preview: Compiling SASS...');

      this.compileAssets(err => {
        if (err) {
          console.error('wilson.preview: Error while compiling SASS:', err);
          return;
        }

        this.emit('sassCompiled');
      });
    }, 500);

    chokidar
      .watch(
        path.join(__dirname, '..', 'site', 'assets', 'scss', '**/*.scss'),
        {awaitWriteFinish: true, ignoreInitial: true}
      )
      .on('change', compile)
      .on('add', compile)
      .on('unlink', compile);
  }

  watchTemplates() {
    console.log('wilson.preview: Watching templates...');

    const sitePath = path.join(__dirname, '..', 'site');

    const reloadTemplate = debounce(() => {
      console.log('wilson.preview: Invalidating template cache');
      this.invalidateTemplateRequireCache();
      this.emit('templatesInvalidated');
    }, 500);

    chokidar
      .watch(
        [
          path.join(sitePath, 'components', '**/*.js'),
          path.join(sitePath, 'templates', '**/*.js')
        ],
        {awaitWriteFinish: true, ignoreInitial: true}
      )
      .on('change', reloadTemplate)
      .on('add', reloadTemplate)
      .on('unlink', reloadTemplate);
  }

  processCovers(callback) {
    return this.db.processCovers(
      this.inputDir,
      '',
      this.pathPrefix,
      {outputBuffers: true, skipRaster: true},
      (err, bufferIndex) => {
        if (err) return callback(err);

        Object.assign(this.coverBuffers, bufferIndex);

        this.db.forEach(item => {
          if (item.cover) this.testCoverCache(item);
        });

        return callback();
      }
    );
  }

  compileAssets(callback) {
    const stylesheetPath = path.join(
      __dirname,
      '..',
      'site',
      'assets',
      'scss',
      'global.scss'
    );

    return sass.render({file: stylesheetPath}, (err, result) => {
      if (err) return callback(err);

      this.stylesheet = result.css;

      return callback();
    });
  }

  invalidateTemplateRequireCache() {
    for (const k in require.cache) {
      if (k.includes('/site/components/') || k.includes('/site/templates/'))
        delete require.cache[k];
    }
  }

  upgradeDatabase() {
    const alreadyComputedCovers = {};

    for (const id in this.coverCache)
      alreadyComputedCovers[id] = this.db.get(id).coverImage;

    this.db = Database.fromLowDB(this.inputDir, this.lowdbs, {
      pathPrefix: this.pathPrefix
    });
    this.website = new Website(this.db);

    for (const id in alreadyComputedCovers)
      this.db.get(id).coverImage = alreadyComputedCovers[id];

    this.emit('upgraded');
  }

  getStylesheet() {
    return this.stylesheet;
  }

  getCoverBuffer(url) {
    return this.coverBuffers[url];
  }

  renderPageForPermalink(permalink, callback) {
    const result = this.website.get(permalink);

    if (!result) return callback(null, null);

    const {lang, page} = result;

    let itemsWithCover = [];

    if (page.itemsWithCover) itemsWithCover = page.itemsWithCover(page.data);

    itemsWithCover = itemsWithCover.filter(item => {
      return !this.testCoverCache(item);
    });

    const only = new Set(itemsWithCover.map(item => item.id));

    if (only.size)
      console.log('wilson.preview: Recomputing preview covers for', only);

    this.db.processCovers(
      this.inputDir,
      '',
      this.pathPrefix,
      {outputBuffers: true, only, skipRaster: true},
      (err, bufferIndex) => {
        if (err) return callback(err);

        const html = renderPage(
          this.pathPrefix,
          permalink,
          page.template,
          {
            permalinks: page.permalinks,
            linkToAdmin: this.linkToAdmin,
            lang,
            ...page.context
          },
          page.data,
          {
            livereloadUrl: this.livereloadUrl,
            scripts: page.scripts
          }
        );

        Object.assign(this.coverBuffers, bufferIndex);

        return callback(null, {html});
      }
    );
  }
}

module.exports = Preview;
