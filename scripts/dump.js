const stableJson = require('json-stable-stringify'),
      config = require('config'),
      path = require('path'),
      fs = require('fs-extra');

const models = require('../specs/models.json');

fs.ensureDirSync('./dump');

fs.copySync(path.join(config.get('data'), 'assets'), path.join('./dump', 'assets'));

models.forEach(model => {
  const p = path.join('./dump', `${model}.json`);

  fs.ensureDirSync(path.join('./dump', model));

  const raw = fs.readFileSync(path.join(config.get('data'), `${model}.json`), 'utf-8');

  const data = JSON.parse(raw);

  const list = data[model];

  if (!list)
    return;

  list.forEach(item => {
    fs.writeFileSync(
      path.join('./dump', model, `${item.id}.json`),
      stableJson(item, {space: 2})
    );
  });
});
