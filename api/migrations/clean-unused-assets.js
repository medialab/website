const {findUnusedAssets} = require('../cleanup.js');

module.exports = assetsPath => {
  return function(req, dbs, next) {

    const unused = findUnusedAssets(dbs, assetsPath);

    return next(null, {unused});
  };
}
