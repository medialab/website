const assert = require('assert');
const compileTemplate = require('lodash/template');
const React = require('react');
const {Helmet} = require('react-helmet');
const {renderToStaticMarkup} = require('react-dom/server');
const SiteContext = require('../site/context.js').default;
const meta = require('./meta.js');
const path = require('path');
const fs = require('fs-extra');

// Templates
let GA_TEMPLATE = fs.readFileSync(
  path.join(__dirname, '..', 'site', 'assets', 'js', 'ga.js'),
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

function templateRssFeedLink(title, path) {
  return `<link rel="alternate" type="application/rss+xml" title="${title}" href="${path}">`;
}

function wrap(pathPrefix, content, helmet, options) {
  options = options || {};

  const ga = options.googleAnalyticsId;

  // Javascript
  let scriptTags = '';

  if (options.scripts)
    scriptTags = options.scripts
      .map(script => `<script src="${pathPrefix}/js/${script}.js" type="text/javascript"></script>`)
      .join('\n');

  let rssTags = '';

  if (options.rssFeeds)
    rssTags = options.rssFeeds
      .map(feed => {
        const lines = [
          templateRssFeedLink(feed.fr.title, pathPrefix + feed.fr.path),
          templateRssFeedLink(feed.en.title, pathPrefix + feed.en.path)
        ];

        if (feed.main)
          lines.push(
            templateRssFeedLink(feed.fr.title, pathPrefix + '/feed')
          );

        return lines.join('\n');
      })
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
    ${rssTags}
    <link href="${pathPrefix}/font/Bel2/bel2.css" rel="stylesheet">
    <link href="${pathPrefix}/font/Symbol/symbol.css" rel="stylesheet">
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
    <script type="text/javascript>
      ${ga ? templateGoogleAnalytics(ga) : ''}
    </script>
  </body>
</html>
  `.trim();
}

// TODO: solve Helmet warnings
// TODO: verify siteUrl + something with prefix
// TODO: factorize `mainPermalink` in components
// TODO: easter egg
// TODO: use classnames for html fallback and such
// TODO: get rid of HTMLFallback or improve it
// TODO: js storage buster on first prod release
// TODO: template cache busting helper
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
    {
      googleAnalyticsId: options.googleAnalyticsId,
      scripts: options.scripts,
      rssFeeds: options.rssFeeds
    }
  );

  return content;
};
