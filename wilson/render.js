const assert = require('assert');
const compileTemplate = require('lodash/template');
const React = require('react');
const {Helmet} = require('react-helmet');
const {renderToStaticMarkup} = require('react-dom/server');
const SiteContext = require('../site/context.js').default;
const meta = require('./meta.js');

// Templates
let MATOMO_TEMPLATE = `
  <!-- Matomo -->
  <script type="text/javascript">
    var _paq = window._paq = window._paq || [];
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(['setDoNotTrack', true]);
    _paq.push(['disableCookies']);
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
      var u='//<%= MATOMO_DOMAIN %>/';
      _paq.push(['setTrackerUrl', u+'matomo.php']);
      _paq.push(['setSiteId', '<%= MATOMO_SITE_ID %>']);
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      g.type='text/javascript'; g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
    })();
  </script>
  <noscript><p><img src="//<%= MATOMO_DOMAIN %>/matomo.php?idsite=13&amp;rec=1" style="border:0;" alt="" /></p></noscript>
  <!-- End Matomo Code -->
`;

MATOMO_TEMPLATE = compileTemplate(MATOMO_TEMPLATE);

// Helpers
const HELMET_CLEANER = / data-react-helmet="true"/g;

function cleanHelmetOutput(output) {
  return output.replace(HELMET_CLEANER, '');
}

function templateMatomo(domain, id) {
  return MATOMO_TEMPLATE({MATOMO_DOMAIN: domain, MATOMO_SITE_ID: id});
}

function templateRssFeedLink(title, href) {
  return `<link rel="alternate" type="application/rss+xml" title="${title}" href="${href}">`;
}

function wrap(pathPrefix, content, helmet, options) {
  options = options || {};

  const matomoDomain = options.matomoDomain;
  const matomoSiteId = options.matomoSiteId;

  // Javascript
  let scriptTags = '';

  if (options.scripts)
    scriptTags = options.scripts
      .map(script => `<script src="${pathPrefix}/js/${script}.js"></script>`)
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
          lines.push(templateRssFeedLink(feed.fr.title, pathPrefix + '/feed'));

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
    <link rel="apple-touch-icon" sizes="57x57" href="${pathPrefix}/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="${pathPrefix}/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="${pathPrefix}/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="${pathPrefix}/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="${pathPrefix}/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="${pathPrefix}/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="${pathPrefix}/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="${pathPrefix}/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="${pathPrefix}/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="${pathPrefix}/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="${pathPrefix}/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="${pathPrefix}/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="${pathPrefix}/favicon-16x16.png">
    <link rel="manifest" href="${pathPrefix}/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="${pathPrefix}/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    ${cleanHelmetOutput(helmet.link.toString())}
    ${rssTags}
    <link href="${pathPrefix}/font/Bel2/bel2.css" rel="stylesheet">
    <link href="${pathPrefix}/font/Symbol/symbol.css" rel="stylesheet">
    <link href="${pathPrefix}/medialab.css" rel="stylesheet">
    ${matomoSiteId ? templateMatomo(matomoDomain, matomoSiteId) : ''}
  </head>
  <body>
    ${content}
    <script>
      document.dispatchEvent(new Event('ZoteroItemUpdated', {
        bubbles: true,
        cancelable: true
      }));
      ${
        options.livereloadUrl
          ? `window.API_URL = '${options.livereloadUrl}';`
          : ''
      }
    </script>
    ${scriptTags}
  </body>
</html>
  `.trim();
}

// TODO: factorize `mainPermalink` in components
// TODO: easter egg
// TODO: use classnames for html fallback and such
// TODO: get rid of HTMLFallback or improve it
exports.renderPage = function (
  pathPrefix,
  permalink,
  template,
  pageContext,
  data,
  options
) {
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

  const scripts = (options.scripts || []).slice();

  if (options.livereloadUrl) scripts.push('livereload');

  // Internal search should be activated on every page
  scripts.push('internal-search');

  // tmp: cookie busting script to make sure people get rid of GA cookie
  scripts.push('cookie-buster');

  content = wrap(pathPrefix, content, helmet, {
    matomoDomain: options.matomoDomain,
    matomoSiteId: options.matomoSiteId,
    rssFeeds: options.rssFeeds,
    livereloadUrl: options.livereloadUrl,
    scripts
  });

  return content;
};
