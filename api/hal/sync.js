const _ = require('lodash');
const uuid = require('uuid/v4');
const slugLib = require('slug');
const makeSlugFunctions = require('../../specs/slugs');
const halDocTypeToLabel = require('../../specs/halDocTypeToLabel.json');

const HALClient = require('./client');
const helpers = require('./helpers');

const {production: slugifyProduction} = makeSlugFunctions(slugLib);

// TODO: make a decision
function isValidDoc(doc) {
  return doc.language_s.some(lang => {
    return lang === 'fr' || lang === 'en';
  });
}

function extractTitle(doc) {
  const mainLang = doc.language_s[0];

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

// We chose date using this precedence:
const DATE_PRECEDENCE = [
  'publicationDate_s',
  'submittedDate_s',
  'modifiedDate_s',
  'releasedDate_s',
  'producedDate_s'
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

function translateDocument(doc) {
  // docType_s: https://api.archives-ouvertes.fr/search/?q=*%3A*&rows=0&wt=xml&indent=true&facet=true&facet.field=docType_s

  return {
    url: doc.uri_s,
    type: halDocTypeToLabel[doc.docType_s] || 'article',
    title: extractTitle(doc),
    date: extractDate(doc)
  };
}

// TODO...
function resolveMedialabAuthors() {}

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

module.exports = function syncHAL(
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

  const client = new HALClient();

  let seen = 0;
  let spireMatches = 0;
  let halMatches = 0;
  let newProductions = 0;

  emitCallback('Starting to fetch documents from HAL attached to the lab');

  client.searchMedialabDocs(
    doc => {
      seen++;

      if (seen % 100 === 0) emitCallback(`Processed ${seen} HAL documents`);

      if (!isValidDoc(doc)) return;

      // Matching with spire id, then hal
      let match = undefined;
      let production;

      const spireId = doc.sciencespoId_s;
      const halId = doc.halId_s;

      if (spireId) {
        match = productionsBySpireId[spireId];

        if (match) spireMatches++;
      }

      if (!match && halId) {
        match = productionsByHALId[halId];

        if (match) halMatches++;
      }

      const halAddendum = {
        id: doc.halId_s,
        lastUpdated: Date.now(),
        meta: doc, // TODO: mask, to avoid keeping too much cruft
        generatedFields: translateDocument(doc)
      };

      // Here the production already exist, we only update it
      if (match) {
        match.hal = halAddendum;
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

      // TODO: don't forget to bump lastUpdated

      // TODO: update people, match by hal id then fuzzy with special cases (boogheta notably)

      // throw new Error('hammertime');
    },
    err => {
      if (err) return doneCallback(err);

      emitCallback(`Finished synchronizing ${seen} HAL documents`);
      emitCallback(`Matched ${spireMatches} through a spire id`);
      emitCallback(`Matched ${halMatches} through a hal id`);
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
