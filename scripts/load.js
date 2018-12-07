const load = require('../api/load.js');

const argv = process.argv;

const inputDir = argv.length > 2 ? argv[2] : './dump';

load(inputDir);
