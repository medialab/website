const request = require('request');
const {doWhilst} = require('async');

const BASE_URL = 'https://api.archives-ouvertes.fr';
const PAGINATION_COUNT = 100;
const MEDIALAB_STRUCT_ID = 394361;
const MEDIALAB_COLLECTION_ID = 9252;

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
  'ePublicationDate_s',
  'conferenceStartDate_s',
  'conferenceEndDate_s',
  'writingDate_s',
  'defenseDate_s',
  'authFirstName_s',
  'authLastName_s',
  'citationFull_s'
];

const FL_PARAM = USEFUL_FIELDS.join(',');

module.exports = class HALClient {
  searchDocs(query, perItemCallback, doneCallback) {
    let counter = 0;

    const alreadySeen = new Set();

    return doWhilst(
      next => {
        const url = `${BASE_URL}/search/index/?q=${encodeURIComponent(
          query
        )}&wt=json&fl=${FL_PARAM}&rows=${PAGINATION_COUNT}&start=${counter}`;

        return request.get(url, {json: true}, (err, response) => {
          if (err) return next(err);

          return next(null, response.body.response.docs);
        });
      },
      (docs, test) => {
        if (!docs || !docs.length) return test(null, false);

        counter += docs.length;

        docs.forEach(doc => {
          if (alreadySeen.has(doc.halId_s)) {
            return;
          }

          alreadySeen.add(doc.halId_s);
          perItemCallback(doc);
        });

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
      `labStructId_i:${MEDIALAB_STRUCT_ID} OR collId_i:${MEDIALAB_COLLECTION_ID}`,
      perItemCallback,
      doneCallback
    );
  }
};
