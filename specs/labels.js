module.exports = {
  activities: function(a) {
    return a.name;
  },
  people: function(p) {
    return p.firstName + ' ' + p.lastName;
  },
  productions: function(p) {
    return p.title.en || p.title.fr;
  },
  news: function(n) {
    return n.title.en || n.title.fr;
  }
};
