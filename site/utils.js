const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

// Helper importing a GraphQL schema
exports.importGraphQLSchema = function(name) {
  const p = path.join(__dirname, 'schemas', `${name}.gql`);

  return fs.readFileSync(p, 'utf-8');
};

// Helper hashing a node's data
exports.hashNode = function hashNode(data) {

  return crypto
    .createHash('md5')
    .update(JSON.stringify(data))
    .digest('hex');
};

// Helper creating an internationalized page
exports.createI18nPage = function createI18nPage(createPage, page) {

  const englishPath = '/en' + (page.path === '/' ? ':' : page.path),
        frenchPath = page.frenchPath || page.path;

  // Default page, same as French
  createPage({
    ...page,
    path: frenchPath,
    context: {
      ...page.context,
      lang: 'fr',
      permalinks: {
        en: englishPath,
        fr: frenchPath
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
        en: englishPath,
        fr: frenchPath
      }
    }
  });
};

const PUNCTUATION = /\s*([?!])/g;

exports.frenchTypographyReplace = string => {
  return string.replace(PUNCTUATION, '\xa0$1');
};
