module.exports = function(req, dbs, next) {
  dbs.settings.setState({
    settings: {
      home: {
        grid: [],
        slider: []
      }
    }
  });

  dbs.settings.write().then(() => next());
};
