const cheerio = require('cheerio');
const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();

const TITLE = /^H[123456]$/;
const POINTLESS_P = /<p><br><\/p>/g;
const RAW_IFRAME = /<iframe.+src="([^"]*)"[^>]*>[^<]*<\/iframe>/g;

function getImageOrientation(width, height) {
  if (!width || !height) return 'paysage';

  // TODO: What about squares?
  // TODO: keep with and height to help with browser rendering
  return width >= height ? 'paysage' : 'portrait';
}

function getImageClassName(format, width, height, even) {
  if (!format || format === 'vignette-inline') {
    const orientation = getImageOrientation(width, height);

    return `vignette-inline-${orientation}`;
  }

  if (
    format === 'vignette-block' ||
    format === 'illustration' ||
    format === 'figure-logo'
  )
    return format;

  if (format === 'serie') return even ? 'serie-pair' : 'serie-impair';

  throw new Error('Unkown image format: ' + format);
}

const BR_REGEX = /<\/?\s*br>/g;

function formatCreditAlt(credit) {
  return credit.replace(BR_REGEX, ' ');
}

function templateCreditsCaption(credits, clickableCreditsUrl) {
  if (!credits) return '';

  if (clickableCreditsUrl) {
    credits = `<a target="_blank" rel="noopener noreferrer" href="${clickableCreditsUrl}">${credits}</a>`;
  }

  return `<figcaption>${credits}</figcaption>`;
}

// TODO: iframe allowfullscreen & frameborder

function processHtml(pathPrefix, html) {
  const withPrefix = asset => `${pathPrefix}/static/${asset}`;

  const $ = cheerio.load(html.replace(POINTLESS_P, ''), {
    decodeEntities: false
  });

  // Processing internal links
  $('a[data-internal=true]').each(function () {
    const $a = $(this);

    $a.removeAttr('data-internal');

    const href = $a.attr('href');

    $a.attr('href', withPrefix(href));
  });

  $('a').each(function () {
    const $a = $(this);

    $a.attr('target', '_blank');
    $a.attr('rel', 'noopener noreferrer');
  });

  // Finding highest title
  const h2level = $('h1').length ? 4 : 3;

  const titleMap = {
    h1: 3,
    h2: h2level,
    h3: $('h2').length ? h2level + 1 : $('h1').length ? 4 : 3
  };

  const onlyOneTitleLevel =
    !!$('h1').length + !!$('h2').length + !!$('h3').length === 1;

  // Building custom output
  let output = '';
  let inRawText = false;
  let evenImage = true;
  let previousImageIndex = 0;

  $('body')
    .contents()
    .each(function (i) {
      // Raw text
      if (this.type === 'text') {
        if (!inRawText) {
          inRawText = true;
          output += '<p>';
        }

        output += this.data;
        return;
      }

      if (this.type !== 'tag') return;

      const $this = $(this);
      const tag = $this.prop('tagName');

      // Root links
      if (tag === 'A') {
        output += `<a href="${$this.attr(
          'href'
        )}" target="_blank" rel="noopener noreferrer">${$this.text()}</a>`;
        return;
      } else if (inRawText) {
        inRawText = false;
        output += '</p>';
      }

      // Paragraphs
      if (tag === 'P') {
        output += `<p>${$this.html()}</p>`;
      }

      // Blockquotes
      else if (tag === 'BLOCKQUOTE') {
        output += `<blockquote>${$this.html()}</blockquote>`;
      }

      // Titles
      else if (TITLE.test(tag)) {
        const h = tag.toLowerCase();

        const level = titleMap[h];

        output += `<h${level} data-style-level="${
          onlyOneTitleLevel ? 2 : level - 2
        }">${$this.html()}</h${level}>`;
      }

      // Lists
      else if (tag === 'UL') {
        output += `<ul>${$this.html()}</ul>`;
      } else if (tag === 'OL') {
        output += `<ol>${$this.html()}</ol>`;
      }

      // Raw blocks
      else if (tag === 'PRE') {
        let injection = entities.decode($this.text().replace(/^\s+/g, ''));

        injection = injection.replace(
          RAW_IFRAME,
          '$&<p class="print"><span>Iframe</span> $1</p>'
        );

        output += injection;
      }

      // Atomics
      else if (tag === 'FIGURE') {
        // Images
        if ($this.has('img').length) {
          const $img = $this.find('img');

          const src = $img.attr('src');
          const width = $img.data('width');
          const height = $img.data('height');
          const format = $img.data('format');
          const credits = $img.data('credits') || '';
          const clickableCreditsUrl = $img.data('clickable-credits-url');
          const clickableImageUrl = $img.data('clickable-image-url');

          if (previousImageIndex !== i - 1) {
            evenImage = true;
          }

          const className = getImageClassName(format, width, height, evenImage);

          evenImage = !evenImage;
          previousImageIndex = i;

          let imgTag = `<img src="${withPrefix(src)}" alt="${formatCreditAlt(
            credits
          )}"/>`;

          if (
            format === 'vignette-block' ||
            format === 'vignette-inline-paysage' ||
            format === 'vignette-inline-portrait' ||
            format === 'vignette-inline' ||
            format === 'serie' ||
            format === 'serie-impair' ||
            format === 'serie-pair'
          ) {
            output += `
            <div class="vignette container_${format}">
              <input type="checkbox" id="focus-figure-${i}" name="focus-figure" hidden />
              <label for="focus-figure-${i}" title="" arial-label=""></label>
              <figure class="${className}">
                ${imgTag}${templateCreditsCaption(credits, clickableCreditsUrl)}
              </figure>
            </div>
          `.trim();
          } else {
            // NOTE: clickable image only applies if it does not open a focused view for now
            if (clickableImageUrl) {
              imgTag = `<a target="_blank" rel="noopener noreferrer" href="${clickableImageUrl}">${imgTag}</a>`;
            }

            output += `
            <figure class="${className}">
              ${imgTag}${templateCreditsCaption(credits, clickableCreditsUrl)}
            </figure>
          `.trim();
          }
        }

        // Iframes
        else {
          const $iframe = $this.find('iframe');
          const internal = !!$iframe.data('internal');

          let src = $iframe.attr('src');

          if (internal) src = withPrefix(src);

          output += `<iframe allowfullscreen src="${src}"></iframe><p class="print"><span>Iframe</span> ${src}</p>`;
        }
      }
    });

  if (inRawText) output += '</p>';

  return output.trim();
}

exports.template = function template(pathPrefix, content) {
  let fr, en;

  if (content && content.fr) fr = processHtml(pathPrefix, content.fr);

  if (content && content.en) en = processHtml(pathPrefix, content.en);

  return {
    fr: fr ? fr : '',
    en: en ? en : ''
  };
};

exports.resolveAttachments = function resolveAttachments(
  pathPrefix,
  attachments
) {
  return attachments.map(a => {
    if (a.type === 'attachment')
      return {
        ...a,
        value: `${pathPrefix}/static/${a.value}`
      };

    return a;
  });
};

// exports.resolveCover = function resolveCover(pathPrefix, item) {
//   if (!item.cover)
//     return null;

//   const ext = path.extname(cover.file),
//         name = path.basename(cover.file, ext);

//   const output = `${name}.cover${ext}`;
//   const socialOutput = `${name}.social.png`;

//   const coverImage = {
//     url: `${pathPrefix}/static/${output}`
//   };
// };

// raster width / height / social // drop w/h because they are all the same?

// Testing
// if (require.main === module) {
//   console.log(processHtml('', '<h1>Test1</h1>'));
//   console.log(processHtml('', '<h1>Test1</h1><h2>Test2</h2>'));
//   console.log(processHtml('', '<h1>Test1</h1><h2>Test2</h2><h3>Test3</h3>'));
//   console.log(processHtml('', '<h2>Test1</h2><h3>Test2</h3>'));
//   console.log(processHtml('', '<h1>Test1</h1><h3>Test2</h3>'));
//   console.log(processHtml('', '<h2>Test1</h2>'));
//   console.log(processHtml('', '<h3>Test1</h3>'));
// }
