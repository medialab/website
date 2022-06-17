const {syncSpire} = require('../../api/spire/sync.js');

syncSpire((err, r) => {
  if (err) return console.error(err);
  console.log(r);
});
