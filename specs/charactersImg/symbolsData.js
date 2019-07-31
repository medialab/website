const symbolsRawData = require('./symbolsData.json');
const symbolTiles = Object.keys(symbolsRawData).reduce((result, key) => {
    return Object.assign(
        result,
        {
        [key]: new Uint8Array(symbolsRawData[key])
        }
    );
}, {})
const tilesDimensions = {width: 7, height: 12};

module.exports = {
    symbolTiles,
    tilesDimensions
};