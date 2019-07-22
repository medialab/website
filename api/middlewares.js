exports.authentication = function(req, res, next) {
  if (!req.session || !req.session.authenticated)
    return res.status(401).send('Unauthorized');

  return next();
};

exports.lastUpdated = function(req, res, next) {
  if (req.method !== 'POST' && req.method !== 'PUT')
    return next();

  const payload = req.body;

  payload.lastUpdated = +(new Date());

  return next();
};
