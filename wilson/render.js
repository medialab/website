const assert = require('assert');
const React = require('react');
const Helmet = require('react-helmet');
const {renderToStaticMarkup} = require('react-dom/server');
const SiteContext = require('../site/src/context.js').default;
const meta = require('./meta.js');

// TODO: drop require cache
// TODO: replace svg components
// TODO: replace png imports
// TODO: relink CSS stylesheets
// TODO: wrapper + metas + helmet
// TODO: PageMeta
exports.renderPage = function(template, pageContext, data) {
  assert(typeof template === 'string', 'Template should be a string path.');

  const Component = require(template).default;

  const page = (
    <SiteContext.Provider value={meta}>
      <Component data={data} pageContext={pageContext} />
    </SiteContext.Provider>
  );

  const content = renderToStaticMarkup(page);
  const helmet = Helmet.renderToStaticMarkup();

  return {content, helmet};
};
