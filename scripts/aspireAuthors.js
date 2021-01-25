const spire = require('../api/spire.js'),
  fs = require('fs-extra'),
  path = require('path');

const argv = process.argv;

const inputDir = argv.length > 2 ? argv[2] : './dump';

spire.aspireAuthors(peopleSpire => {
  fs.writeJsonSync(path.join(inputDir, 'peopleSpire.json'), peopleSpire, {
    spaces: 2,
    encoding: 'utf-8'
  });
});
