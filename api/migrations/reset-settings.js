module.exports = function(req, dbs, next) {
  dbs.settings.setState({
    home: {
      grid: [],
      slider: []
    }
  });

  dbs.settings.write().then(() => next());
};
