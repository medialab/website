const cheerio = require('cheerio');
const path = require('path');
const uuid = require('uuid/v4');
const fs = require('fs-extra');

// TODO: internal links

const ALLOWED_TAGS = new Set([
  'h1',
  'h2',
  'h3'
]);

const INLINE_TAGS = new Set([
  'a',
  'em',
  'i',
  'strong',
  'b'
]);

function isInternal(url) {
  return url.includes('sciences-po.fr/wp-content/uploads/');
}

function buildUrl(current) {
  if (!isInternal(current))
    return current;

  const id = uuid();

  const ext = path.extname(current);
  const name = path.basename(current, ext);

  return `${name}_${id}${ext}`;
}

function convertWordpressHtml(html) {
  const $ = cheerio.load(html, {decodeEntities: false});

  // Root-level text nodes
  $('body').contents().filter(function() {
    if (this.type === 'text')
      $(this).replaceWith(`\n<p>${this.data.trim()}</p>\n`);
  });

  // Dropping attributes
  $('p').each(function() {
    $(this)
      .removeAttr('align')
      .removeAttr('lang');
  });

  $('a').each(function() {
    $(this)
      .removeAttr('rel')
      .removeAttr('target')
      .removeAttr('title');

    const href = $(this).attr('href');

    const resolvedHref = buildUrl(href);

    if (isInternal(href))
      $(this).attr('data-internal', 'true');

    $(this).attr('href', resolvedHref);
  });

  // Images
  $('img').each(function() {
    const src = $(this).attr('src'),
          width = $(this).attr('width'),
          height = $(this).attr('height');

    const resolvedSrc = buildUrl(src);

    $(this).replaceWith(`
      <figure>
        <img src="${resolvedSrc}" data-width="${width}" data-height="${height}" />
      </figure>
    `);
  });

  html = $('body').html().trim();

  console.log('=====');
  console.log(html);
  console.log('=====');

  return html;
};

exports.convertWordpressHtml = convertWordpressHtml;

// Testing on fresh dump
if (require.main) {

  const DUMP_PATH = './data/dump';

  const path = require('path');

  const activities = fs.readJSONSync(path.join(DUMP_PATH, 'activities.json'));
  const news = fs.readJSONSync(path.join(DUMP_PATH, 'news.json'));
  const people = fs.readJSONSync(path.join(DUMP_PATH, 'people.json'));
  const productions = fs.readJSONSync(path.join(DUMP_PATH, 'productions.json'));

  activities.activities.forEach(activity => {
    if (!activity.content)
      return;

    if (activity.content.en)
      convertWordpressHtml(activity.content.en);
    if (activity.content.fr)
      convertWordpressHtml(activity.content.fr);
  });

  news.news.forEach(n => {
    if (!n.content)
      return;

    if (n.content.en)
      convertWordpressHtml(n.content.en);
    if (n.content.fr)
      convertWordpressHtml(n.content.fr);
  });

  people.people.forEach(person => {
    if (!person.bio)
      return;

    if (person.bio.en)
      convertWordpressHtml(person.bio.en);
    if (person.bio.fr)
      convertWordpressHtml(person.bio.fr);
  });

  productions.productions.forEach(production => {
    if (!production.content)
      return;

    if (production.content.en)
      convertWordpressHtml(production.content.en);
    if (production.content.fr)
      convertWordpressHtml(production.content.fr);
  });
}
