/* eslint no-console: 0 */
const config = require('config-secrets'),
  Ajv = require('ajv'),
  async = require('async'),
  request = require('request'),
  _ = require('lodash'),
  uuid = require('uuid/v4'),
  slugLib = require('slug'),
  makeSlugFunctions = require('../../specs/slugs.js');

const SUPERUSER = config.get('superuser');
const AUTH = `${SUPERUSER.username}:${SUPERUSER.password}`;

const {production: slugifyProduction, people: slugifyPeople} =
  makeSlugFunctions(slugLib);

const models = require('../../specs/models.json');

const VALIDATORS = {};

models.forEach(model => {
  const ajv = new Ajv();
  VALIDATORS[model] = ajv.compile(require(`../../specs/schemas/${model}.json`));
});

const spireTypes = require('../../specs/spireProductionsTypes.json');

const resultPerPage = 2000;
const labIdSpire = '2441/53r60a8s3kup1vc9kf4j86q90';

const title = (record, lang) => {
  if (
    record.languages[0] === lang ||
    !['fr', 'en'].includes(record.languages[0])
  ) {
    return (
      (record.title_non_sort ? record.title_non_sort : '') +
      record.title +
      (record.title_sub
        ? ' — ' +
          record.title_sub.slice(0, 1).toLowerCase() +
          record.title_sub.slice(1)
        : '')
    );
  } else return false;
};
const ref = record => {
  // removing the <a> tag
  return record.citations
    ? record.citations.html.chicago.replace(/<a.*?>(.*?)<\/a>/g, '$1')
    : false;
};
const getDate = record => {
  if (record.date_issued || record.date_created) {
    let date = record.date_issued || record.date_created;
    //sometimes the format is YYYYMMDD and not YYYY-MM-DD ....
    if (date.length === 8 && !date.includes('-'))
      date = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
    return date;
  } else if (record.is_part_ofs && record.is_part_ofs.length > 0)
    return record.is_part_ofs.find(ipo => ipo.date_issued).date_issued;
};
// translation functions stored by object path.
// translation function returns false is ther is nothing to update for the path.
const translators = {
  type: record => spireTypes[record.spire_document_type],
  date: getDate,
  external: record => getDate(record) < '2009',
  'title.en': record => title(record, 'en'),
  'title.fr': record => title(record, 'fr'),
  'description.en': record => ref(record),
  'description.fr': record => ref(record),
  content: record => {
    const content = {};
    if (record.descriptions) {
      record.descriptions.forEach(d => {
        if (d.language === 'fr' || d.language === 'en')
          content[d.language] = d.value;
      });
    }
    return content === {} ? false : content;
  },
  authors: record =>
    record.creators
      .filter(c => c.agent.rec_class === 'Person')
      .map(c => `${c.agent.name_given} ${c.agent.name_family}`)
      .join(', '),
  // people:
  ref: record => ref(record),
  url: record => {
    if (
      record.resources &&
      record.resources.filter(r => r.relation_type !== 'frontCover') &&
      record.resources.filter(r => r.relation_type !== 'frontCover').length >= 1
    )
      return record.resources.filter(r => r.relation_type !== 'frontCover')[0]
        .url;
    else return config.spire.front + record.rec_id;
  },
  // link to author people
  people: (record, spireAuthors) =>
    record.creators
      // filter authors who are person
      .filter(c => c.agent && c.agent.rec_class === 'Person')
      .map(c => spireAuthors[c.agent.rec_id] && spireAuthors[c.agent.rec_id].id)
      .filter(c => !!c)
};

function translateRecord(record, spireAuthors) {
  const newO = {};
  for (const field in translators) {
    const v = translators[field](record, spireAuthors);
    if (v !== false) _.set(newO, field, v);
  }
  return newO;
}

exports.translateRecord = translateRecord;

// finds Authors which should be attached to a people object
// tries to resolve through firstname.name slug
function missingLabAuthors(spireRecords, existingSpireAuthors) {
  // find authors and detect missing ones
  return _.keyBy(
    _.flatten(
      spireRecords.map(
        // only author (not organisators)
        r =>
          r.creators
            .filter(
              c =>
                // which were at that time affiliated to the lab
                c.affiliation &&
                c.affiliation.rec_id === labIdSpire &&
                // which is a person which is not registered as a spire authors in our data
                c.agent &&
                c.agent.rec_class === 'Person' &&
                !existingSpireAuthors.includes(c.agent.rec_id)
            )
            .map(c => c.agent)
      )
    ),
    c => c.rec_id
  );
}

exports.missingLabAuthors = missingLabAuthors;

exports.syncSpire = function syncSpire(
  doneCallback,
  emitCallback = console.debug
) {
  async.waterfall(
    [
      // load indices of existing prod and authors
      getRefDone => {
        async.parallel(
          {
            people: fetchPeopleDone => {
              request.get(
                `http://${AUTH}@localhost:${config.port}/people/people`,
                {json: true},
                (err, result) => {
                  if (err) fetchPeopleDone(err);
                  emitCallback('Récupération des People terminée');
                  fetchPeopleDone(
                    null,
                    _.keyBy(result.body, p => p.slugs[0])
                  );
                }
              );
            },
            productions: fetchProductionsDone => {
              request.get(
                `http://${AUTH}@localhost:${config.port}/productions/productions`,
                {json: true},
                (err, result) => {
                  if (err) fetchProductionsDone(err);
                  emitCallback('Récupération des Productions terminée');
                  fetchProductionsDone(
                    null,
                    _.keyBy(
                      result.body.filter(p => !!p.spire),
                      p => p.spire.id
                    )
                  );
                }
              );
            }
          },
          (err, indices) => {
            if (err) throw err;
            getRefDone(null, indices);
          }
        );
      },
      (indices, doneAPISpire) => {
        let resultOffset = 0;
        let spireRecords = [];
        async.doUntil(
          apiPageDone => {
            // request spire API
            const body = {
              jsonrpc: '2.0',
              method: 'search',
              id: 1,
              params: [
                'corpus',
                {
                  filter_class: 'Document',
                  result_batch_size: resultPerPage,
                  result_citation_styles: ['chicago'],
                  search_terms: {
                    index: 'affiliation_id',
                    operator: '=',
                    value: labIdSpire
                  },
                  result_offset: resultOffset
                }
              ]
            };
            console.debug(`request to spire ${resultOffset}`);
            emitCallback(`Requête #${resultOffset + 1} à l'API Spire`);
            request.post(config.spire.api, {body, json: true}, (e, r) => {
              if (e || r.statusCode !== 200) {
                console.debug(`erreur ${r.statusCode} \n` + r.body);
                doneAPISpire(e || `erreur ${r.statusCode} \n` + r.body);
              } else apiPageDone(null, r);
            });
          },
          (response, areWeDone) => {
            // store result
            spireRecords = spireRecords.concat(response.body.result.records);
            // pagination control
            const r = response.body.result;
            console.debug(`got ${r.result_batch_size}`);
            // test if a new page is needed
            if (r.result_batch_size < resultPerPage) {
              // we are done
              return areWeDone(null, true);
            }
            // need more results
            resultOffset += resultPerPage;
            return areWeDone(null, false);
          },
          // manage Spire result
          err => {
            if (err) {
              doneAPISpire(err);
            }
            const nbAPIResults = spireRecords.length;
            emitCallback(
              `Récupération Spire terminée : ${nbAPIResults} publications`
            );
            console.debug(`got ${nbAPIResults}`);
            // filtering non published documents
            spireRecords = spireRecords.filter(d => d.state_spire === '3');
            console.debug(
              `filtered ${
                nbAPIResults - spireRecords.length
              } unpublished documents (state_spire ≠ 3)`
            );
            // common queue to process the writing requests
            const apiRequestsToMake = [];

            const existingSlugs = new Set(
              _.values(indices.productions).reduce(
                (slugs, p) => slugs.concat(p.slugs),
                []
              )
            );
            const spireAuthors = _.keyBy(
              _.values(indices.people).filter(p => !!p.spire),
              p => p.spire.id
            );
            // let's try to reconcile with slugs
            const peopleToResolve = [];
            _.forEach(
              missingLabAuthors(spireRecords, _.keys(spireAuthors)),
              (aut, idSpire) => {
                // simple true match on slug
                const match =
                  indices.people[
                    slugifyPeople({
                      firstName: aut.name_given,
                      lastName: aut.name_family
                    })
                  ];
                if (match) {
                  spireAuthors[idSpire] = {spire: {id: idSpire}, ...match};
                  emitCallback(
                    `Ajout de l'id Spire à ${match.firstName} ${match.lastName} : ${idSpire}`
                  );
                  if (!match.spire)
                    // this test is to prevent uneeded update when the match already have a spire ID : duplicated authors in spire
                    apiRequestsToMake.push({
                      method: 'PUT',
                      model: 'people',
                      object: {spire: {id: idSpire}, ...match}
                    });
                } else {
                  peopleToResolve.push(aut);
                }
              }
            );
            // log what left to be resolved
            if (peopleToResolve.length > 0) {
              const nameList = peopleToResolve.map(
                aut => `${aut.name_given} ${aut.name_family}`
              );
              console.debug(`missing spire authors in data ${nameList}`);
              emitCallback(
                `${peopleToResolve.length} auteurs Spire non trouvés dans People : ${nameList}`
              );
            }
            // control variables
            const modifiedProductionIds = [];
            let nbNewProductions = 0;
            let nbUnchangedProductions = 0;

            //treat records
            async.each(
              spireRecords,
              (record, d) => {
                // meta
                const spire = {
                  id: record.rec_id,
                  lastUpdated: Date.now(),
                  meta: record,
                  // create the generated version of the object by translating Spire meta to our data model
                  generatedFields: translateRecord(record, spireAuthors)
                };

                const p = indices.productions[record.rec_id];
                // do we already have this one ? and has spire content changed
                if (
                  p &&
                  p.spire.meta.rec_modified_date !== record.rec_modified_date
                ) {
                  // flash the data from spire.
                  apiRequestsToMake.push({
                    method: 'PUT',
                    model: 'productions',
                    object: {...p, ...{spire}}
                  });
                  modifiedProductionIds.push(p.id);
                } else {
                  // if new publication + if type is not translated to null
                  if (!p && spireTypes[record.spire_document_type]) {
                    // slug
                    let slug = slugifyProduction(spire.generatedFields);
                    if (existingSlugs.has(slug)) {
                      // slug collision
                      console.debug(`slug collision ${slug}`);
                      slug += '-2';
                    }
                    existingSlugs.add(slug);
                    const newProduction = {
                      id: uuid(),
                      // draft by default
                      draft: true,
                      // slugs
                      slugs: [slug],
                      spire
                      // lastUpdated
                    };
                    apiRequestsToMake.push({
                      method: 'POST',
                      model: 'productions',
                      object: newProduction
                    });
                    nbNewProductions += 1;
                  }
                  // else, nothing change, nothing to do
                  else nbUnchangedProductions += 1;
                }
                d(null);
              },
              r => {
                if (r) return doneAPISpire(r);

                return async.eachLimit(
                  apiRequestsToMake,
                  2,
                  ({method, model, object}, cb) => {
                    if (!VALIDATORS[model](object)) {
                      console.error(model, object, VALIDATORS[model].errors);
                      return cb(new Error(VALIDATORS[model].errors));
                    }
                    const url =
                      method === 'PUT'
                        ? `http://${AUTH}@localhost:${config.port}/${model}/${model}/${object.id}`
                        : `http://${AUTH}@localhost:${config.port}/${model}/${model}/`;
                    console.debug(`API CALL ${model} ${method} ${object.id}`);
                    request({url, method, body: object, json: true}, reqErr => {
                      if (reqErr) {
                        console.error(
                          `error ${method} ${model} ${object.id}`,
                          err
                        );
                        cb(reqErr);
                      } else cb(null);
                    });
                  },
                  apiRequestError => {
                    if (apiRequestError) return doneAPISpire(apiRequestError);

                    emitCallback(
                      `importation des données spire terminée : ${nbNewProductions} nouvelle.s production.s, ${modifiedProductionIds.length} modifiée.s, ${nbUnchangedProductions} inchangée.s`
                    );
                    doneAPISpire(null, {
                      nbNewProductions,
                      modifiedProductionIds,
                      nbUnchangedProductions,
                      peopleToResolve
                    });
                  }
                );
              }
            );
          }
        );
      }
    ],
    doneCallback
  );
};

exports.syncSpireAuthors = function syncSpireAuthors(callback) {
  let resultOffset = 0;
  async.doUntil(
    done => {
      // request spire API
      const body = {
        jsonrpc: '2.0',
        method: 'search',
        id: 1,
        params: [
          'corpus',
          {
            filter_class: 'Person',
            result_batch_size: 2000,
            search_terms: {
              index: 'affiliation_id',
              operator: '=',
              value: '2441/53r60a8s3kup1vc9kf4j86q90'
            },
            result_offset: resultOffset
          }
        ]
      };
      console.debug('request to spire', resultOffset);
      request.post(config.spire.api, {body, json: true}, done);
    },
    (response, areWeDone) => {
      const r = response.body.result;
      console.debug(`got ${r.result_batch_size}`);
      // test if a new page is needed
      if (r.result_batch_size < resultPerPage) {
        // we are done
        return areWeDone(null, true);
      }
      // need more results
      resultOffset += resultPerPage;
      return areWeDone(null, false);
    },
    (err, response) => {
      const spirePeople = {};
      if (err) {
        throw err;
      }
      response.body.result.records.map(p => {
        let spireSlug = slugLib(`${p.name_given} ${p.name_family}`);
        switch (spireSlug) {
          case 'benjamin-ooghe':
            spireSlug = 'benjamin-ooghe-tabanou';
            break;
          case 'vincent-lepinay':
            spireSlug = 'vincent-antonin-lepinay';
            break;
          case 'davy-braun':
            spireSlug = 'davy-peter-braun';
            break;
          default:
            break;
        }
        spirePeople[spireSlug] = p.rec_id;
      });
      callback(spirePeople);
    }
  );
};
