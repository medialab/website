const cheerio = require('cheerio');
const path = require('path');
const uuid = require('uuid/v4');
const pretty = require('pretty');
const fs = require('fs-extra');

// TODO: internal links
// TODO: enable line breaks in editor
// TODO: strip \n from html generation?
// TODO: <p></p>, <center>, \n <br> \n+ <p>
// TODO: trim final &nbsp;
// TODO: drop underline
// TODO: drop <wbr> & <wbr />
// TODO: data-saferedirecturl
// TODO: drop spans
// TODO: <span style="font-weight: 400;">
// TODO: take the full image
// TODO: finish up the specs
// TODO: save some false p lists

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
  'b',
  'u',
  'span'
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
  console.log('\nORIGINAL');
  console.log('=====');
  console.log(pretty(html));
  console.log('=====');

  let $ = cheerio.load(html.trim(), {decodeEntities: false});

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
  $('p').each(function() {
    $(this)
      .removeAttr('align')
      .removeAttr('lang')
      .removeAttr('style');
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

  // Fixing old-school tags
  $('i').each(function() {
    $(this).replaceWith(`<em>${$(this).html()}</em>`);
  });

  $('b').each(function() {
    $(this).replaceWith(`<strong>${$(this).html()}</strong>`);
  });

  // Dropping some tags
  $('span').each(function() {
    $(this).replaceWith($(this).html());
  });

  html = $('body').html().trim();

  console.log('\nPROCESSED');
  console.log('=====');
  console.log(pretty(html));
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

  // people.people.forEach(person => {
  //   if (!person.bio)
  //     return;

  //   if (person.bio.en)
  //     convertWordpressHtml(person.bio.en);
  //   if (person.bio.fr)
  //     convertWordpressHtml(person.bio.fr);
  // });

  productions.productions.forEach(production => {
    if (!production.content)
      return;

    if (production.content.en)
      convertWordpressHtml(production.content.en);
    if (production.content.fr)
      convertWordpressHtml(production.content.fr);
  });
}
