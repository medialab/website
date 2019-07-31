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
 * Translates a raw image into a symbol-processed png file
 */
function imgToProcessedPng(data, options, settings) {
  const tileWidth = settings.tilesDimensions.width;
  const tileHeight = settings.tilesDimensions.height;
  const filePath = `${settings.publicPath}/${options.id}.social.png`;
  // console.time('building processed image png' + filePath)
  return new Promise((resolve, reject) => {
    // convert flat characters string to a 2d matrix of single characters
    const matrix = mapStringToCharacterMatrix(data, options.rows);
    const columnsNumber = matrix[0].length;
    const rowsNumber = matrix.length;
    const imageWidth = columnsNumber * tileWidth;
    const imageHeight = rowsNumber * tileHeight;
    // compute width in rgba of a row of pixels in the symbols
    const tileWidthInValues = tileWidth * 4;    
    // instantiate buffer to populate with final image data
    const buffer = new Uint8Array(imageWidth * imageHeight * 4);
    // iterate in matrix of symbols
    let tilePixels;
    let tileOffsetXInPixels;
    let tileOffsetYInPixels;
    let rowValues;
    let rowOffset;

    for (let x = 0 ; x < columnsNumber ; x++) {
      for (let y = 0 ; y < rowsNumber ; y++) {
        // get Uint8Array of pixels for the cell's corresponding tile
        tilePixels = settings.symbolTiles[matrix[y][x]];
        tileOffsetXInPixels = tileWidth * x;
        tileOffsetYInPixels = tileHeight * y;
        // iterate in each row of the tile image to add its data to the buffer
        for (let row = 0 ; row < tileHeight ; row ++) {
          // values of the current row of pixels
          rowValues = tilePixels
          // get slice of 4-channels values corresponding to the tile row of pixels
          .slice(tileWidthInValues * row, tileWidthInValues * row + tileWidthInValues)
          // compute 1-dimension offset in final image
          rowOffset = (tileOffsetYInPixels * imageWidth + row * imageWidth + tileOffsetXInPixels) * 4;
          // add values to buffer at correct position
          buffer.set(rowValues, rowOffset);
        }
      }
    }

    settings.sharp(Buffer.from(buffer), {
        raw: {
            width: imageWidth,
            height: imageHeight,
            channels: 4
        }
    })
    .flatten({background: {r: 255, g: 255, b: 255}})
    .toFile(filePath)
    .then(() => {
      // console.timeEnd('building processed image png' + filePath);
      resolve({
        width: Math.floor(imageWidth),
        height: Math.floor(imageHeight),
        url: `static/${options.id}.social.png`
      });
    }).catch(reject)
  });
}

exports.readImageFileAsDataUrl = readImageFileAsDataUrl;
exports.sharpToString = sharpToString;
exports.imgToProcessedPng = imgToProcessedPng;
exports.imageFileToBlocks = imageFileToBlocks;
exports.imageToBlocks = imageToBlocks;
exports.getImagesAsPixels = getImagesAsPixels;