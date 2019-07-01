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

// ellipse function
exports.ellipse = (text, maxSize = 175) => {
  if (text.length > maxSize) {
    let cutIndex = text.slice(0, maxSize).lastIndexOf(' ');
    cutIndex = cutIndex === -1 ? maxSize : cutIndex;
    return text.slice(0, cutIndex) + '…';
  }
  return text;
};

const PUNCTUATION = /\s+([?!])/g;

exports.frenchTypographyReplace = string => {
  return string.replace(PUNCTUATION, '\xa0$1');
};
