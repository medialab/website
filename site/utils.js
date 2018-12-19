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

  // Default page
  createPage({
    ...page,
    context: {
      ...page.context,
      lang: 'fr'
    }
  });

  // French page
  createPage({
    ...page,
    path: '/fr' + page.path,
    context: {
      ...page.context,
      lang: 'fr'
    }
  });

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
