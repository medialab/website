const config = require('config');
const path = require('path');
const fs = require('fs');
const {retrieveGithubFluxData} = require('../api/flux.js');

const people = require(path.join(__dirname, '..', config.get('data'), 'people.json')).people;

retrieveGithubFluxData(people, (err, data) => {
  if (err)
    return console.error(err);

  fs.writeFileSync(
    path.join(__dirname, '..', config.get('data'), 'github.json'),
    JSON.stringify(data, null, 2)
  );
});
