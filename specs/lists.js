module.exports = {
  activities: [
    {
      label: 'ID',
      property: 'id'
    },
    {
      label: 'Name',
      property: 'name',
      link: false
    }
  ],
  news: [
    {
      label: 'ID',
      property: 'id'
    },
    {
      label: 'Title',
      property: function(n) {
        return n.title.fr || n.title.en;
      },
      link: false
    }
  ],
  people: [
    {
      label: 'ID',
      property: 'id'
    },
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
      label: 'ID',
      property: 'id'
    },
    {
      label: 'Title',
      property: function(p) {
        return p.title.fr || p.title.en;
      },
      link: false
    }
  ],
};
