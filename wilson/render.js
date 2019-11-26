const assert = require('assert');
const React = require('react');
const {Helmet} = require('react-helmet');
const {renderToStaticMarkup} = require('react-dom/server');
const SiteContext = require('../site/src/context.js').default;
const meta = require('./meta.js');

// Helpers
function wrap(content, helmet) {
  return `
<!DOCTYPE html>
<html ${helmet.htmlAttributes.toString()}>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    <link href="/font/bel2/bel2.css" rel="stylesheet">
    <link href="/font/symbol/symbol.css" rel="stylesheet">
    <link href="/medialab.css" rel="stylesheet">
  </head>
  <body>
    ${content}
  </body>
</html>
  `.trim();
}

// TODO: link lang bold for current lang
// TODO: path prefix for stylesheets and Js
// TODO: drop require cache
// TODO: replace png imports
// TODO: wrapper + metas + helmet
// TODO: PageMeta
// TODO: prettier --write --parser scss 'src/assets/scss/**/*.scss'
// TODO: news.isInternal is internal once more
// TODO: check ordering random etc.
// TODO: github, twitter reducers
// TODO: solve production authors with people field after solving people
// TODO: factorize `mainPermalink` in components
// TODO: sitemap
// TODO: rss feeds
// TODO: 404 page
// TODO: static logo
// TODO: easter egg
// TODO: html lang
// TODO: analytics
// TODO: issue with cropped images in prod
// TODO: script injection
// TODO: use classnames for html fallback and such
// TODO: get rid of HTMLFallback or improve it
// TODO: js storage buster on first prod release
exports.renderPage = function(permalink, template, pageContext, data, options) {
  assert(typeof template === 'string', 'Template should be a string path.');

  options = options || {};

  const Component = require(template).default;

  const renderingContext = {
    ...meta,
    permalink
  };

  const page = (
    <SiteContext.Provider value={renderingContext}>
      <Component data={data} pageContext={pageContext} />
    </SiteContext.Provider>
  );

  let content = renderToStaticMarkup(page);
  const helmet = Helmet.renderStatic();

  content = wrap(content, helmet);

  return content;
};
