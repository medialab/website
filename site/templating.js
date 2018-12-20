const cheerio = require('cheerio');
const Entities = require('html-entities').AllHtmlEntities;
const {union} = require('mnemonist/set');

const entities = new Entities();

const TITLE = /^H[123456]$/;

function processHtml(html) {
  const $ = cheerio.load(html, {
    decodeEntities: false
  });

  const assets = new Set();

  // Processing internal links
  $('a[data-internal=true]').each(function() {
    const $a = $(this);

    $a.removeAttr('data-internal');

    assets.add($a.attr('href'));
  });

  // Building custom output
  let output = '';

  $('body > *').each(function() {
    const $this = $(this);
    const tag = $this.prop('tagName');

    // Paragraphs
    if (tag === 'P') {
      output += `<p>${$this.html()}</p>`;
    }

    // Titles
    else if (TITLE.test(tag)) {
      const level = tag[tag.length - 1];

      output += `<h${level}>${$this.text()}</h${level}>`;
    }

    // Lists
    else if (tag === 'UL') {
      output += `<ul>${$this.html()}</ul>`;
    }
    else if (tag === 'OL') {
      output += `<ol>${$this.html()}</ol>`;
    }

    // Raw blocks
    else if (tag === 'PRE') {
      output += entities.decode($this.text().replace(/^\s+/g, ''));
    }

    // Atomics
    else if (tag === 'FIGURE') {

      // Images
      if ($this.has('img').length) {
        const $img = $this.find('img');

        const src = $img.attr('src');

        assets.add(src);

        output += `<img src="${src}" />`;
      }

      // Iframes
      else {
        const $iframe = $this.find('iframe');
        const internal = !!$iframe.data('internal');

        const src = $iframe.attr('src');

        if (internal)
          assets.add(src);

        output += `<iframe src="${src}"></iframe>`;
      }
    }
  });

  return {html: output, assets};
}

exports.template = function template(content) {
  let fr, en;

  if (content.fr)
    fr = processHtml(content.fr);

  if (content.en)
    en = processHtml(content.en);

  return {
    html: {
      fr: fr ? fr.html : '',
      en: en ? en.html : ''
    },
    assets: Array.from(union(fr ? fr.assets : new Set(), en ? en.assets : new Set()))
  };
};

exports.replaceAssetPaths = function replaceAssetPaths(index, assets, content) {
  const html = {...content};

  assets.forEach(asset => {
    html.fr = html.fr.replace(asset, index[asset].publicURL);
    html.en = html.en.replace(asset, index[asset].publicURL);
  });

  return html;
};
