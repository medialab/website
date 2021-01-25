const {findUnusedAssets} = require('../cleanup.js');
const path = require('path');
const fs = require('fs');

module.exports = assetsPath => {
  return function (req, dbs, next) {
    const dryRun = req && req.query && 'dryrun' in req.query;

    const unused = findUnusedAssets(dbs, assetsPath);

    if (!dryRun) {
      unused.forEach(asset => {
        fs.unlinkSync(path.join(assetsPath, asset));
      });
    }

    return next(null, {unused: Array.from(unused)});
  };
};
