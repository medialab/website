const cheerio = require('cheerio');
const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();

const TITLE = /^H[123456]$/;

exports.template = function template(assets, html) {
  const $ = cheerio.load(html, {
    decodeEntities: false
  });

  // Processing internal links
  $('a[data-internal=true]').each(function() {
    const $a = $(this);

    $a.removeAttr('data-internal');

    const href = assets[$a.attr('href')].publicURL;

    $a.attr('href', href);
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

        const src = assets[$img.attr('src')].publicURL;

        output += `<img src="${src}" />`;
      }

      // Iframes
      else {
        const $iframe = $this.find('iframe');
        const internal = !!$iframe.data('internal');

        let src = $iframe.attr('src');

        if (internal)
          src = assets[src].publicURL;

        output += `<iframe src="${src}"></iframe>`;
      }
    }
  });

  return output;
};
