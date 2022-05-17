const csvWriter = require('csv-write-stream');

const reducers = require('../../wilson/reducers');
const HALClient = require('../../api/hal/client');
const DATA = require('../../data/productions.json');

const spireDocsInSite = new Map();

DATA.productions
  .filter(p => p.spire && p.spire.id)
  .map(p => reducers.productions('/', p))
  .forEach(p => spireDocsInSite.set(p.spire.id, p));

const spireIdsInHAL = new Set();

console.error(`We have ${spireDocsInSite.size} known spire ids.`);

const writer = csvWriter({
  headers: ['spireId', 'inHAL', 'inSite', 'type', 'group', 'refSpire', 'refHAL']
});
writer.pipe(process.stdout);

const client = new HALClient();

let found = 0;

function dumpDocsNotInHAL() {
  spireDocsInSite.forEach((p, id) => {
    if (spireIdsInHAL.has(id)) return;

    writer.write({
      spireId: id,
      inHAL: 'no',
      inSite: 'yes',
      type: p.type,
      group: p.group,
      refSpire: p.ref.trim()
    });
  });
}

client.searchDocsWithSpireId(
  doc => {
    const docId = doc.sciencespoId_s;
    spireIdsInHAL.add(docId);

    const inSite = spireDocsInSite.get(docId);

    if (inSite) {
      found++;
      writer.write({
        spireId: docId,
        inHAL: 'yes',
        inSite: 'yes',
        type: inSite.type,
        group: inSite.group,
        refSpire: inSite.ref.trim(),
        refHAL: doc.label_s.trim()
      });
    } else {
      writer.write({
        spireId: docId,
        inHAL: 'yes',
        inSite: 'no',
        refSpire: doc.label_s.trim()
      });
    }
  },
  err => {
    if (err) return console.error(err);

    dumpDocsNotInHAL();
    writer.end();

    console.error(`We found ${found} docs in HAL.`);
  }
);
