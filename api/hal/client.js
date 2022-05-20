const request = require('request');
const {doWhilst} = require('async');

const BASE_URL = 'https://api.archives-ouvertes.fr';
const PAGINATION_COUNT = 100;
const MEDIALAB_STRUCT_ID = 394361;

// TODO: use as a mask
const USEFUL_FIELDS = [
  'sciencespoId_s',
  'halId_s',
  'uri_s',
  'docType_s',
  'language_s',
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
  'fr_description_s',
  'modifiedDate_s',
  'submittedDate_s',
  'releasedDate_s',
  'producedDate_s',
  'publicationDate_s',
  'authorFirstName_s',
  'authorLastName_s',
  'authIdHal_s',
  'citationFull_s'
];

module.exports = class HALClient {
  searchDocs(query, perItemCallback, doneCallback) {
    let counter = 0;

    return doWhilst(
      next => {
        return request.get(
          `${BASE_URL}/search/index/?q=${query}&wt=json&fl=*&rows=${PAGINATION_COUNT}&start=${counter}`,
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

  searchDocsWithSpireId(perItemCallback, doneCallback) {
    return this.searchDocs('sciencespoId_s:*', perItemCallback, doneCallback);
  }

  searchMedialabDocs(perItemCallback, doneCallback) {
    return this.searchDocs(
      `labStructId_i:${MEDIALAB_STRUCT_ID}`,
      perItemCallback,
      doneCallback
    );
  }
};
