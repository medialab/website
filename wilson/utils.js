const path = require('path');

const PUNCTUATION = /\s*([?!])/g;

exports.frenchTypographyReplace = string => {
  return string.replace(PUNCTUATION, '\xa0$1');
};

exports.permalinkToDiskPath = function (outputDir, permalink) {
  const splitted = permalink.slice(1).split('/');

  return path.join.apply(null, [outputDir].concat(splitted));
};
