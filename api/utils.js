const deburr = require('lodash/deburr');

exports.cleanAssetName = function (filename) {
  return deburr(filename).replace(/\s/g, '_').replace(/['’]/g, '');
};

const REF_TAG_CLEANUP = /<\/?(?:strong|em|[bi])\\?>/g;

exports.cleanReference = function (ref) {
  return ref.replace(REF_TAG_CLEANUP, '').trim();
};
