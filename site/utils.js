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

  // Default page, same as French
  createPage({
    ...page,
    context: {
      ...page.context,
      lang: 'fr'
    }
  });

  // French page
  // NOTE: if required, we can probably do so using a redirection scheme
  // I dropped it for the time being to make builds faster
  // createPage({
  //   ...page,
  //   path: '/fr' + page.path,
  //   context: {
  //     ...page.context,
  //     lang: 'fr'
  //   }
  // });

  // English page
  createPage({
    ...page,
    path: '/en' + page.path,
    context: {
      ...page.context,
      lang: 'en'
    }
  });
};
