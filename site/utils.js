const crypto = require('crypto');

// Helper hashing a node's data
exports.hashNode = function hashNode(data) {

  return crypto
    .createHash('md5')
    .update(JSON.stringify(data))
    .digest('hex');
};

// Helper creating an internationalized page
exports.createI18nPage = function createI18nPage(createPage, page) {

  const englishPath = '/en' + page.path;

  // TODO: `current` & `translated` might not be useful

  // Default page, same as French
  createPage({
    ...page,
    context: {
      ...page.context,
      lang: 'fr',
      permalinks: {
        current: page.path,
        translated: englishPath,
        en: englishPath,
        fr: page.path
      }
    }
  });

  // French page
  // NOTE: if required, we can probably do so using a redirection scheme
  // I dropped it for the time being to make builds faster

  // English page
  createPage({
    ...page,
    path: englishPath,
    context: {
      ...page.context,
      lang: 'en',
      permalinks: {
        current: englishPath,
        translated: page.path,
        en: englishPath,
        fr: page.path
      }
    }
  });
};
