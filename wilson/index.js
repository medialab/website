const NODE_ENV = process.env.NODE_ENV;

// Babel require hook to transpile React/ES6 imports from static site templates
require('@babel/register')({
  cache: NODE_ENV === 'production' ? false : true,
  only: [
    /site\/src/,
    /wilson\/render\.js/
  ],
  presets: ['@babel/preset-env', '@babel/preset-react']
});

// Dependencies
const {renderPage} = require('./render.js');
const reducers = require('./reducers.js');
const Database = require('./database.js');

// Constants
const TEMPLATES = {
  peopleListing: 'people-list',
  peopleDetail: 'people'
};

for (const k in TEMPLATES)
  TEMPLATES[k] = require.resolve(`../site/src/templates/${TEMPLATES[k]}.js`);

const DATABASE = new Database('./data');

console.log(DATABASE.get('03c4c794-8063-441b-afae-0a833e1548a9'))

// const guillaume = require('../data/people.json').people.find(p => p.lastName === 'Plique');

// renderPage(
//   TEMPLATES.peopleDetail,
//   {lang: 'fr', permalinks: {fr: '', en: ''}, linkToAdmin: false},
//   {person: reducers.people('', guillaume)}
// );
