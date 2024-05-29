const assert = require('assert');
const async = require('async');
const sharp = require('sharp');
const path = require('path');
const {sharpToString, imgToProcessedPng} = require('../specs/processing.js');

if (process.env.DISABLE_SHARP_CACHE) sharp.cache(false);

// Typical cover resize for people portraits
const COVER_RESIZE = {
  width: 300 * 2,
  height: 225 * 2
};

exports.buildCover = function buildCover(
  inputDir,
  outputDir,
  pathPrefix,
  item,
  options,
  callback
) {
  assert(
    !!item.cover,
    `wilson/images.buildCover: cannot build cover if item "${item.id}" has none.`
  );

  options = options || {};

  const publicPath = path.join(outputDir, 'static');

  const cover = item.cover;

  const ext = path.extname(cover.file),
    name = path.basename(cover.file, ext);

  const output = `${name}.cover${ext}`;
  const socialOutput = `${name}.social.png`;

  const crop = cover.crop;

  const data = {
    url: `${pathPrefix}/static/${output}`
  };

  const socialUrl = `${pathPrefix}/static/${socialOutput}`;

  // Function returning a sharp object with correct cropping
  // FUN FACT: sharp does not handle images with orientation=6
  // correctly. This can be seen with this image from the assets:
  //   - DSC_0792_ce5f0b33-306f-45de-ae0d-b61ba28f9add.JPG
  const img = () => {
    return sharp(path.join(inputDir, 'assets', cover.file)).extract({
      left: crop.x,
      top: crop.y,
      width: crop.width,
      height: crop.height
    });
  };

  // Cover needs to be processed and rasterized
  if (cover.processed) {
    return async.parallel(
      {
        small(next) {
          return sharpToString(
            img(),
            cover.crop,
            {
              rows: 60,
              gamma: cover.gamma
            },
            next
          );
        },
        medium(next) {
          return sharpToString(
            img(),
            cover.crop,
            {
              rows: 120,
              gamma: cover.gamma
            },
            next
          );
        },
        large(next) {
          return sharpToString(
            img(),
            cover.crop,
            {
              rows: 240,
              gamma: cover.gamma
            },
            next
          );
        }
      },
      (err, processed) => {
        if (err) return callback(err);

        data.processed = processed;

        if (options.skipRaster) return callback(null, data);

        return imgToProcessedPng(
          processed.medium,
          {
            rows: 120,
            output: path.join(publicPath, socialOutput)
          },
          sharp,
          (rasterErr, raster) => {
            if (rasterErr) return callback(rasterErr);

            data.processed.raster = {
              ...raster,
              url: socialUrl
            };

            return callback(null, data);
          }
        );
      }
    );
  }

  // Cover does not need to be processed (e.g. team portraits)
  const portrait = img().resize(COVER_RESIZE);

  if (options.outputBuffers)
    return portrait.toBuffer((err, buffer) => {
      if (err) return callback(err);

      data.buffer = buffer;

      return callback(null, data);
    });

  return portrait.toFile(path.join(publicPath, output), err => {
    if (err) return callback(err);

    return callback(null, data);
  });
};
