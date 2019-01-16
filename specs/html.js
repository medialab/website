const cheerio = require('cheerio');
const path = require('path');
const uuid = require('uuid/v4');
//const pretty = require('pretty');
const fs = require('fs-extra');
const url = require('url');
const _ = require('lodash');

// NOTE: we don't handle old internal links

const MISSING_DIMENSIONS = {
  '/wp-content/uploads/2015/04/ScientometricsLandscapeSmall.png': {
    width: 690,
    height: 200
  },
  '/wp-content/uploads/2017/05/code-lawfactory.png': {
    width: 654,
    height: 386
  },
  '/wp-content/uploads/2012/07/medialab_afp_2007_533.jpg': {
    width: 533,
    height: 412
  },
  '/wp-content/uploads/2018/05/steps-1.png': {
    width: 1020,
    height: 659
  },
  '/wp-content/uploads/2018/05/urgence.png': {
    width: 1082,
    height: 621
  },
  '/wp-content/uploads/2019/01/IMG_20180627_162450.jpg': {
    width: 3264,
    height: 2448
  },
  '/wp-content/uploads/2019/01/Scan-tableau.png': {
    width: 1200,
    height: 606
  },
  '/wp-content/uploads/2019/01/duralex.png': {
    width: 1320,
    height: 854
  },
  '/wp-content/uploads/2019/01/durafront.png': {
    width: 885,
    height: 452
  },
  '/wp-content/uploads/2019/01/matrices-didascalies.png': {
    width: 850,
    height: 850
  },
  '/wp-content/uploads/2019/01/scrutins-an-senat.png': {
    width: 1416,
    height: 608
  },
  '/wp-content/uploads/2019/01/procedure.png': {
    width: 838,
    height: 2808
  },
  '/wp-content/uploads/2019/01/gitlaw.png': {
    width: 997,
    height: 744
  },
  '/wp-content/uploads/2019/01/codes-lfdll.png': {
    width: 599,
    height: 283
  },
  '/wp-content/uploads/2012/08/EMAPSworkshop_pic.jpg': {
    width: 1280,
    height: 956
  }
};

const INLINE_TAGS = new Set([
  'a',
  'em',
  'i',
  'strong',
  'b',
  'u',
  'span',
  'sup'
]);

const INTERNAL_URL_REGEX = /sciences-?po.fr\/wp-content\/uploads\//;

function isInternal(url) {
  return INTERNAL_URL_REGEX.test(url);
}

const buildUrl = _.memoize((current) => {
  if (!isInternal(current))
    return {newPath: current, oldPath: current};

  const id = uuid();

  const ext = path.extname(current);
  const name = path.basename(current, ext);
  const oldPath = url.parse(current).path;
  return {
    newPath: `${name}_${id}${ext}`,
    oldPath
  };
});

function validateHtml(html) {
  const $ = cheerio.load(html, {decodeEntities: false});

  if ($('ul ul, ul ol, ol ol, ol ul').length > 1)
    throw new Error('Found nested list!');

  if ($('div').length)
    throw new Error('Found div tag!');

  $('img').each(function() {
    if ($(this).data('width') === 'undefined')
      console.error('Error: missing image width!', $(this).parent().html().trim());

    else if ($(this).data('height') === 'undefined')
      console.error('Error: missing image height!', $(this).parent().html().trim())
  });
}

function convertWordpressHtml(wordpressHtml) {
  let html = wordpressHtml;

  const assets = [];

  let $ = cheerio.load(html.trim(), {decodeEntities: false});

  // Unwrapping divs
  $('div')
    .filter(function() {
      return $(this).find('div').length === 0;
    })
    .each(function() {
      $(this).replaceWith(`<p>${$(this).html()}</p>`);
    });

  while ($('body > div').length) {
    $('body > div').each(function() {
      $(this).replaceWith($(this).html());
    });
  }

  // Dropping comments
  $('body')
    .contents()
    .filter(function() {
      return this.type === 'comment';
    })
    .remove();

  // Root-level text nodes
  let open = false;
  let newBody = '';

  $('body > span').each(function() {
    $(this).replaceWith(`<p>${$(this).html()}</p>`);
  });

  $('body').contents().each(function() {
    if (this.type === 'text') {

      if (!this.data.trim())
        return;

      if (!open)
        newBody += '<p>';

      open = true;
      newBody += this.data.replace(/([^\n\s<])\n(?=[^\n\s>])/g, '$1<br>');
    }
    else if (INLINE_TAGS.has(this.name)) {
      if (!open)
        newBody += '<p>';

      open = true;
      newBody += $.html($(this));
    }
    else {
      if (open)
        newBody += '</p>';

      open = false;

      newBody += $.html($(this));
    }
  });

  if (open)
    newBody += '</p>';

  newBody = newBody
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/<([ip])>\s*<\/\1>/g, '')
    .replace(/\n/g, '');

  $ = cheerio.load(newBody, {decodeEntities: false});

  // Dropping attributes
  $('*').each(function() {
    $(this)
      .removeAttr('id')
      .removeAttr('style')
      .removeAttr('class')
      .removeAttr('name');
  });

  $('p').each(function() {
    $(this)
      .removeAttr('align')
      .removeAttr('lang');
  });

  $('a').each(function() {
    $(this)
      .removeAttr('rel')
      .removeAttr('target')
      .removeAttr('title')
      .removeAttr('data-saferedirecturl');

    const href = $(this).attr('href');

    const resolved = buildUrl(href);

    if (isInternal(href)) {
      $(this).attr('data-internal', 'true');

      assets.push(resolved);
    }

    $(this).attr('href', resolved.newPath);
  });

  // Images
  $('img').each(function() {
    const src = $(this).attr('src');

    let width = $(this).attr('width'),
        height = $(this).attr('height');

    if (!src) {
      $(this).replaceWith('');
      return;
    }

    const resolved = buildUrl(src);

    if (resolved.oldPath in MISSING_DIMENSIONS) {
      const dimensions = MISSING_DIMENSIONS[resolved.oldPath];
      width = dimensions.width;
      height = dimensions.height;
    }

    assets.push(resolved);

    // if (resolved.newPath === resolved.oldPath)
    //   console.log('ICI', resolved.newPath);

    $(this).replaceWith(`
      <figure>
        <img src="${resolved.newPath}" data-width="${width}" data-height="${height}" />
      </figure>
    `);
  });

  // Fixing old-school tags
  $('i').each(function() {
    $(this).replaceWith(`<em>${$(this).html()}</em>`);
  });

  while ($('b').length)
    $('b').each(function() {
      $(this).replaceWith(`<strong>${$(this).html()}</strong>`);
    });

  // Dropping messy cases
  $('div.issuuembed').remove();
  $('object').remove();

  // Dropping hrs and wbr
  $('hr, wbr').remove();

  // Dropping weak titles
  $('h4, h5, h6').each(function() {
    $(this).replaceWith(`<p><strong>${$(this).html()}</strong></p>`);
  });

  // Handling iframes
  $('iframe').each(function() {
    const src = $(this).attr('src');

    $(this).replaceWith(`
      <figure>
        <iframe src="${src}">&nbsp;</iframe>
      </figure>
    `);
  });

  $('blockquote').each(function() {
    $(this).replaceWith(`<p>${$(this).html()}</p>`);
  });

  $('small').each(function() {
    $(this).replaceWith($(this).text());
  });

  // Dropping some irrelevant links
  $('a').each(function() {
    const href = $(this).attr('href').trim();

    if (!href || href.startsWith('#'))
      $(this).replaceWith($(this).html());
  });

  // Unwrapping some tags
  const unwrap = 'span, u, center, sup';

  while ($(unwrap).length) {
    $(unwrap).each(function() {
      $(this).replaceWith($(this).html());
    });
  }

  $('p').each(function() {
    if (!$(this).html().trim())
      $(this).remove();
  });

  html = $('body').html().trim();

  // Merging inline
  html = html.replace(/<\/(strong|em)>(\s*)<\1>/g, '$2');

  // Light validation
  validateHtml(html);

  // Finally we use the editor's serialization scheme to destroy anything bad
  // html = utils.rawToHtml(utils.htmlToRaw(html));

  // console.log('\nORIGINAL');
  // console.log('=====');
  // console.log(pretty(wordpressHtml));
  // console.log('=====');

  // console.log('\nPROCESSED');
  // console.log('=====');
  // console.log(pretty(html));
  // console.log(assets);
  // console.log('=====');

  return {assets, html};
}

exports.convertWordpressHtml = convertWordpressHtml;

// Testing on fresh dump
// if (require.main) {

//   const DUMP_PATH = './data/dump';

//   const activities = fs.readJSONSync(path.join(DUMP_PATH, 'activities.json'));
//   const news = fs.readJSONSync(path.join(DUMP_PATH, 'news.json'));
//   const people = fs.readJSONSync(path.join(DUMP_PATH, 'people.json'));
//   const productions = fs.readJSONSync(path.join(DUMP_PATH, 'productions.json'));

//   activities.activities.forEach(activity => {
//     if (!activity.content)
//       return;

//     if (activity.content.en)
//       convertWordpressHtml(activity.content.en);
//     if (activity.content.fr)
//       convertWordpressHtml(activity.content.fr);
//   });

//   news.news.forEach(n => {
//     if (!n.content)
//       return;

//     if (n.content.en)
//       convertWordpressHtml(n.content.en);
//     if (n.content.fr)
//       convertWordpressHtml(n.content.fr);
//   });

//   people.people.forEach(person => {
//     if (!person.bio)
//       return;

//     if (person.bio.en)
//       convertWordpressHtml(person.bio.en);
//     if (person.bio.fr)
//       convertWordpressHtml(person.bio.fr);
//   });

//   productions.productions.forEach(production => {
//     if (!production.content)
//       return;

//     if (production.content.en)
//       convertWordpressHtml(production.content.en);
//     if (production.content.fr)
//       convertWordpressHtml(production.content.fr);
//   });
// }
