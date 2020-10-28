/* eslint prefer-const: 0 */
function fixDate(date) {
  let [y, m, d] = date.split('-');

  if (m.length < 2) m = '0' + m;

  if (d.length < 2) d = '0' + d;

  return [y, m, d].join('-');
}

module.exports = function (req, dbs, next) {
  dbs.news.read();

  const state = dbs.news.getState();

  state.news.forEach(n => {
    if (n.startDate) n.startDate = fixDate(n.startDate);

    if (n.endDate) n.endDate = fixDate(n.endDate);
  });

  dbs.news.setState(state);

  dbs.news.write();
  return next();
};
