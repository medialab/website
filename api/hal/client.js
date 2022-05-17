const request = require('request');
const {doWhilst} = require('async');

const BASE_URL = 'https://api.archives-ouvertes.fr';
const PAGINATION_COUNT = 100;

module.exports = class HALClient {
  searchDocsWithSpireId(perItemCallback, doneCallback) {
    let counter = 0;

    return doWhilst(
      next => {
        return request.get(
          BASE_URL +
            `/search/index/?q=sciencespoId_s:*&wt=json&fl=*&rows=${PAGINATION_COUNT}&start=${counter}`,
          {json: true},
          (err, response) => {
            if (err) return next(err);

            return next(null, response.body.response.docs);
          }
        );
      },
      (docs, test) => {
        if (!docs || !docs.length) return test(null, false);

        counter += PAGINATION_COUNT;

        docs.forEach(perItemCallback);

        return test(null, true);
      },
      doneCallback
    );
  }
};
