const config = require('config'),
      path = require('path'),
      fs = require('fs-extra');

const argv = process.argv;

const DATA_PATH = config.get('data'),
      DUMP_PATH = argv.length > 2 ? argv[2] : './dump';

const models = require('../specs/models.json');

fs.ensureDirSync(config.get('data'));

fs.copySync(path.join(DUMP_PATH, 'settings.json'), path.join(DATA_PATH, 'settings.json'));
fs.copySync(path.join(DUMP_PATH, 'assets'), path.join(DATA_PATH, 'assets'));

models.forEach(model => {
  const p = path.join(DUMP_PATH, model);

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
