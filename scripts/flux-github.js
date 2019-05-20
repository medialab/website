const config = require('config');
const path = require('path');
const {retrieveGithubFluxData} = require('../api/flux.js');

const people = require(path.join(__dirname, '..', config.get('data'), 'people.json')).people;

retrieveGithubFluxData(people, (err, data) => {
  if (err)
    return console.error(err);

  console.log(JSON.stringify(data, null, 2));
});
