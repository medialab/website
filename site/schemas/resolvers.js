const memoize = require('timed-memoize').default;
const path = require('path');
const sharp = require('sharp');
const inProduction = process.env.NODE_ENV === 'production';

exports.createSettingsItemResolver = () => {
  return {
    resolve(source, args, context) {
      return context.nodeModel.getNodeById({id: source.id});
    }
  };
};

exports.createRelationResolver = property => {
  return {
    resolve(source, args, context) {
      return context.nodeModel.getNodesByIds({ids: source[property]}).filter(x => !!x);
    }
  };
};

exports.createBacklinkResolver = (relationType, propName) => {
  return {
    resolve(source, args, context) {
      const nodes = context.nodeModel.getAllNodes({type: relationType});

      return nodes.filter(node => node[propName] && node[propName].includes(source.id));
    }
  };
};

exports.createCoverImageResolver = settings => {

  const resolver = source => {
    if (!source.cover)
      return null;
    const cover = source.cover;

    const ext = path.extname(cover.file),
          name = path.basename(cover.file, ext);

    const output = `${name}.cover${ext}`;

    const crop = cover.crop;

    const data = {
      url: `${settings.prefix}/static/${output}`
    };

    return new Promise((resolve, reject) => {

      const img = () => sharp(path.join(settings.assetsPath, cover.file)).extract({
        left: crop.x,
        top: crop.y,
        width: crop.width,
        height: crop.height
      });

      // TODO: temporal memoize to avoid triggering too many copies?
      // TODO: only use a single stream?
      return img()
        .toFile(path.join(settings.publicPath, output), err => {
          if (err)
            return reject(err);

          if (cover.processed) {
            Promise.all([
              settings.processing(img(), cover.crop, {
                rows: 60,
                gamma: cover.gamma
              }),
              settings.processing(img(), cover.crop, {
                rows: 120,
                gamma: cover.gamma
              }),
              settings.processing(img(), cover.crop, {
                rows: 240,
                gamma: cover.gamma
              }),
              inProduction ? settings.unprocessing(img(), cover.crop, {
                rows: 60,
                gamma: cover.gamma,
                id: source.slugs.join(),
              }, settings) : Promise.resolve({url : undefined, width: 0, height: 0}),
            ])
            .then(([small, medium, large, unprocessed]) => {
            resolve({...data, processed: {small, medium, large, unprocessed}});
            }).catch(reject);
          }
          else {
            resolve(data);
          }
        });
    });
  };

  return {
    resolve: memoize(resolver, {
      timeout: 60 * 1000,
      resolver: args => args[0].id
    })
  };
};
