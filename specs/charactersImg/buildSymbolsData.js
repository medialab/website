const decodePNG = require('png-js').decode;
const writeFile = require('fs-extra').writeFile;
const getImagesAsPixels = require('../processing').getImagesAsPixels;

const char00A0 = __dirname + '/00A0.png';
const char2588 = __dirname + '/2588.png';
const char2591 = __dirname + '/2591.png';
const char2592 = __dirname + '/2592.png';
const char2593 = __dirname + '/2593.png';
const symbolTiles = {char00A0, char2588, char2592, char2591, char2593};
getImagesAsPixels(symbolTiles, decodePNG)
  .then(result => {
    const serializable = Object.keys(result).reduce((final, key) => {
        return Object.assign(final, {
            [key]: Array.from(result[key])
        })
    }, {});
    return writeFile(__dirname + '/symbolsData.json', JSON.stringify(serializable), 'utf8')
  })
  .then(() => {
      console.log('done, symbols data written at', __dirname + '/symbolsData.json')
  })
  .catch(e => console.log('could not load tiles pixels', e))