// Babel require hook to transpile React/ES6 imports from static site templates
require('@babel/register')({
  cache: false,
  only: [
    /site\/src/
  ],
  presets: ['@babel/preset-env', '@babel/preset-react']
});

// Dependencies
const {renderPage} = require('./render.js');
const reducers = require('./reducers.js');

// Constants
const TEMPLATES = {
  peopleListing: 'people-list',
  peopleDetail: 'people'
};

for (const k in TEMPLATES)
  TEMPLATES[k] = require.resolve(`../site/src/templates/${TEMPLATES[k]}.js`);


const guillaume = require('../data/people.json').people.find(p => p.lastName === 'Plique');

renderPage(TEMPLATES.peopleDetail, {hello: 'world'}, reducers.people('', guillaume));
