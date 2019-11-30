require('./require-hook.js');

const path = require('path');
const sass = require('node-sass');
const Database = require('./database.js');
const Website = require('./website.js');
const {renderPage} = require('./render.js');

class Preview {
  constructor(inputDir, pathPrefix, lowdbs, options) {
    options = options || {};

    this.inputDir = inputDir;
    this.lowdbs = lowdbs;
    this.pathPrefix = pathPrefix;
    this.linkToAdmin = options.linkToAdmin || null;
    this.upgradeDatabase();

    this.processedImagesCache = {};
    this.stylesheet = null;
  }

  compileAssets(callback) {
    const stylesheetPath = path.join(__dirname, '..', 'site', 'assets', 'scss', 'global.scss');

    return sass.render({file: stylesheetPath}, (err, result) => {
      if (err)
        return callback(err);

      this.stylesheet = result.css.toString();

      return callback();
    });
  }

  upgradeDatabase() {
    this.db = Database.fromLowDB(
      this.inputDir,
      this.lowdbs,
      {pathPrefix: this.pathPrefix}
    );
    this.website = new Website(this.db);
  }

  getStylesheet() {
    return this.stylesheet;
  }

  renderPageForPermalink(permalink) {
    const result = this.website.get(permalink);

    if (!result)
      return null;

    const {lang, page} = result;

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
      {scripts: page.scripts}
    );

    return {html};
  }
}

module.exports = Preview;
