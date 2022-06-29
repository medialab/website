const cleanReference = require('../utils').cleanReference;

module.exports = function (req, dbs, next) {
  dbs.productions.read();

  const state = dbs.productions.getState();

  state.productions.forEach(p => {
    if (!p.spire) return;

    const generatedFields = p.spire.generatedFields;

    if (generatedFields.ref) {
      generatedFields.ref = cleanReference(generatedFields.ref);
    }

    const description = generatedFields.description;

    if (!description) return;

    if (description.fr) {
      description.fr = cleanReference(description.fr);
    }

    if (description.en) {
      description.en = cleanReference(description.en);
    }
  });

  dbs.productions.setState(state);

  dbs.productions.write();
  return next();
};
