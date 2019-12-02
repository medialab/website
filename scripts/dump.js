const config = require('config-secrets');
const dump = require('../api/dump.js');

const argv = process.argv;

const outputDir = argv.length > 2 ? argv[2] : './dump';

dump(config.get('data'), outputDir, err => {
  if (err) {
    console.error('Error', err);
    process.exit(1);
  }

  console.log('Dumped!');
});
