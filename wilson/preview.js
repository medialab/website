require('./require-hook.js');

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
  }

  upgradeDatabase() {
    this.db = Database.fromLowDB(
      this.inputDir,
      this.lowdbs,
      {pathPrefix: this.pathPrefix}
    );
    this.website = new Website(this.db);
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
