const {retrieveTwitterFluxData} = require('../api/flux.js');

retrieveTwitterFluxData((err, data) => {
  if (err)
    return console.error(err);

  console.log(JSON.stringify(data, null, 2));
});
