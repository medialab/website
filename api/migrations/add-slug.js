module.exports = function (req, dbs, next) {
  const id = req && req.query && 'id' in req.query && req.query.id;
  const newSlug = req && req.query && 'slug' in req.query && req.query.slug;
  const dryRun = req && req.query && 'dryrun' in req.query;

  if (!id) {
    return next(null, {error: 'Missing id!'});
  }

  if (!newSlug) {
    return next(null, {error: 'Missing slug!'});
  }

  function search(db) {
    dbs[db].read();

    const state = dbs[db].getState();

    const item = state[db].find(data => {
      return data.id === id;
    });

    if (!item) return null;

    item.slugs.push(newSlug);

    if (!dryRun) {
      dbs[db].setState(state);
      dbs[db].write();
    }

    return item;
  }

  let item = null;

  ['activities', 'people', 'productions', 'news'].find(db => {
    const found = search(db);

    if (found) {
      item = found;
      return true;
    }

    return false;
  });

  if (!item) {
    return next(null, {error: 'Could not find item with given id!', id: id});
  }

  return next(null, {item: item});
};
