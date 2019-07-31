const BLOCKS = ['\u00A0', '\u2591', '\u2592', '\u2593', '\u2588'].reverse();
const CARDINALITY = BLOCKS.length;
const NUM_RATIO = 756 / CARDINALITY;
const ASCII_WIDTH = 9;
const ASCII_HEIGHT = 19;

function readImageFileAsDataUrl(file, callback) {
  const reader = new FileReader();

  reader.onloadend = () => {
    callback(reader.result);
  };

  reader.readAsDataURL(file);
}

function dataUrlToScaledCanvas(url, rows, callback) {
  const image = new Image();

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  image.onload = () => {
    const ratio = image.width / image.height;

    canvas.width = rows;
    canvas.height = rows * ASCII_WIDTH / ratio / ASCII_HEIGHT;

    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    callback(canvas);
  };

  image.src = url;
}

function imgToScaledCanvas(img, rows, crop) {
  const ratio = crop.width / crop.height;

  const canvas = document.createElement('canvas');
  canvas.width = rows;
  canvas.height = rows * ASCII_WIDTH / ratio / ASCII_HEIGHT;

  const context = canvas.getContext('2d');

  context.drawImage(
    img,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  return canvas;
}

function canvasToPixels(canvas) {
  const context = canvas.getContext('2d');

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  return imageData.data;
}

function pixelsToBlocks(pixels, options) {
  const {
    gamma,
  } = options;

  const offset = options.noAlpha ? 3 : 4;

  const blocks = new Uint8Array(pixels.length / offset);

  for (let px = 0, b = 0; px < pixels.length; px += offset) {

    let block = Math.floor(
      (
        pixels[px] +
        pixels[px + 1] +
        pixels[px + 2] -
        gamma
      ) / NUM_RATIO
    ) - 1;

    if (block > CARDINALITY - 1)
      block = CARDINALITY - 1;
    else if (block < 0)
      block = 0;

    blocks[b] = block;

    b++;
  }

  return blocks;
}

function canvasToBlocks(canvas, options) {
  const pixels = canvasToPixels(canvas);

  return pixelsToBlocks(pixels, options);
}

function mapBlocksToCharacterMatrix(blocks, rows) {
  const matrix = new Array(blocks.length / rows);

  for (let c = 0, i = 0; c < blocks.length; c += rows) {
    matrix[i] = Array.from(blocks.slice(c, c + rows)).map(b => BLOCKS[b]);

    i++;
  }

  return matrix;
}

function mapStringToCharacterMatrix(str, rows) {
  const blocks = Array.from(str);
  const matrix = new Array(blocks.length / rows);

  for (let c = 0, i = 0; c < blocks.length; c += rows) {
    matrix[i] = Array.from(blocks.slice(c, c + rows));

    i++;
  }

  return matrix;
}

function mapBlocksToString(blocks) {
  return Array.from(blocks, i => BLOCKS[i]).join('');
}

function sharpToString(img, crop, options) {
  const ratio = crop.width / crop.height;

  return new Promise((resolve, reject) => {
    img
      .resize({
        width: options.rows,
        height: (options.rows * ASCII_WIDTH / ratio / ASCII_HEIGHT) | 0
      })
      .raw()
      .toBuffer((err, buffer, info) => {
        if (err)
          return reject(err);

        const data = pixelsToString(new Uint8ClampedArray(buffer), {...options, noAlpha: info.channels === 3});

        resolve(data);
      });
  });
}


function pixelsToString(pixels, options) {
  return mapBlocksToString(pixelsToBlocks(pixels, options));
}

function imageFileToBlocks(file, options, callback) {

  readImageFileAsDataUrl(file, url => {
    dataUrlToScaledCanvas(url, options.rows, canvas => {
      const blocks = canvasToBlocks(canvas, options);

      return callback(null, mapBlocksToCharacterMatrix(blocks, options.rows));
    });
  });
}

function imageToBlocks(img, options) {
  const canvas = imgToScaledCanvas(img, options.rows, options.crop);

  const blocks = canvasToBlocks(canvas, options);

  return mapBlocksToCharacterMatrix(blocks, options.rows);
}

/**
 * From a map of image paths,
 * returns a map in which values are Uint8Array pixel information
 * coded on 3 channels (rvba)
 */
function getImagesAsPixels(mapOfImages, decodePNG) {
  let result = {};
  return new Promise ((globalResolve, globalReject) => {
    Object.keys(mapOfImages).reduce((cur, key) => 
      cur.then(() => new Promise((resolve) => {
        decodePNG(mapOfImages[key], (buffer) => {
          // const pixels = new Uint8Array(toArrayBuffer(buffer));
          const pixels = new Uint8Array(buffer);
          result[key] = pixels;
          resolve()
        })
      }))
    , Promise.resolve())
    .then(() => globalResolve(result))
    .catch(globalReject)
  })
}

/**
 * Translates an absolute pixel information into a position
 * in a matrix of tiles.
 * @param {*} x 
 * @param {*} y 
 * @param {*} columnWidth 
 * @param {*} rowHeight 
 * @return {Object} coordinates in the tiles matrix and relative offset
 */
function getCoordinatesForPixel (x, y, columnWidth, rowHeight) {
  const offsetX = x % columnWidth;
  const offsetY = y % rowHeight;
  const column = Math.floor(x / columnWidth);
  const row = Math.floor(y / rowHeight);
  return {
      column,
      row,
      offsetX,
      offsetY
  }
}

/**
 * Translates absolute position of pixel into pixel information
 * against a matrix of tile images
 * @return {Uint8Array} channels - triplet of RVB values (on range 0-255)
 */
function getChannelsForPixel ({
  x,
  y,
  columnWidth, 
  rowHeight,
  getSymbolFromChar,
  cellsMap,
  symbolsMap
}) {
  // determine pixel position
  // regarding tiles matrix
  const {
      column,
      row,
      offsetX,
      offsetY
  } = getCoordinatesForPixel(x, y, columnWidth, rowHeight)
  // get corresponding char
  const char = cellsMap[row][column];
  // get corresonding symbol's pixel Uint8Array
  const symbolKey = getSymbolFromChar(char);
  const pixels = symbolsMap[symbolKey];
  // translate 2d position into 1d position in the list of pixels of the symbol
  const order = (offsetY * columnWidth) + offsetX;
  // map to the 4 channels image position of the pixel in symbol pixels list
  // (but keep only 3 as we encode the image in 3 channels)
  const channels = pixels.slice(order * 4, order * 4 + 3)
  return channels;
}

/**
 * Translates a raw image into a symbol-processed png file
 */
function imgToProcessedPng(img, crop, options, settings) {
  const tileWidth = settings.tilesDimensions.width;
  const tileHeight = settings.tilesDimensions.height;
  const symbolsMap = settings.symbolTiles;
  const filePath = `${settings.publicPath}/${options.id}.social.png`;
  console.log('building processed image png', filePath)

  return new Promise((resolve, reject) => {
    sharpToString(img, crop, options)
    .then((data) => {
      const matrix = mapStringToCharacterMatrix(data, options.rows);
      const columnsNumber = matrix[0].length;
      const rowsNumber = matrix.length;
      const imageWidth = columnsNumber * tileWidth;
      const imageHeight = rowsNumber * tileHeight;      

      // maps unicode symbols to corresponding pixels map key
      const getSymbolFromChar = char => {
        switch(char) {
          case '\u00A0':
            return 'char00A0';
            break;
          case '\u2591':
              return 'char2591';
              break;
          case '\u2592':
              return 'char2592';
              break;
          case '\u2593':
              return 'char2593';
              break;
          case '\u2588':
          default:
              return 'char2588';
              break;
        }
      }

      let buffer = new Uint8Array(imageWidth * imageHeight * 3);
      for (let x = 0 ; x < imageWidth ; x ++) {
          for (let y = 0 ; y < imageHeight ; y ++) {
            const channels = getChannelsForPixel({
              x, 
              y, 
              columnsNumber,
              rowsNumber,
              cellsMap: matrix,
              symbolsMap,
              getSymbolFromChar,
              columnWidth: tileWidth,
              rowHeight: tileHeight
            })
            // add rvb triplet
            buffer.set(channels, x * 3 + y * imageWidth * 3);
          }
      }
    settings.sharp(Buffer.from(buffer), {
        raw: {
            width: imageWidth,
            height: imageHeight,
            channels: 3
        }
    })
    .toFile(filePath)
    .then(() => {
      resolve({
        width: Math.floor(imageWidth),
        height: Math.floor(imageHeight),
        url: `static/${options.id}.social.png`
      });
    }).catch(reject)
    });
  });
}

exports.readImageFileAsDataUrl = readImageFileAsDataUrl;
exports.sharpToString = sharpToString;
exports.imgToProcessedPng = imgToProcessedPng;
exports.imageFileToBlocks = imageFileToBlocks;
exports.imageToBlocks = imageToBlocks;
exports.getImagesAsPixels = getImagesAsPixels;