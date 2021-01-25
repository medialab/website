const partition = require('lodash/partition');

const MODELS = [
  'activities',
  'news',
  // 'people',
  'productions'
];

module.exports = function (req, dbs, next) {
  const dryRun = 'dryrun' in req.query || 'dry-run' in req.query;

  const data = {};
  let deleted = [];

  let stringifiedData = '';
  MODELS.forEach(plural => {
    dbs[plural].read();
    data[plural] = dbs[plural].getState()[plural];
    stringifiedData += JSON.stringify(data[plural]) + '\n';
  });

  MODELS.forEach(m => {
    // Finding things to delete
    const [toDelete, toKeep] = partition(data[m], o => {
      let title = '';

      if (o.title) title += (o.title.fr || '') + (o.title.en || '');

      if (o.name) title += (o.name.fr || '') + (o.name.en || '');

      // NOTE: should only happen with spire items
      if (!title) {
        if (!o.spire) console.error('Problematic item!', m, o);

        return false;
      }

      return title.includes(' SUPPRIMER');
    });

    let error = null;

    toDelete.some(o => {
      const match = stringifiedData.match(o.id);

      if (match && match.length > 1) error = `${o.id} is still linked!`;

      return error;
    });

    if (error) return next(error);

    deleted = deleted.concat(toDelete);

    // Persisting
    if (!dryRun) {
      const newData = {};
      newData[m] = toKeep;
      dbs[m].setState(newData);
      dbs[m].write();
    }
  });

  return next(null, deleted);
};
