const spire = require('../spire');
const _ = require('lodash');

module.exports = function (req, dbs, next) {
  dbs.people.read();
  const peopleState = dbs.people.getState();
  const spireAuthors = _.keyBy(
    peopleState.people.filter(p => !!p.spire),
    p => p.spire.id
  );

  dbs.productions.read();
  const prodState = dbs.productions.getState();
  prodState.productions
    .filter(p => p.spire && p.spire.meta)
    .forEach(p => {
      p.spire.generatedFields = spire.translateRecord(
        p.spire.meta,
        spireAuthors
      );
    });

  dbs.productions.setState(prodState);

  dbs.productions.write();
  next();
};
