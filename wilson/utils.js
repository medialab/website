const path = require('path');

const PUNCTUATION = /\s*([?!])/g;

exports.frenchTypographyReplace = string => {
  return string.replace(PUNCTUATION, '\xa0$1');
};

exports.permalinkToDiskPath = function(outputDir, permalink) {
  const splitted = permalink.slice(1).split('/');

  return path.join.apply(null, [outputDir].concat(splitted));
};

exports.collectItemsWithCover = function(data, maxDepth = 1) {
  const ids = new Set();
  const done = new Set();

  function recurse(item, depth = 0) {
    if (depth > maxDepth)
      return;

    if (Array.isArray(item))
      return item.forEach(i => recurse(i, item.model ? depth + 1 : depth));

    if (typeof item !== 'object')
      return;

    if (item.id) {
      if (done.has(item.id))
        return;

      done.add(item.id);

      if (item.cover && !ids.has(item.id))
        ids.add(item.id);
    }

    for (const k in item) {
      if (k === 'cover')
        continue;

      recurse(item[k], item.model ? depth + 1 : depth);
    }
  }

  recurse(data);

  return ids;
};
