module.exports = {
  activities: {
    fields: [
      {
        label: 'Name',
        property: 'name',
        link: true
      }
    ],
    search: ['name']
  },
  news: {
    fields: [
      {
        label: 'Title',
        property: function(n) {
          return n.title.fr || n.title.en;
        },
        link: true
      }
    ],
    search: ['title.fr', 'title.en']
  },
  people: {
    fields: [
      {
        label: 'Full Name',
        property: function(p) {
          return p.firstName + ' ' + p.lastName;
        },
        link: true
      }
    ],
    search: ['firstName', 'lastName']
  },
  publications: {
    fields: [
      {
        label: 'Title',
        property: function(p) {
          return p.title.fr || p.title.en;
        },
        link: true
      }
    ],
    search: ['title.fr', 'title.en']
  }
};
