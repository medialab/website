/* eslint no-console: 0 */
const config = require('config'),
      path = require('path'),
      fs = require('fs-extra'),
      Ajv = require('ajv'),
      async = require('async'),
      request = require('request'),
      _ = require('lodash'),
      slug = require('slug'),
      uuid = require('uuid/v4');

const models = require('../specs/models.json');

const VALIDATORS = {};

models.forEach(model => {
  const ajv = new Ajv();
  VALIDATORS[model] = ajv.compile(require(`../specs/schemas/${model}.json`));
});


const DATA_PATH = config.get('data');

const spireTypes = require('../specs/spireProductionsTypes.json');

const DEFAULT_MAX_SLUG_TOKENS = 6;
function slugify(text) {
  const s = slug(text, {lower: true});
  return s.split('-').slice(0, DEFAULT_MAX_SLUG_TOKENS).join('-');
}

const resultPerPage = 2000;

const title = record => (record.title_non_sort ? record.title_non_sort : '') + record.title + (record.title_sub ? ' - ' + record.title_sub : '');

// translation functions stored by object path.
// translation function returns false is ther is nothing to update for the path.
const translators = {
  'type': record => spireTypes[record.spire_document_type],
  'date': record => record.date_issued,
  'title.en': record => {
    return record.languages[0] === 'en' ? title(record) : '';
  },
  'title.fr': record => {
    return record.languages[0] === 'fr' ? title(record) : '';
  },
  'content': record => {
    const content = {};
    if (record.descriptions) {
      record.descriptions.forEach(d => {
        if (d.language === 'fr' || d.language === 'en')
          content[d.language] = d.value;
      });
    }
    return content === {} ? false : content;
  },
  'authors': record => record.creators.filter(c => c.role === 'aut' && c.agent.rec_class === 'Person').map(c => `${c.agent.name_given} ${c.agent.name_family}`).join(', '),
  // people:
  'ref': record => record.citations.html.chicago,
  'url': record => {
    if (record.resources && record.resources.length >= 1)
      return record.resources[0].url;
    else
      return config.spire.front + record.rec_id;
  }
};

function translateRecord(record) {
  const newO = {};
  for (const field in translators) {
    const v = translators[field](record);
    if (v !== false)
      _.set(newO, field, v);
  }
  return newO;
}

module.exports.translators = translators;

module.exports.aSPIRE = function aSPIRE(dataDir = DATA_PATH, callback) {
  async.waterfall([
    // load indeces of existing prod and authors
    getRefDone => {
      async.parallel({
        people: fetchPeopleDone => {
          request.get(`http://localhost:${config.port}/people/people`, {json: true}, (err, result) => {
            if (err) fetchPeopleDone(err);
            fetchPeopleDone(null, _.keyBy(result.body.filter(p => !!p.spire), p => p.spire.id));
          });
        },
        productions: fetchProductionsDone => {
          request.get(`http://localhost:${config.port}/productions/productions`, {json: true}, (err, result) => {
            if (err) fetchProductionsDone(err);
            fetchProductionsDone(null, _.keyBy(result.body.filter(p => !!p.spire), p => p.spire.id));
          });
        }
      }, (err, indeces) => {
        if (err) throw err;
        getRefDone(null, indeces);
      });
    },
    (indeces, done) => {
      console.log(_.values(indeces.people).length);
      async.parallelLimit(
        // call SPIRE APRE
        _.values(indeces.people).map(people => {
          return (donePeopleSpire) => {
            let resultOffset = 0;
            async.doUntil(
              (apiDone) => {
                // request spire API
                const body = {jsonrpc: '2.0', method: 'search', id: 1,
                params: ['corpus', {
                  filter_class: 'Document',
                  result_batch_size: 2000,
                  result_citation_styles: ['chicago'],
                  search_terms: {
                      index: 'creator_id',
                      operator: '=',
                      value: people.spire.id},
                  result_offset: resultOffset
                }]};
                console.debug(`request to spire ${people.lastName} - ${resultOffset} ${body}`);
                request.post(config.spire.api, {body, json: true}, apiDone);
              },
              (response) => {
                // pagination control
                const r = response.body.result;
                console.debug(`got ${r.result_batch_size}`);
                // test if a new page is needed
                if (r.result_batch_size < resultPerPage) {
                  // we are done
                  return true;
                }
                // need more results
                resultOffset += resultPerPage;
                return false;
              },
              // return Spire result
              (err, response) => {
                if (err) {
                  donePeopleSpire(err);
                }
                donePeopleSpire(null, response.body.result.records);
              });
          };
        }
        ),
        10,
        (err, records) => {
          // flatten and uniq productions which are duplicated cause of co-authorship
          const uniqRecords = _.uniq(_.flatten(records), false, p => p.rec_id);

          // common queue to process the writing requests
          const apiQueue = async.queue(({method, production}, cb) => {
            if (!VALIDATORS.productions(production)) {
              console.error('productions', production, VALIDATORS.productions.errors);
              cb(new Error(VALIDATORS.productions.errors));
            }
            const url = method === 'PUT' ? `http://localhost:${config.port}/productions/productions/${production.id}` : `http://localhost:${config.port}/productions/productions/`;
            request({url, method, body: production, json: true}, (reqErr) => {
              if (reqErr) {
                console.error(`error ${method} ${production.id}`, err);
                cb(reqErr);
              }
              cb(null);
            });
          }, 2);

          const modifiedProductionIds = [];
          let nbNewProductions = 0;
          //treat records
          async.each(uniqRecords,
            (record, d) => {
              // TO CHANGE !!!!
              const p = null; //indeces.productions[record.rec_id];
              // do we already have this one ?
              // has the content changed ?
              if (p && p.spire.meta.rec_modified_date !== record.rec_modified_date) {
                // yes and yes, let's update the meta
                p.spire.meta = record;
                apiQueue.push({method: 'PUT', production: p}, (e) => {
                  if (e) console.error(e);
                });
                modifiedProductionIds.push(p.id);
              }
              // if new publication + if type is not translated to null
              if (!p && spireTypes[record.spire_document_type]) {
                // create the object by translating it to our data model
                const newProduction = translateRecord(record);
                newProduction.id = uuid();
                // draft by default
                newProduction.draft = true;
                // meta
                newProduction.spire = {
                  id: record.rec_id,
                  meta: record
                };
                // slugs
                newProduction.slugs = [slugify(newProduction.title ? (newProduction.title.fr || newProduction.title.en || '') : '')];
                // reuse ref for description
                newProduction.description = {fr: newProduction.ref, en: newProduction.ref};
                // people
                const people = record.creators.map(c => indeces.people[c.agent.rec_id] && indeces.people[c.agent.rec_id].id).filter(c => !!c);
                newProduction.people = people;
                // lastUpdated
                newProduction.lastUpdated = new Date(record.rec_modified_date).getTime();
                apiQueue.push({method: 'POST', production: newProduction}, (e) => {
                  if (e) console.error(e);
                });
                nbNewProductions += 1;
              }
              d(null);
            },
            (r) => {
              if (r) done(r);
              if (apiQueue.idle())
                done(null, {nbNewProductions, modifiedProductionIds});
              else
                apiQueue.drain = () => {
                  done(null, {nbNewProductions, modifiedProductionIds});
                };
            }
          );
        }
      );
    }
  ], callback);
};

module.exports.aspireAuthors = function aspireAuthors(callback) {
  let resultOffset = 0;
  async.doUntil((done) => {
    // request spire API
    const body = {jsonrpc: '2.0', method: 'search', id: 1,
    params: ['corpus', {
      filter_class: 'Person',
      result_batch_size: 2000,
      search_terms: {
          index: 'affiliation_id',
          operator: '=',
          value: '2441/53r60a8s3kup1vc9kf4j86q90'},
      result_offset: resultOffset
    }]};
    console.debug('request to spire', resultOffset);
    request.post(config.spire.api, {body, json: true}, done);
  }, (response) => {
    const r = response.body.result;
    console.debug(`got ${r.result_batch_size}`);
    // test if a new page is needed
    if (r.result_batch_size < resultPerPage) {
      // we are done
      return true;
    }
    // need more results
    resultOffset += resultPerPage;
    return false;
  }, (err, response) => {
    const spirePeople = {};
    if (err) {
      throw err;
    }
    response.body.result.records.map(p => {
      let spireSlug = slugify(`${p.name_given} ${p.name_family}`);
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
  });
};
