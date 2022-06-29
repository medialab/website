const _ = require('lodash');
const uuid = require('uuid/v4');
const slugLib = require('slug');
const powerSet = require('obliterator/power-set');
const take = require('obliterator/take');
const map = require('obliterator/map');
const createFingerprint = require('talisman/keyers/fingerprint').createKeyer;
const cleanReference = require('../utils').cleanReference;

const makeSlugFunctions = require('../../specs/slugs');
const halDocTypeToLabel = require('../../specs/halProductionsTypes.json');

const HALClient = require('./client');
const helpers = require('./helpers');

const {production: slugifyProduction} = makeSlugFunctions(slugLib);

function multiMatch(keys, index) {
  let match = undefined;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    match = index[key];

    if (match) {
      return match;
    }
  }
}

function isValidDoc(doc) {
  return doc.docType_s !== 'PATENTS';
}

function fingerprintName(name) {
  return _.deburr(
    name
      .toLowerCase()
      .replace(/(?:\b(?:de|la|le)\b|[’'.])/g, '')
      .replace(/-/g, ' ')
      .split(' ')
      .sort()
      .join(' ')
      .trim()
  );
}

function abbreviateName(tokens, ellisionChar = '.') {
  return tokens.map(t => t[0] + ellisionChar);
}

function authorFuzzyKeys(author) {
  const firstNameFingerprint = fingerprintName(author.firstName).split(' ');
  const lastNameFingerprint = fingerprintName(author.lastName).split(' ');

  const firstNamePowerSet = take(
    map(set => set.slice(), powerSet(firstNameFingerprint))
  ).filter(set => set.length);
  const lastNamePowerSet = take(
    map(set => set.slice(), powerSet(lastNameFingerprint))
  ).filter(set => set.length);

  const candidates = new Set();

  for (let i = 0; i < firstNamePowerSet.length; i++) {
    for (let j = 0; j < lastNamePowerSet.length; j++) {
      candidates.add(
        firstNamePowerSet[i].join(' ') + '§' + lastNamePowerSet[j].join(' ')
      );
      candidates.add(
        abbreviateName(firstNamePowerSet[i]).join(' ') +
          '§' +
          lastNamePowerSet[j].join(' ')
      );
      candidates.add(
        abbreviateName(firstNamePowerSet[i], '').join(' ') +
          '§' +
          lastNamePowerSet[j].join(' ')
      );
    }
  }

  return Array.from(candidates);
}

const fingerprintProductionName = createFingerprint({
  split: ['’', "'", '-', '.']
});

const HYPHEN_SPLITTER = /[\-—]/g;

function productionTitleFuzzyKeys(production) {
  const keys = [];
  let s;

  let enTitle = production.title ? production.title.en : undefined;

  if (!enTitle && production.spire)
    enTitle = production.spire.generatedFields.title.en;

  let frTitle = production.title ? production.title.fr : undefined;

  if (!frTitle && production.spire)
    frTitle = production.spire.generatedFields.title.fr;

  if (enTitle) {
    s = enTitle.split(HYPHEN_SPLITTER);

    if (s.length > 1) {
      keys.push(fingerprintProductionName(s[0]));
    }

    keys.push(fingerprintProductionName(enTitle));
  }

  if (frTitle) {
    s = frTitle.split(HYPHEN_SPLITTER);

    if (s.length > 1) {
      keys.push(fingerprintProductionName(s[0]));
    }

    keys.push(fingerprintProductionName(frTitle));
  }

  return keys;
}

function restructureAuthors(doc) {
  if (doc.authFirstName_s.length !== doc.authLastName_s.length)
    throw new Error(
      `Invalid HAL document having no irregular authors: ${helpers.forgeAPIUrlForDoc(
        doc.halId_s
      )}`
    );

  return doc.authFirstName_s.map((firstName, i) => {
    return {
      firstName,
      lastName: doc.authLastName_s[i]
    };
  });
}

function getMainLang(doc) {
  let mainLang = doc.language_s[0];

  // If we don't have English nor French, we fallback to weird English
  if (mainLang !== 'en' && mainLang !== 'fr') mainLang = 'en';

  return mainLang;
}

function extractTitle(doc) {
  let mainLang = getMainLang(doc);

  const englishTitle =
    mainLang === 'en' ? doc.title_s || doc.en_title_s : doc.en_title_s;
  const englishSubtitle =
    mainLang === 'en' ? doc.subtitle_s || doc.en_subtitle_s : doc.en_subtitle_s;

  const frenchTitle =
    mainLang === 'fr' ? doc.title_s || doc.fr_title_s : doc.fr_title_s;
  const frenchSubtitle =
    mainLang === 'fr' ? doc.subtitle_s || doc.fr_subtitle_s : doc.fr_subtitle_s;

  const result = {};

  if (englishTitle) {
    result.en = englishTitle;

    if (englishSubtitle) result.en += ' — ' + englishSubtitle;
  }

  if (frenchTitle) {
    result.fr = frenchTitle;

    if (frenchSubtitle) result.fr += ' — ' + frenchSubtitle;
  }

  if (!result.en && !result.fr) {
    throw new Error(
      `Invalid HAL document having no relevant title information: ${helpers.forgeAPIUrlForDoc(
        doc.halId_s
      )}`
    );
  }

  return result;
}

function extractContent(doc) {
  let mainLang = getMainLang(doc);

  const englishAbstract =
    mainLang === 'en' ? doc.abstract_s || doc.en_abstract_s : doc.en_abstract_s;
  const englishDescription =
    mainLang === 'en'
      ? doc.description_s || doc.en_description_s
      : doc.en_description_s;

  const frenchAbstract =
    mainLang === 'fr' ? doc.abstract_s || doc.fr_abstract_s : doc.fr_abstract_s;
  const frenchDescription =
    mainLang === 'fr'
      ? doc.description_s || doc.fr_description_s
      : doc.fr_description_s;

  const result = {en: '', fr: ''};

  // NOTE: asbtract and description are sometimes the same and sometimes include each
  // other. The rationale here is to keep the longer text and pray...
  if (englishAbstract) result.en = englishAbstract;
  if (englishDescription && englishDescription.length > result.en)
    result.en = englishDescription;

  if (!result.en) delete result.en;

  if (frenchAbstract) result.fr = frenchAbstract;
  if (frenchDescription && frenchDescription.length > result.fr)
    result.fr = frenchDescription;

  if (!result.fr) delete result.fr;

  if (!result.en && !result.fr) return;

  return result;
}

// We chose date using this precedence:
const DATE_PRECEDENCE = [
  'publicationDate_s',
  'releasedDate_s',
  'producedDate_s',
  'writingDate_s',
  'defenseDate_s',
  'conferenceStartDate_s',
  'conferenceEndDate_s',
  'ePublicationDate_s',
  'submittedDate_s',
  'modifiedDate_s'
];

function extractDate(doc) {
  let date = undefined;

  for (let i = 0; i < DATE_PRECEDENCE.length; i++) {
    date = doc[DATE_PRECEDENCE[i]];

    if (date) break;
  }

  if (!date)
    throw new Error(
      `Invalid HAL document having no relevant date information: ${helpers.forgeAPIUrlForDoc(
        doc.halId_s
      )}`
    );

  return date.slice(0, 10);
}

function extractRef(doc) {
  return (
    cleanReference(doc.citationFull_s.split(/<a\s*(?:target|href)=/)[0]) +
    ' ' +
    doc.uri_s
  ).trim();
}

const WEBSITE_PATTERN = /(?:contribution (?:à un|au) )?site web/i;

function extractType(doc) {
  let type = halDocTypeToLabel[doc.docType_s] || 'article';

  // Website type is quite elusive
  if (doc.docType_s === 'OTHER' && WEBSITE_PATTERN.test(doc.description_s)) {
    type = 'website';
  }

  return type;
}

function translateDocument(doc, authors) {
  // docType_s: https://api.archives-ouvertes.fr/search/?q=*%3A*&rows=0&wt=xml&indent=true&facet=true&facet.field=docType_s

  const mainLang = getMainLang(doc);
  const date = extractDate(doc);
  const ref = extractRef(doc);

  const translated = {
    url: doc.uri_s,
    type: extractType(doc),
    title: extractTitle(doc),
    date,
    ref,
    authors: authors
      .map(author => `${author.firstName} ${author.lastName}`)
      .join(', ')
  };

  if (date < '2009') translated.external = true;

  const content = extractContent(doc);

  if (content) translated.content = content;

  const description = {};

  if (mainLang === 'fr') {
    description.fr = ref;
  } else {
    description.en = ref;
  }

  translated.description = description;

  return translated;
}

function findSlugForNewProduction(existingSlugs, generatedFields) {
  let increment = 1;
  let slug;

  do {
    slug =
      slugifyProduction(generatedFields) +
      (increment === 1 ? '' : `-${increment}`);
    increment++;
  } while (existingSlugs.has(slug));

  return slug;
}

exports.syncHAL = function syncHAL(
  dbs,
  doneCallback,
  emitCallback = console.debug
) {
  // Reading existing data
  emitCallback('Reading current people & productions');

  dbs.people.read();
  dbs.productions.read();

  const peopleState = dbs.people.getState();
  const productionState = dbs.productions.getState();

  const peopleData = peopleState.people;
  const productionData = productionState.productions;

  const productionsBySpireId = _.keyBy(
    productionData.filter(p => p.spire),
    p => p.spire.id
  );

  const productionsByHALId = _.keyBy(
    productionData.filter(p => p.hal),
    p => p.hal.id
  );

  const existingSlugs = new Set();

  productionData.forEach(p => {
    p.slugs.forEach(s => existingSlugs.add(s));
  });

  const peopleByFuzzyKey = {};

  peopleData.forEach(people => {
    const keys = authorFuzzyKeys(people);

    keys.forEach(k => {
      peopleByFuzzyKey[k] = people;
    });
  });

  const productionByFuzzyKey = {};

  productionData.forEach(p => {
    const keys = productionTitleFuzzyKeys(p);

    keys.forEach(k => {
      // Avoiding titles too short to prevent false negatives
      if (k.length < 5) return;

      productionByFuzzyKey[k] = p;
    });
  });

  const client = new HALClient();

  let seen = 0;
  let halMatches = 0;
  let spireMatches = 0;
  let fuzzyMatches = 0;
  let newProductions = 0;

  emitCallback('Starting to fetch documents from HAL attached to the lab');

  client.searchMedialabDocs(
    originalDoc => {
      seen++;

      if (seen % 100 === 0) emitCallback(`Processed ${seen} HAL documents`);

      const doc = helpers.reformatHALDoc(originalDoc);

      if (!isValidDoc(doc)) return;

      // Matching with spire id, then hal
      let productionMatch = undefined;
      let production;

      const spireId = doc.sciencespoId_s;
      const halId = doc.halId_s;

      const authors = restructureAuthors(doc);

      const halAddendum = {
        id: halId,
        lastUpdated: Date.now(),
        meta: originalDoc, // TODO: mask, to avoid keeping too much cruft
        generatedFields: translateDocument(doc, authors)
      };

      let relatedPeople = [];

      authors.forEach(author => {
        const authorMatch = multiMatch(
          authorFuzzyKeys(author),
          peopleByFuzzyKey
        );

        if (authorMatch) {
          // TODO: maybe keep a HAL id for later?
          relatedPeople.push(authorMatch.id);
        }
      });

      // Issue #551: deduplicating authors
      relatedPeople = Array.from(new Set(relatedPeople));

      // TODO: if related people is empty we should probably skip the doc?
      halAddendum.generatedFields.people = relatedPeople;

      // NOTE: we match by HAL, then by Spire, then by fuzzy matching
      if (halId) {
        productionMatch = productionsByHALId[halId];

        if (productionMatch) halMatches++;
      }

      if (!productionMatch && spireId) {
        productionMatch = productionsBySpireId[spireId];

        if (productionMatch) spireMatches++;
      }

      if (!productionMatch) {
        productionMatch = multiMatch(
          productionTitleFuzzyKeys(halAddendum.generatedFields),
          productionByFuzzyKey
        );

        if (productionMatch) {
          fuzzyMatches++;
          halAddendum.fuzzyMatch = true;
          emitCallback(
            `Fuzzy match:\n  - "${(
              productionMatch.ref ||
              (productionMatch.spire
                ? productionMatch.spire.generatedFields.ref
                : productionMatch.title.en || productionMatch.title.fr)
            ).trim()}"\n  - "${halAddendum.generatedFields.ref}"\n`
          );
        }
      }

      // Here the production already exist, we only update it
      if (productionMatch) {
        productionMatch.hal = halAddendum;
      }

      // Here the production does not yet exist, we create it from scratch
      else {
        newProductions++;

        const slug = findSlugForNewProduction(
          existingSlugs,
          halAddendum.generatedFields
        );

        existingSlugs.add(slug);

        production = {
          id: uuid(),
          slugs: [slug],
          draft: true,
          lastUpdated: Date.now(),
          hal: halAddendum
        };

        productionData.push(production);
      }
    },
    err => {
      if (err) return doneCallback(err);

      emitCallback(`Finished synchronizing ${seen} HAL documents`);
      emitCallback(`Matched ${halMatches} through a hal id`);
      emitCallback(`Matched ${spireMatches} through a spire id`);
      emitCallback(`Matched ${fuzzyMatches} through fuzzy matching`);
      emitCallback(`Created ${newProductions} new productions`);

      // Writing results to database
      dbs.people.setState(peopleState);
      dbs.productions.setState(productionState);

      dbs.people.write();
      dbs.productions.write();

      return doneCallback();
    }
  );
};
