const csvWriter = require('csv-write-stream');

const reducers = require('../../wilson/reducers');
const HALClient = require('../../api/hal/client');
const helpers = require('../../api/hal/helpers');
const DATA = require('../../data/productions.json');

const spireDocsInSite = new Map();

DATA.productions
  .filter(p => p.spire && p.spire.id)
  .map(p => reducers.productions('/', p))
  .forEach(p => spireDocsInSite.set(p.spire.id, p));

const spireIdsInHAL = new Set();

console.error(`We have ${spireDocsInSite.size} known spire ids.`);

const writer = csvWriter({
  headers: [
    'spireId',
    'inHAL',
    'inSite',
    'type',
    'group',
    'refSpire',
    'refHAL',
    'typologyLabelHAL',
    'typologyCodeHAL'
  ]
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

client.searchMedialabDocs(
  doc => {
    const docId = doc.sciencespoId_s;
    let inSite = null;

    if (docId) {
      spireIdsInHAL.add(docId);
      inSite = spireDocsInSite.get(docId);
    }

    const halMeta = helpers.extractMetadataFromXml(doc.label_xml);

    if (inSite) {
      found++;
      writer.write({
        spireId: docId,
        inHAL: 'yes',
        inSite: 'yes',
        type: inSite.type,
        group: inSite.group,
        refSpire: inSite.ref.trim(),
        refHAL: doc.label_s.trim(),
        typologyLabelHAL: halMeta.typologyLabel || '',
        typologyCodeHAL: halMeta.typologyCode || ''
      });
    } else {
      writer.write({
        spireId: docId || '',
        inHAL: 'yes',
        inSite: 'no',
        refSpire: docId ? doc.label_s.trim() : '',
        refHAL: doc.label_s.trim(),
        typologyLabelHAL: halMeta.typologyLabel || '',
        typologyCodeHAL: halMeta.typologyCode || ''
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
