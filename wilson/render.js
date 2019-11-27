const assert = require('assert');
const compileTemplate = require('lodash/template');
const React = require('react');
const {Helmet} = require('react-helmet');
const {renderToStaticMarkup} = require('react-dom/server');
const SiteContext = require('../site/src/context.js').default;
const meta = require('./meta.js');
const path = require('path');
const fs = require('fs-extra');

// Templates
let GA_TEMPLATE = fs.readFileSync(
  path.join(__dirname, '..', 'site', 'src', 'assets', 'js', 'ga.js'),
  'utf-8'
);
GA_TEMPLATE = compileTemplate(GA_TEMPLATE);

// Helpers
const HELMET_CLEANER = / data-react-helmet="true"/g;

function cleanHelmetOutput(output) {
  return output.replace(HELMET_CLEANER, '');
}

function templateGoogleAnalytics(id) {
  return GA_TEMPLATE({GOOGLE_ANALYTICS_ID: id});
}

function wrap(pathPrefix, content, helmet, scripts, options) {
  options = options || {};

  const ga = options.googleAnalyticsId;

  // Javascript
  let scriptTags = '';

  if (scripts)
    scriptTags = scripts
      .map(script => `<script src="${pathPrefix}/js/${script}.js" type="text/javascript"></script>`)
      .join('\n');

  return `
<!DOCTYPE html>
<html ${helmet.htmlAttributes.toString()}>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    ${cleanHelmetOutput(helmet.title.toString())}
    ${cleanHelmetOutput(helmet.meta.toString())}
    ${cleanHelmetOutput(helmet.link.toString())}
    <link href="${pathPrefix}/font/bel2/bel2.css" rel="stylesheet">
    <link href="${pathPrefix}/font/symbol/symbol.css" rel="stylesheet">
    <link href="${pathPrefix}/medialab.css" rel="stylesheet">
  </head>
  <body>
    ${content}
    ${scriptTags}
    <script type="text/javascript">
      document.dispatchEvent(new Event('ZoteroItemUpdated', {
        bubbles: true,
        cancelable: true
      }));
    </script>
    ${ga ? templateGoogleAnalytics(ga) : ''}
  </body>
</html>
  `.trim();
}

// TODO: solve Helmet warnings
// TODO: drop require cache
// TODO: unwrap ./src folder
// TODO: verify siteUrl + something with prefix
// TODO: factorize `mainPermalink` in components
// TODO: sitemap
// TODO: rss feeds
// TODO: drafts
// TODO: easter egg
// TODO: use classnames for html fallback and such
// TODO: get rid of HTMLFallback or improve it
// TODO: js storage buster on first prod release
exports.renderPage = function(pathPrefix, permalink, template, pageContext, data, options) {
  assert(typeof template === 'string', 'Template should be a string path.');

  options = options || {};

  const Component = require(template).default;

  const renderingContext = {
    ...meta,
    permalink,
    pathPrefix
  };

  const page = (
    <SiteContext.Provider value={renderingContext}>
      <Component data={data} pageContext={pageContext} />
    </SiteContext.Provider>
  );

  let content = renderToStaticMarkup(page);
  const helmet = Helmet.renderStatic();

  content = wrap(
    pathPrefix,
    content,
    helmet,
    options.scripts,
    {googleAnalyticsId: options.googleAnalyticsId}
  );

  return content;
};
