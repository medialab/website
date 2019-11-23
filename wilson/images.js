const assert = require('assert');
const sharp = require('sharp');
const path = require('path');

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

  if (cover.processed)
    return process.nextTick(callback);

  return img()
    .resize(COVER_RESIZE)
    .toFile(path.join(publicPath, output), err => {
      if (err)
        return callback(err);

      return callback(null, data);
    });
};
