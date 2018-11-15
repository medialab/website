const stableJson = require('json-stable-stringify'),
      config = require('config'),
      path = require('path'),
      fs = require('fs-extra');

const DATA_PATH = config.get('data'),
      DUMP_PATH = './dump';

const models = require('../specs/models.json');

fs.ensureDirSync(DUMP_PATH);

fs.copySync(path.join(DATA_PATH, 'assets'), path.join(DUMP_PATH, 'assets'));

const settings = fs.readJsonSync(path.join(DATA_PATH, 'settings.json'));
fs.writeFileSync(
  path.join(DUMP_PATH, 'settings.json'),
  stableJson(settings, {space: 2})
);

models.forEach(model => {
  fs.ensureDirSync(path.join(DUMP_PATH, model));

  const data = fs.readJsonSync(path.join(DATA_PATH, `${model}.json`), 'utf-8');

  const list = data[model];

  if (!list)
    return;

  list.forEach(item => {
    fs.writeFileSync(
      path.join(DUMP_PATH, model, `${item.id}.json`),
      stableJson(item, {space: 2})
    );
  });
});
