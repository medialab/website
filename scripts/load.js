const config = require('config-secrets');
const load = require('../api/load.js');

const argv = process.argv;

const inputDir = argv.length > 2 ? argv[2] : './dump';

load(inputDir, config.get('data'), err => {
  if (err) {
    console.error('Error', err);
    process.exit(1);
  }

  console.log('Loaded!');
});
