const MultiMap = require('mnemonist/multi-map');

const productions = require('../../data/productions.json').productions;

const conflicts = new MultiMap();

productions.forEach(p => {
  if (!p.hal) return;

  let type = p.type || (p.spire ? p.spire.generatedFields.type : undefined);

  if (!type) return;

  if (type !== p.hal.generatedFields.type) {
    const key = `${type} =/= ${p.hal.generatedFields.type}`;
    conflicts.set(key, p);
  }
});

conflicts.forEachAssociation((container, conflict) => {
  console.log(
    conflict,
    '\n',
    container.map(p => p.id),
    '\n'
  );
});
