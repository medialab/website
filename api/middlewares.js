exports.lastUpdated = function(req, res, next) {
  if (req.method !== 'POST' && req.method !== 'PUT')
    return next();

  const payload = req.body;

  payload.lastUpdated = +(new Date());

  return next();
};
