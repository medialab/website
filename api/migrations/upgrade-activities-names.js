module.exports = function (req, dbs, next) {
  dbs.activities.read();

  const state = dbs.activities.getState();

  state.activities.forEach(n => {
    n.name = {
      fr: n.name,
      en: n.name
    };
  });

  dbs.activities.setState(state);

  dbs.activities.write();
  return next();
};
