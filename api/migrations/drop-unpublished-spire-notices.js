module.exports = function (req, dbs, next) {
  dbs.productions.read();
  const dryRun = 'dryrun' in req.query;

  const state = dbs.productions.getState();

  state.productions = state.productions
    .map(p => {
      if (p.spire && p.spire.meta && p.spire.meta.state_spire !== '3') {
        console.log(
          `${dryRun ? 'dryrun' : ''} delete (${p.spire.meta.state_spire}) ${
            p.id
          } ${
            p.spire.generatedFields.title.fr || p.spire.generatedFields.title.en
          }`
        );
        if (!dryRun) return null;
      }
      return p;
    })
    .filter(p => p);

  dbs.productions.setState(state);

  dbs.productions.write();
  return next();
};
