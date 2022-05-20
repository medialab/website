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

exports.forgeAPIUrlForDoc = function forgeAPIUrlForDoc(halId) {
  return `https://api.archives-ouvertes.fr/search/index/?q=halId_s:${halId}&wt=json&fl=*&rows=1&start=0`;
};

function readFalsePlural(value) {
  if (!value) return;
  if (Array.isArray(value)) {
    if (!value.length) return;
    return value[0];
  }
  return value;
}

const FALSE_PLURAL_FIELDS = [
  'title_s',
  'subtitle_s',
  'abstract_s',
  'description_s',
  'en_title_s',
  'en_subTitle_s',
  'en_abstract_s',
  'en_description_s',
  'fr_title_s',
  'fr_subTitle_s',
  'fr_abstract_s',
  'fr_description_s'
];

exports.reformatHALDoc = function reformatHALDoc(doc) {
  const reformatted = Object.assign({}, doc);

  FALSE_PLURAL_FIELDS.forEach(f => {
    if (f in doc) {
      const clean = readFalsePlural(doc[f]);

      if (!clean) {
        delete reformatted[f];
      } else {
        reformatted[f] = clean;
      }
    }
  });

  return reformatted;
};
