const spire = require('../api/spire.js');

const argv = process.argv;

const inputDir = argv.length > 2 ? argv[2] : './data';

spire.aSPIRE(inputDir, (err, r) => {
    console.log(r);
});
