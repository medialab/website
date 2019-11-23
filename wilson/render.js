const assert = require('assert');
const React = require('react');
const {Helmet} = require('react-helmet');
const {renderToStaticMarkup} = require('react-dom/server');
const SiteContext = require('../site/src/context.js').default;
const pretty = require('pretty');
const meta = require('./meta.js');

// Helpers
function wrap(content) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  </head>
  <body>
    ${content}
  </body>
</html>
  `.trim();
}

// TODO: drop require cache
// TODO: replace svg components
// TODO: replace png imports
// TODO: relink CSS stylesheets
// TODO: wrapper + metas + helmet
// TODO: PageMeta
// TODO: prettier --write --parser scss 'src/assets/scss/**/*.scss'
// TODO: news.isInternal is internal once more
// TODO: check ordering random etc.
// TODO: github, twitter reducers
// TODO: solve production authors with people field after solving people
exports.renderPage = function(template, pageContext, data, options) {
  assert(typeof template === 'string', 'Template should be a string path.');

  options = options || {};

  const Component = require(template).default;

  const page = (
    <SiteContext.Provider value={meta}>
      <Component data={data} pageContext={pageContext} />
    </SiteContext.Provider>
  );

  let content = renderToStaticMarkup(page);
  const helmet = Helmet.renderStatic();

  content = wrap(content);

  if (options.pretty)
    content = pretty(content);

  return content;
};
