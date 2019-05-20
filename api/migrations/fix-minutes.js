function fixMinutes(date) {
  if (!date.includes('T'))
    return date;

  const [d, t] = date.split('T');

  if (!t.includes(':'))
    return d + 'T' + t + ':00';

  return date;
}

module.exports = function(req, dbs, next) {
  dbs.news.read();

  const state = dbs.news.getState();

  state.news.forEach(n => {
    if (n.startDate)
      n.startDate = fixMinutes(n.startDate);

    if (n.endDate)
      n.endDate = fixMinutes(n.endDate);
  });

  dbs.news.setState(state);

  dbs.news.write();
  return next();
};
