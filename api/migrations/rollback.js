const async = require('async');
const rimraf = require('rimraf');
const simpleGit = require('simple-git');
const load = require('../load.js');

const ROLLBACK_DUMP_PATH = 'rollback-dump';

module.exports = (inputDir, repo) => {
  return function (req, dbs, next) {
    return async.series(
      [
        // Cloning
        nextStep => {
          return simpleGit(process.cwd()).clone(
            repo,
            ROLLBACK_DUMP_PATH,
            {'--depth': '1'},
            nextStep
          );
        },

        // Loading
        nextStep => {
          return load(ROLLBACK_DUMP_PATH, inputDir, nextStep);
        },

        // Refresh & Cleanup
        nextStep => {
          for (const model in dbs) dbs[model].read();

          return rimraf(ROLLBACK_DUMP_PATH, nextStep);
        }
      ],
      next
    );
  };
};
