const auth = require('basic-auth');
const config = require('config-secrets');

const SUPERUSER = config.get('superuser');

exports.authentication = function(req, res, next) {

  // Preview does not require auth
  if (req.url.includes('/preview/'))
    return next();

  const user = auth(req);

  // HTTP auth bypass
  if (
    user &&
    user.name === SUPERUSER.username &&
    user.pass === SUPERUSER.password
  )
    return next();

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
