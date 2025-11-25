const config = require('config-secrets');
const path = require('path');
const fs = require('fs');
const {retrieveBlueskyFluxData} = require('../api/flux.js');

retrieveBlueskyFluxData((err, data) => {
  if (err) return console.error(err);

  fs.writeFileSync(
    path.join(__dirname, '..', config.get('data'), 'bluesky.json'),
    JSON.stringify(data, null, 2)
  );
});
