const deburr = require('lodash/deburr');

exports.cleanAssetName = function(filename) {
  return deburr(filename)
    .replace(/\s/g, '_')
    .replace(/['’]/g, '');
};
