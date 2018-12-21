const aspire = require('../api/spire.js');

const argv = process.argv;

const inputDir = argv.length > 2 ? argv[2] : './dump';

aspire(inputDir);
