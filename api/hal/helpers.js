const cheerio = require('cheerio');

exports.extractMetadataFromXml = function extractMetadataFromXml(xml) {
  const $ = cheerio.load(xml, {xml: true});

  const $halTypology = $('classCode[scheme=halTypology]');

  const meta = {
    typologyLabel: $halTypology.length ? $halTypology.text().trim() : null,
    typologyCode: $halTypology.length ? $halTypology.attr('n').trim() : null
  };

  return meta;
};
