/* eslint no-console: 0 */
const config = require('config'),
      path = require('path'),
      fs = require('fs-extra'),
      Ajv = require('ajv'),
      async = require('async'),
      request = require('request'),
      _ = require('lodash'),
      slug = require('slug');

const DATA_PATH = config.get('data');

const models = require('../specs/models.json');
const spireTypes = require('../specs/spireProductionsTypes.json');

const DEFAULT_MAX_SLUG_TOKENS = 6;
function slugify(text) {
  const s = slug(text, {lower: true});
  return s.split('-').slice(0, DEFAULT_MAX_SLUG_TOKENS).join('-');
}


const VALIDATORS = {};

models.forEach(model => {
  const ajv = new Ajv();
  VALIDATORS[model] = ajv.compile(require(`../specs/schemas/${model}.json`));
});

const resultPerPage = 2000;

const title = record => record.title + (record.title_sub ? ' - ' + record.title_sub : '');

// translation functions stored by object path.
// translation function returns false is ther is nothing to update for the path.
const translators = {
  'type': record => spireTypes[record.spire_document_type],
  'date': record => record.date_issued,
  'title.en': title,
  'title.fr': title,
  'content': record => {
    const content = false;
    if (record.descriptions) {
      record.descriptions.map(d => {
        if (d.language === 'fr' || d.language === 'en')
          content[d.language] = d.value;
      });
    }
    return content;
  },
  'authors': record => record.creators.filter(c => c.role === 'aut').map(c => `${c.agent.name_given} ${c.agent.name_family}`).join(', '),
  // people:
  'ref': record => record.citations.html.chicago,
  'url': record => {
    if (record.resources && record.resources.length >= 1)
      return record.resources[0].url;
    else
      return config.spire.front + record.rec_id;
  },
  'description.fr': record => {
    return record.keywords && record.keywords.fr ? record.keywords.fr.join(', ') : false;
  },
  'description.en': record => {
    return record.keywords && record.keywords.en ? record.keywords.en.join(', ') : false;
  }
};

function translateRecord(record) {
  const newO = {};
  for (const field in translators) {
    const v = translators[field](record);
    if (v)
      _.set(newO, field, v);
  }
  return newO;
}

module.exports.translators = translators;

module.exports.aSPIRE = function aSPIRE(dataDir = DATA_PATH) {
  // load existing productions indexed by spireId
  const spireProductions = {};
  const productions = fs.readJsonSync(path.join(dataDir, 'productions.json'), 'utf-8').productions.map(p => {
    if (p.spire && p.spire.id)
      spireProductions[p.spire.id] = p;
    return p;
  });
  const newProductions = [];
  // load existing authors indexed by spireId
  const spireAuthors = {};
  fs.readJsonSync(path.join(dataDir, 'people.json'), 'utf-8').people.map(p => {
    if (p.spire && p.spire.id)
      spireAuthors[p.spire.id] = p.id;
  });
  // call SPIRE API
  let resultOffset = 0;
  async.doUntil((done) => {
    // request spire API
    const body = {jsonrpc: '2.0', method: 'search', id: 1,
    params: ['corpus', {
			filter_class: 'Document',
			result_batch_size: 2000,
			result_citation_styles: ['chicago'],
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
    const spireData = response.body.result;
    if (err) {
      //work done
      console.log('spire requests done');
    }
    //treat records
    async.each(spireData.records, (record, done) => {
      const p = spireProductions[record.rec_id];
      // do we already have this one ?
      // has the content changed ?
      if (p && p.spire.meta.rec_modified_date !== record.rec_modified_date) {
        // yes and yes, let's upadte the meta
        p.spire.meta = record.copy();
      }
      // if new publication + if type is not translated to null
      if (!p && spireTypes[record.spire_document_type]) {
        // create the object by translating it to our data model
        const newProduction = translateRecord(record);
        // draft by default
        newProduction.draft = true;
        // meta
        newProduction.spire = {
          id: record.rec_id,
          meta: record
        };
        // slugs
        newProduction.slugs = [slugify(newProduction.title ? (newProduction.title.fr || newProduction.title.en || '') : '')];
        // people
        const people = record.creators.map(c => spireAuthors[c.agent.rec_id]).filter(c => !!c);
        newProduction.people = people;
        // lastUpdated
        newProduction.lastUpdated = new Date(record.rec_modified_date).getTime();
        newProductions.push(newProduction);
      }
      done();
    }, (err2) => {
      if (err2)
        throw err2;
      // validate
      // write everything back
      fs.writeJsonSync(path.join(dataDir, 'newProductions.json'), {productions: productions.concat(newProductions)}, {spaces: 2, encoding: 'utf-8'});
    });
  });
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
