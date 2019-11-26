const assert = require('assert');
const async = require('async');
const sharp = require('sharp');
const path = require('path');
const {sharpToString, imgToProcessedPng} = require('../specs/processing.js');

// Typical cover resize for people portraits
const COVER_RESIZE = {
  width: 300 * 2,
  height: 225 * 2
};

exports.buildCover = function buildCover(inputDir, outputDir, pathPrefix, item, callback) {
  assert(!!item.cover, `wilson/images.buildCover: cannot build cover if item "${item.id}" has none.`)

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
  const img = () => {
    return sharp(path.join(inputDir, 'assets', cover.file))
      .extract({
        left: crop.x,
        top: crop.y,
        width: crop.width,
        height: crop.height
      });
  };

  // Cover needs to be processed and rasterized
  if (cover.processed) {
    return async.parallel({
      small(next) {
        return sharpToString(img(), cover.crop, {
          rows: 60,
          gamma: cover.gamma
        }, next);
      },
      medium(next) {
        return sharpToString(img(), cover.crop, {
          rows: 120,
          gamma: cover.gamma
        }, next);
      },
      large(next) {
        return sharpToString(img(), cover.crop, {
          rows: 240,
          gamma: cover.gamma
        }, next);
      },
    }, (err, processed) => {
      if (err)
        return callback(err);

      data.processed = processed;

      return imgToProcessedPng(
        processed.medium,
        {
          rows: 120,
          output: path.join(publicPath, socialOutput)
        },
        sharp,
        (err, raster) => {
          if (err)
            return callback(err);

          data.raster = {
            ...raster,
            url: socialUrl
          };

          return callback(null, data);
        }
      );
    });
  }

  // Cover does not need to be processed (e.g. team portraits)
  return img()
    .resize(COVER_RESIZE)
    .toFile(path.join(publicPath, output), err => {
      if (err)
        return callback(err);

      return callback(null, data);
    });
};
