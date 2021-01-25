const async = require('async'),
  stableJson = require('json-stable-stringify'),
  path = require('path'),
  fs = require('fs-extra');

const apply = async.apply;

const models = require('../specs/models.json');

module.exports = function dump(inputDir, outputDir, callback) {
  function dumpModel(model, next) {
    return async.series(
      [
        apply(fs.remove, path.join(outputDir, model)),
        apply(fs.ensureDir, path.join(outputDir, model)),
        nextStep => {
          return fs.readJSON(
            path.join(inputDir, `${model}.json`),
            (err, data) => {
              if (err) return nextStep(err);

              const list = data[model];

              if (!list) return nextStep();

              return async.eachLimit(
                list,
                10,
                (item, nextItem) => {
                  return fs.writeFile(
                    path.join(outputDir, model, `${item.id}.json`),
                    stableJson(item, {space: 2}),
                    nextItem
                  );
                },
                nextStep
              );
            }
          );
        }
      ],
      next
    );
  }

  return async.series(
    [
      // Scaffolding
      apply(fs.ensureDir, outputDir),
      apply(
        fs.copy,
        path.join(inputDir, 'assets'),
        path.join(outputDir, 'assets')
      ),

      // Settings
      next => {
        return fs.readJSON(
          path.join(inputDir, 'settings.json'),
          (err, settings) => {
            if (err) return next(err);

            return fs.writeFile(
              path.join(outputDir, 'settings.json'),
              stableJson(settings, {space: 2}),
              next
            );
          }
        );
      },

      // Dump items
      next => {
        return async.each(models, dumpModel, next);
      }
    ],
    callback
  );
};
