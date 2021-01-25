module.exports = {
  activities: function (a) {
    return a.name.fr || a.name.en;
  },
  people: function (p) {
    return p.firstName + ' ' + p.lastName;
  },
  productions: function (p) {
    if (p.spire) p = p.spire.generatedFields;

    return p.title.fr || p.title.en;
  },
  news: function (n) {
    if (n.title.fr && n.title.en) return n.title.fr + ' | ' + n.title.en;

    if (n.title.fr) return n.title.fr;

    if (n.title.en) return n.title.en;
  }
};
