/* eslint no-console: 0 */
const config = require('config-secrets'),
      path = require('path'),
      fs = require('fs-extra'),
      Ajv = require('ajv');

const DATA_PATH = config.get('data');

const models = require('../specs/models.json');

const VALIDATORS = {};

models.forEach(model => {
  const ajv = new Ajv();
  VALIDATORS[model] = ajv.compile(require(`../specs/schemas/${model}.json`));
});

// TODO: make async
module.exports = function load(inputDir, outputDir) {
  if (!outputDir)
    outputDir = DATA_PATH;

  fs.ensureDirSync(config.get('data'));

  fs.copySync(path.join(inputDir, 'settings.json'), path.join(outputDir, 'settings.json'));
  fs.removeSync(path.join(outputDir, 'assets'));
  fs.ensureDirSync(path.join(outputDir, 'assets'));
  fs.copySync(path.join(inputDir, 'assets'), path.join(outputDir, 'assets'));

  models.forEach(model => {
    const p = path.join(inputDir, model);

    const items = [];

    fs.readdirSync(p).forEach(f => {
      const item = JSON.parse(fs.readFileSync(path.join(p, f), 'utf-8'));

      if (!VALIDATORS[model](item)) {
        console.error(model, item.id, VALIDATORS[model].errors);
        throw new Error('Failed item validation!');
      }

      items.push(item);
    });

    fs.writeFileSync(
      path.join(outputDir, `${model}.json`),
      JSON.stringify({
        [model]: items
      }, null, 2)
    );
  });
};
