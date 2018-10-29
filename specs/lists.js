module.exports = {
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
  ]
};
