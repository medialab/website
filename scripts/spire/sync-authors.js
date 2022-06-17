const {syncSpireAuthors} = require('../../api/spire/sync.js');
const fs = require('fs-extra');
const path = require('path');

const argv = process.argv;

const inputDir = argv.length > 2 ? argv[2] : './dump';

syncSpireAuthors(peopleSpire => {
  fs.writeJsonSync(path.join(inputDir, 'peopleSpire.json'), peopleSpire, {
    spaces: 2,
    encoding: 'utf-8'
  });
});
