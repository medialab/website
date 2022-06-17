module.exports = {
  activities: function (a) {
    return a.name.fr || a.name.en;
  },
  people: function (p) {
    return p.firstName + ' ' + p.lastName;
  },
  productions: function (p) {
    if (p.title && p.title.fr) return p.title.fr;
    if (p.title && p.title.en) return p.title.en;

    if (p.hal) p = p.hal.generatedFields;

    if (p.title && p.title.fr) return p.title.fr;
    if (p.title && p.title.en) return p.title.en;

    if (p.spire) p = p.spire.generatedFields;

    if (p.title && p.title.fr) return p.title.fr;
    if (p.title && p.title.en) return p.title.en;

    throw new Error(
      'could not find suitable label for production. this should not happen'
    );
  },
  news: function (n) {
    if (n.title.fr && n.title.en) return n.title.fr + ' | ' + n.title.en;

    if (n.title.fr) return n.title.fr;

    if (n.title.en) return n.title.en;
  }
};
