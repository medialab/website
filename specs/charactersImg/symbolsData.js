const symbolsRawData = require('./symbolsData.json');
let offset = 0;
let index;
let theseValues;
const symbolTiles = Object.keys(symbolsRawData).reduce((result, key) => {
    index = offset;
    theseValues = symbolsRawData[key];
    offset += theseValues.length;
    return Object.assign(
        result,
        {
            tilesIndexes: Object.assign(result.tilesIndexes, {
                [key]: index
            }),
            pixelValues: result.pixelValues.concat(theseValues),
        }
    );
}, {
    tilesIndexes: {},
    pixelValues: []
})
symbolTiles.pixelValues = new Uint8Array(symbolTiles.pixelValues)
const tilesDimensions = {width: 7, height: 12};

module.exports = {
    symbolTiles,
    tilesDimensions
};