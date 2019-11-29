const {build} = require('../wilson');

console.log('Building website...');
console.time('build');

build('./data', './wbuild', {skipDrafts: true}, err => {
  if (err) {
    console.error('An error occurred!');
    console.error(err);
    process.exit(1);
  }

  console.timeEnd('build');
  console.log('Build done!');
});
