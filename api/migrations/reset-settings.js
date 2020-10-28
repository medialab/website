module.exports = function (req, dbs, next) {
  dbs.settings.setState({
    settings: {
      home: {
        grid: [],
        slider: [],
        topActivities: []
      }
    }
  });

  dbs.settings.write();
  return next();
};
