require('./require-hook.js');

const Database = require('./database.js');
const Website = require('./website.js');
const {renderPage} = require('./render.js');

class Preview {
  constructor(inputDir, pathPrefix, options) {
    options = options || {};

    this.inputDir = inputDir;
    this.pathPrefix = pathPrefix;
    this.linkToAdmin = options.linkToAdmin || null;
    this.upgradeDatabase();
  }

  upgradeDatabase() {
    this.db = new Database(this.inputDir);
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

// TODO: Database.from lowdb or from file
if (require.main === module) {
  const preview = new Preview('./data');

  console.log(preview.renderPageForPermalink('/equipe/guillaume-plique'));
}
