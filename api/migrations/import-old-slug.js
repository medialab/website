const keys = require('lodash/keys');
const redirections = require('../../specs/oldSlugRedirections.json');

module.exports = function (req, dbs, next) {
  const dryRun = 'dryrun' in req.query;
  const models = keys(redirections);

  models.forEach(m => {
    dbs[m].read();
    const itemsBySlug = {};
    const items = dbs[m].getState()[m];
    //indexing by slug
    items.forEach(o => {
      o.slugs.forEach(s => {
        itemsBySlug[s] = o;
      });
    });

    // adding redirections
    redirections[m].forEach(r => {
      r.done = false;
      const item = itemsBySlug[r.slug];
      if (item)
        if (!item.oldSlug) {
          item.oldSlug = r.oldSlug;
          r.done = true;
        } else
          console.error(
            `item ${r.slug} already have oldSlug ${item.oldSlug}, can't insert ${r.oldSlug}`
          );
      else console.error(`can't find item ${r.slug}`);
    });

    // Persisting
    if (!dryRun) {
      const newData = {};
      newData[m] = items;
      dbs[m].setState(newData);
      dbs[m].write();
    }
  });
  return next(null, redirections);
};
