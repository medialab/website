/* eslint no-console: 0 */
const config = require('config'),
      path = require('path'),
      fs = require('fs-extra'),
      Ajv = require('ajv'),
      async = require('async'),
      request = require('request');

const DATA_PATH = config.get('data');

const models = require('../specs/models.json');
const spireTypes = require('../specs/spireProductionsTypes.json');

const VALIDATORS = {};

models.forEach(model => {
  const ajv = new Ajv();
  VALIDATORS[model] = ajv.compile(require(`../specs/schemas/${model}.json`));
});

const resultPerPage = 2000;

module.exports = function aSPIRE(dataDir = DATA_PATH) {
  // load existing productions indexed by spireId
  const spireProductions = {};
  const productions = fs.readJsonSync(path.join(dataDir, 'productions.json'), 'utf-8').productions.map(p => {
    if (p.spire && p.spire.id)
      spireProductions[p.spire.id] = p;
    return p;
  });
  const newProductions = [];
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
    request.post(config.get('spireAPI'), {body, json: true}, done);
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
        // create the object
        const newProduction = {
          type: spireTypes[record.spire_document_type],
          date: record.date_issued,
          // only one title for publication
          title: {
            en: record.title + (record.title_sub ? ' - ' + record.title_sub : ''),
            fr: record.title + (record.title_sub ? ' - ' + record.title_sub : '')},
          // slugs:,
          // lastUpdated:,
          // authors:,
          // people:,
          // ref:,
          // url:,
          // draft:,
          spire: {
            id: record.rec_id,
            meta: record
          }
        };
        // content
        if (record.descriptions) {
          newProduction.content = {};
          record.descriptions.map(d => {
            if (d.language === 'fr' || d.language === 'en')
              newProduction.content[d.language] = d.value;
          });
        }
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
