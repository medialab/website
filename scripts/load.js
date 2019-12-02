const load = require('../api/load.js');

const argv = process.argv;

const inputDir = argv.length > 2 ? argv[2] : './dump';

load(inputDir, null, err => {
  if (err) {
    console.error('Error', err);
    process.exit(1);
  }

  console.log('Loaded!');
});
