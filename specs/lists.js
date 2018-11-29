module.exports = {
  activities: [
    {
      label: 'Name',
      property: 'name',
      link: true
    }
  ],
  news: [
    {
      label: 'Title',
      property: function(n) {
        return n.title.fr || n.title.en;
      },
      link: true
    }
  ],
  people: [
    {
      label: 'Full Name',
      property: function(p) {
        return p.firstName + ' ' + p.lastName;
      },
      link: true
    }
  ],
  publications: [
    {
      label: 'Title',
      property: function(p) {
        return p.title.fr || p.title.en;
      },
      link: true
    }
  ],
};
