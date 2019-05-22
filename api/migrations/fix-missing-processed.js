module.exports = function(req, dbs, next) {

  [
    'activities',
    'news',
    'people',
    'productions'
  ].forEach(plural => {
    dbs[plural].read();

    const state = dbs[plural].getState();

    state[plural].forEach(item => {
      if (!item.cover)
        return;

      if (plural === 'people') {
        delete item.cover.gamma;
        item.cover.processed = false;
        return;
      }

      if (typeof item.cover.gamma === 'number')
        item.cover.processed = true;
    });

    dbs[plural].setState(state);
  });

  dbs.activities.write();
  dbs.news.write();
  dbs.people.write();
  dbs.productions.write();

  return next();
};
