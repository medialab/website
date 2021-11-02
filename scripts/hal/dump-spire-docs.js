const HALClient = require('../../api/hal/client');
const productions = require('../../data/productions.json');

const existingSpireIds = new Set(
  productions.productions
    .filter(p => {
      return p.spire && p.spire.id;
    })
    .map(p => p.spire.id)
);

console.error(`We have ${existingSpireIds.size} known spire ids.`);

console.log('spire_id_in_hal,known');

const client = new HALClient();

let found = 0;

client.searchDocsWithSpireId(
  doc => {
    const docId = doc.sciencespoId_s;

    if (existingSpireIds.has(docId)) {
      found++;
      console.log(`${docId},yes`);
    } else {
      console.log(`${docId},no`);
    }
  },
  err => {
    if (err) return console.error(err);

    console.error(`We found ${found} docs in HAL.`);
  }
);
