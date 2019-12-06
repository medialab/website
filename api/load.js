/* eslint no-console: 0 */
const async = require('async'),
      path = require('path'),
      fs = require('fs-extra'),
      Ajv = require('ajv');

const apply = async.apply;

const models = require('../specs/models.json');

const VALIDATORS = {};

models.forEach(model => {
  const ajv = new Ajv();
  VALIDATORS[model] = ajv.compile(require(`../specs/schemas/${model}.json`));
});

module.exports = function load(inputDir, outputDir, callback) {

  function collectModel(model, p, next) {
    const items = [];

    return fs.readdir(p, (dirErr, files) => {
      if (dirErr)
        return next(dirErr);

      return async.eachLimit(files, 10, (f, nextFile) => {

        return fs.readJSON(path.join(p, f), (jsonErr, item) => {
          if (jsonErr)
            return nextFile(jsonErr);

          if (!VALIDATORS[model](item)) {
            console.error(model, item.id, VALIDATORS[model].errors);
            throw new Error('Failed item validation!');
          }

          items.push(item);

          return nextFile();
        });
      }, err => {
        if (err)
          return next(err);

        return next(null, items);
      });
    });
  }

  async.series([

    // Scaffolding
    apply(fs.ensureDir, outputDir),
    apply(fs.copy, path.join(inputDir, 'settings.json'), path.join(outputDir, 'settings.json')),
    apply(fs.remove, path.join(outputDir, 'assets')),
    apply(fs.ensureDir, path.join(outputDir, 'assets')),
    apply(fs.copy, path.join(inputDir, 'assets'), path.join(outputDir, 'assets')),

    // Collecting
    next => {
      return async.each(models, (model, nextModel) => {
        return collectModel(model, path.join(inputDir, model), (err, items) => {
          if (err)
            return nextModel(err);

          return fs.writeJSON(
            path.join(outputDir, `${model}.json`),
            {
              [model]: items
            },
            {
              spaces: 2
            },
            nextModel
          );
        });
      }, next);
    }
  ], callback);
};
