const {build} = require('../wilson');

const ARGV = require('yargs').option('--cssmin', {
  type: 'boolean',
  default: false
}).argv;

console.log('Building website...');
console.time('build');

build('./data', './wbuild', {skipDrafts: true, minifyCss: ARGV.cssmin}, err => {
  if (err) {
    console.error('An error occurred!');
    console.error(err);
    process.exit(1);
  }

  console.timeEnd('build');
  console.log('Build done!');
});
