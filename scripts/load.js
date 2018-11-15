const config = require('config'),
      path = require('path'),
      fs = require('fs-extra');

const DATA_PATH = config.get('data');

const models = require('../specs/models.json');

fs.ensureDirSync(config.get('data'));

fs.copySync(path.join('./dump', 'assets'), path.join(DATA_PATH, 'assets'));

models.forEach(model => {
  const p = path.join('./dump', model);

  const items = [];

  fs.readdirSync(p).forEach(f => {
    items.push(JSON.parse(fs.readFileSync(path.join(p, f), 'utf-8')));
  });

  fs.writeFileSync(
    path.join(DATA_PATH, `${model}.json`),
    JSON.stringify({
      [model]: items
    }, null, 2)
  );
});
