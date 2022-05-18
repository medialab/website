const HALClient = require('./client');
const {extractMetadataFromXml} = require('./helpers');

module.exports = function syncHAL(
  dbs,
  doneCallback,
  emitCallback = console.debug
) {
  // Reading existing data
  emitCallback('Reading current people & productions');
  dbs.people.read();

  const peopleState = dbs.people.getState();
  const productionState = dbs.productions.getState();

  const peopleData = peopleState.people;
  const productionData = productionState.productions;

  const client = new HALClient();

  const HAL = [];

  emitCallback('Starting to fetch documents from HAL attached to the lab');

  client.searchMedialabDocs(
    doc => {
      HAL.push(doc);
    },
    err => {
      if (err) return doneCallback(err);

      emitCallback('Finished retrieving HAL documents');

      // Matching with spire id, then hal

      // TODO: don't forget to bump lastUpdated

      // Updating people

      // Writing results to database
      dbs.people.setState(peopleState);
      dbs.productions.setState(productionState);

      dbs.people.write();
      dbs.productions.write();

      return doneCallback();
    }
  );
};
