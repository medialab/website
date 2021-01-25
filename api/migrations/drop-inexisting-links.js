const DB = require('../../wilson/database.js');

const MODELS = ['activities', 'news', 'people', 'productions'];

module.exports = function (req, dbs, next) {
  const ids = new Set();
  const deleted = [];

  const data = {};

  MODELS.forEach(plural => {
    dbs[plural].read();

    data[plural] = dbs[plural].getState()[plural];

    data[plural].forEach(item => {
      ids.add(item.id);
    });
  });

  MODELS.forEach(plural => {
    const forward = DB.FORWARD_LINKS[plural];

    data[plural].forEach(item => {
      for (const rel in forward) {
        const links = item[rel];

        if (!links) continue;

        item[rel] = links.filter(id => {
          if (!ids.has(id)) {
            deleted.push({
              from: {
                model: plural,
                item
              },
              deleted: {
                id,
                relation: rel
              }
            });

            return false;
          }

          return true;
        });
      }
    });
  });

  MODELS.forEach(plural => {
    dbs[plural].setState({[plural]: data[plural]});
    dbs[plural].write();
  });

  return next(null, deleted);
};
