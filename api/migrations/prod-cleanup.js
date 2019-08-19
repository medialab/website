const partition = require('lodash/partition');

const MODELS = [
  'activities',
  'news',
  'people',
  'productions'
];

module.exports = function(req, dbs, next) {
  const dryRun = 'dryrun' in req.query;

  const data = MODELS.map(plural => {
    dbs[plural].read();

    return dbs[plural].getState()[plural];
  });

  // Finding things to delete
  const [toDelete, toKeep] = partition(data[1], news => {
    return (
      (news.title.fr && news.title.fr.includes(' SUPPRIMER')) ||
      (news.title.en && news.title.en.includes(' SUPPRIMER'))
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
