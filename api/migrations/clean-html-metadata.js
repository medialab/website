const cheerio = require('cheerio');
const path = require('path');
const getImageSize = require('image-size');

const MODELS = ['activities', 'news', 'people', 'productions'];

const uuidv4 = /[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i;
const nbsp = /&nbsp;/g;
const reverseNbsp = /%%NBSP%%/g;
const badBr = /<br\s*\/>|<\/\s*br>/g;

function cleanupHtml(assetsPath, html) {
  const $ = cheerio.load(
    `<div id="main">${html.replace(nbsp, '%%NBSP%%')}</div>`,
    {
      normalizeWhitespace: true,
      xmlMode: true,
      decodeEntities: false
    }
  );

  // Finding missing data-internal=true & issues with urls
  $('[href], [src]:not(img)').each(function () {
    const src = $(this).attr('src');
    const href = $(this).attr('href');

    const originalUrl = src || href;
    let url = originalUrl.trim();

    if (
      !$(this).attr('data-internal') &&
      !url.startsWith('http:') &&
      !url.startsWith('https:') &&
      !url.startsWith('mailto:')
    ) {
      const internal = uuidv4.test(url);
      // console.log(internal ? '        ' : 'EXTERNAL', url);

      // Fixing data-internal
      if (internal) {
        $(this).attr('data-internal', true);
      }

      // Fixing urls lacking protocol
      else {
        url = 'http://' + url;
        $(this).attr(src ? 'src' : 'href', url);
      }
    }

    // Trimming
    else if (url !== originalUrl) {
      // console.log('TRIMMING', url);
      $(this).attr(src ? 'src' : 'href', url);
    }
  });

  // Finding images lacking dimensions
  $('img:not([width]), img:not([height])').each(function () {
    const url = $(this).attr('src');

    const dimensions = getImageSize(path.join(assetsPath, url));

    $(this).attr('data-width', dimensions.width);
    $(this).attr('data-height', dimensions.height);
  });

  // Putting img attributes back in order
  $('img').each(function () {
    const $img = $(this);
    const width = $img.attr('data-width');
    const height = $img.attr('data-height');
    const credits = $img.attr('data-credits');
    const format = $img.attr('data-format');
    const src = $img.attr('src');

    $img
      .removeAttr('src')
      .removeAttr('data-width')
      .removeAttr('data-height')
      .removeAttr('data-credits')
      .removeAttr('data-format');

    $img.attr('src', src);

    if (width) $img.attr('data-width', width);

    if (height) $img.attr('data-height', height);

    if (credits) $img.attr('data-credits', credits);

    if (format) $img.attr('data-format', format);
  });

  html = $('#main').html().replace(reverseNbsp, '&nbsp;');
  html = html.replace(badBr, '<br>');

  return html;
}

module.exports = assetsPath => {
  return function (req, dbs, next) {
    MODELS.forEach(model => {
      dbs[model].read();

      const data = dbs[model].getState();

      data[model].forEach(item => {
        const htmlRoot = model === 'people' ? item.bio : item.content;

        if (!htmlRoot) return;

        if (htmlRoot.en) htmlRoot.en = cleanupHtml(assetsPath, htmlRoot.en);

        if (htmlRoot.fr) htmlRoot.fr = cleanupHtml(assetsPath, htmlRoot.fr);
      });

      dbs[model].setState(data);
      dbs[model].write();
    });

    return next();
  };
};
