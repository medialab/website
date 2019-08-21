

const productionsRedirections = require('../../specs/productionsRedirections.json');


module.exports = function(req, dbs, next) {
  const dryRun = 'dryrun' in req.query;

  //indexing productions
  const productionsBySlug = {};
  dbs.productions.read();
  const productions = dbs.productions.getState().productions;
  productions.forEach(p => {
    p.slugs.forEach(s => {
      productionsBySlug[s] = p;
    });
  });

  // adding redirections
  productionsRedirections.forEach(r => {
    r.done = false;
    const prod = productionsBySlug[r.slug];
    if (prod)
      if (!prod.oldSlug) {
        prod.oldSlug = r.oldSlug;
        r.done = true;
      }
      else
        console.error(`production ${r.slug} already have oldSlug ${prod.oldSlug}, can't insert ${r.oldSlug}`);
    else
      console.error(`can't find production ${r.slug}`);
  });

  productions.forEach(prod => {
    // publish all
    prod.draft = false;
  });

  // Persisting
  if (!dryRun) {
    dbs.productions.setState({productions});
    dbs.productions.write();
  }
  return next(null, productionsRedirections);
};
