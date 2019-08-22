const rimraf = require('rimraf');
const simpleGit = require('simple-git');
const load = require('../load.js');

const ROLLBACK_DUMP_PATH = 'rollback-dump';

module.exports = repo => {
  return function(req, dbs, next) {

    // Cloning data
    return simpleGit(process.cwd())
      .clone(repo, ROLLBACK_DUMP_PATH, {'--depth': 1}, cloneError => {
        if (cloneError)
          return next(cloneError);

        // Loading data
        load(ROLLBACK_DUMP_PATH);

        // Refreshing cache
        for (model in dbs)
          dbs[model].read();

        // Cleanup
        return rimraf(ROLLBACK_DUMP_PATH, next);
      });
  };
};
