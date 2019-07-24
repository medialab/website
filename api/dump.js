const stableJson = require('json-stable-stringify'),
      config = require('config-secrets'),
      path = require('path'),
      fs = require('fs-extra');

const DATA_PATH = config.get('data');

const models = require('../specs/models.json');

// TODO: make async
module.exports = function dump(outputDir) {
  fs.ensureDirSync(outputDir);

  fs.copySync(path.join(DATA_PATH, 'assets'), path.join(outputDir, 'assets'));

  const settings = fs.readJsonSync(path.join(DATA_PATH, 'settings.json'));

  fs.writeFileSync(
    path.join(outputDir, 'settings.json'),
    stableJson(settings, {space: 2})
  );

  models.forEach(model => {
    fs.removeSync(path.join(outputDir, model));
    fs.ensureDirSync(path.join(outputDir, model));

    const data = fs.readJsonSync(path.join(DATA_PATH, `${model}.json`), 'utf-8');

    const list = data[model];

    if (!list)
      return;

    list.forEach(item => {
      fs.writeFileSync(
        path.join(outputDir, model, `${item.id}.json`),
        stableJson(item, {space: 2})
      );
    });
  });

};
