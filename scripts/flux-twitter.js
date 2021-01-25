const config = require('config-secrets');
const path = require('path');
const fs = require('fs');
const {retrieveTwitterFluxData} = require('../api/flux.js');

retrieveTwitterFluxData((err, data) => {
  if (err) return console.error(err);

  fs.writeFileSync(
    path.join(__dirname, '..', config.get('data'), 'twitter.json'),
    JSON.stringify(data, null, 2)
  );
});
