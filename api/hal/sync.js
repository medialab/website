const _ = require('lodash');
const uuid = require('uuid/v4');
const slugLib = require('slug');
const makeSlugFunctions = require('../../specs/slugs');
const halDocTypeToLabel = require('../../specs/halProductionsTypes.json');

const HALClient = require('./client');
const helpers = require('./helpers');

const {production: slugifyProduction} = makeSlugFunctions(slugLib);

// TODO: make a decision
function isValidDoc(doc) {
  return doc.language_s.some(lang => {
    return lang === 'fr' || lang === 'en';
  });
}

function restructureAuthors(doc) {
  if (
    doc.authFirstName_s.length !== doc.authLastName_s.length ||
    doc.authFirstName_s.length !== doc.authId_i.length
  )
    throw new Error(
      `Invalid HAL document having no irregular authors: ${helpers.forgeAPIUrlForDoc(
        doc.halId_s
      )}`
    );

  return doc.authFirstName_s.map((firstName, i) => {
    return {
      firstName,
      lastName: doc.authLastName_s[i],
      id: doc.authId_i[i]
    };
  });
}

function extractTitle(doc) {
  const mainLang = doc.language_s[0];

  const englishTitle =
    mainLang === 'en' ? doc.title_s || doc.en_title_s : doc.en_title_s;
  const englishDescription =
    mainLang === 'en' ? doc.subtitle_s || doc.en_subtitle_s : doc.en_subtitle_s;

  const frenchTitle =
    mainLang === 'fr' ? doc.title_s || doc.fr_title_s : doc.fr_title_s;
  const frenchSubtitle =
    mainLang === 'fr' ? doc.subtitle_s || doc.fr_subtitle_s : doc.fr_subtitle_s;

  const result = {};

  if (englishTitle) {
    result.en = englishTitle;

    if (englishDescription) result.en += ' — ' + englishDescription;
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
  // NOTE: asbtract and description are sometimes the same and sometimes include each
  // other. The rationale here is to keep the longer text and pray...
  const mainLang = doc.language_s[0];

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

function extractRef(doc) {
  return (
    doc.citationFull_s
      .split(/<a\s*(?:target|href)=/)[0]
      .replace(/<(?:strong|em|[bi])\\?>/g, '') +
    ' ' +
    doc.uri_s
  );
}

function translateDocument(doc, authors) {
  // docType_s: https://api.archives-ouvertes.fr/search/?q=*%3A*&rows=0&wt=xml&indent=true&facet=true&facet.field=docType_s

  const date = extractDate(doc);

  const translated = {
    url: doc.uri_s,
    type: halDocTypeToLabel[doc.docType_s] || 'article',
    title: extractTitle(doc),
    date,
    ref: extractRef(doc),
    external: date < '2009',
    authors: authors
      .map(author => `${author.firstName} ${author.lastName}`)
      .join(', ')
  };

  const content = extractContent(doc);

  if (content) translated.content = content;

  return translated;
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
    originalDoc => {
      seen++;

      if (seen % 100 === 0) emitCallback(`Processed ${seen} HAL documents`);

      const doc = helpers.reformatHALDoc(originalDoc);

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

      const authors = restructureAuthors(doc);

      const halAddendum = {
        id: doc.halId_s,
        lastUpdated: Date.now(),
        meta: originalDoc, // TODO: mask, to avoid keeping too much cruft
        generatedFields: translateDocument(doc, authors)
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
