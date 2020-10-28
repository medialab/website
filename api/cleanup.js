/* eslint no-console: 0 */
const cheerio = require('cheerio');
const fs = require('fs');
const {difference} = require('mnemonist/set');

exports.findUnusedAssets = function (dbs, assetsPath) {
  const usedAssets = new Set();

  ['activities', 'news', 'people', 'productions'].forEach(model => {
    dbs[model].read();

    const data = dbs[model].getState()[model];

    data.forEach(item => {
      // NOTE: we must find assets
      //   1) Covers
      //   2) Attachments
      //   3) Rich content

      if (item.cover) {
        usedAssets.add(item.cover.file);
      }

      const attachments = item.contacts || item.attachments;

      if (attachments) {
        attachments.forEach(a => {
          if (a.type === 'attachment') usedAssets.add(a.value);
        });
      }

      const content = item.bio || item.content;

      if (!content) return;

      const html = `<div>${content.fr || ''}</div><div>${
        content.en || ''
      }</div>`;

      const $ = cheerio.load(html);

      $('a[data-internal=true]').each(function () {
        const href = $(this).attr('href');

        if (href) usedAssets.add(href);
      });

      $('img, iframe[data-internal=true]').each(function () {
        const src = $(this).attr('src');

        if (src) usedAssets.add(src);
      });
    });
  });

  const allAssets = new Set(fs.readdirSync(assetsPath));
  const unusedAssets = difference(allAssets, usedAssets);
  const missingAssets = difference(usedAssets, allAssets);

  if (missingAssets.size) console.warning('Missing assets!', missingAssets);

  return unusedAssets;
};
