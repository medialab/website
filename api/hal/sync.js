const _ = require('lodash');
const uuid = require('uuid/v4');
const slugLib = require('slug');
const makeSlugFunctions = require('../../specs/slugs');

const HALClient = require('./client');
const {extractMetadataFromXml} = require('./helpers');

const HAL_SCPO_BASE_URL = 'https://hal-sciencespo.archives-ouvertes.fr';

const {production: slugifyProduction} = makeSlugFunctions(slugLib);

function translateDocument(doc) {
  const xmlMetadata = extractMetadataFromXml(doc.label_xml);

  return {
    url: `${HAL_SCPO_BASE_URL}/${doc.halId_s}`
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
