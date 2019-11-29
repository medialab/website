const NODE_ENV = process.env.NODE_ENV;

const path = require('path');

// Babel require hook to transpile React/ES6 imports from static site templates
const siteDirectory = path.resolve(__dirname, '..', 'site');

require('@babel/register')({
  cache: NODE_ENV === 'production' ? false : true,
  only: [
    new RegExp(siteDirectory.replace(/\//g, '\/')),
    /wilson\/render\.js/
  ],
  presets: ['@babel/preset-env', '@babel/preset-react']
});
