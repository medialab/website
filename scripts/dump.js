const dump = require('../api/dump.js');

const argv = process.argv;

const outputDir = argv.length > 2 ? argv[2] : './dump';

dump(outputDir);
