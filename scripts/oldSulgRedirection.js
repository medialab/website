const oldSlugRedirections = require('../api/oldSlugRedirections.js');
const fs = require('fs');

const argv = process.argv;

const outputFile = argv.length > 2 ? argv[2] : 'redirections.nginx';

oldSlugRedirections((err, redirections) => {
  fs.writeFileSync(outputFile, redirections);
});
