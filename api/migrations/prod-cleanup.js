const partition = require('lodash/partition');
const flatten = require('lodash/flatten');

const MODELS = [
  'activities',
  'news',
  'people',
  'productions'
];

module.exports = function(req, dbs, next) {
  const dryRun = 'dryrun' in req.query;

  const data = flatten(MODELS.map(plural => {
    dbs[plural].read();

    return dbs[plural].getState()[plural];
  }));

  // Finding things to delete
  const [toDelete, toKeep] = partition(data, o => {
    return (
      (o.title && ((o.title.fr && o.title.fr.includes(' SUPPRIMER')) ||
                  (o.title.en && o.title.en.includes(' SUPPRIMER'))) 
      ) ||
      (o.name && o.name.includes(' SUPPRIMER'))
    );
  });

  // Checking integrity
  const stringifiedData = data.map(items => JSON.stringify(items)).join('\n');

  let error = null;

  toDelete.some(news => {
    const match = stringifiedData.match(news.id);

    if (match && match.length > 1)
      error = `${news.id} is still linked!`;

    return error;
  });

  if (error)
    return next(error);

  // Persisting
  if (!dryRun) {
    dbs.news.setState({news: toKeep});
    dbs.news.write();
  }

  return next(null, toDelete);
};
