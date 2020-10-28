module.exports = function (req, dbs, next) {
  dbs.activities.read();

  const state = dbs.activities.getState();

  state.activities.forEach(n => {
    delete n.important;
  });

  dbs.activities.setState(state);

  dbs.activities.write();
  return next();
};
