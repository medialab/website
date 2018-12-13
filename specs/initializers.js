const enums = require('./enums.json');

module.exports = {
  activity: function(uuid) {
    return {
      id: uuid(),
      name: '',
      type: enums.activityTypes.default,
      draft: true,
      active: true,
      important: false
    };
  },
  news: function(uuid) {
    return {
      id: uuid(),
      draft: true,
      internal: true
    };
  },
  people: function(uuid) {
    return {
      id: uuid(),
      firstName: '',
      lastName: '',
      membership: enums.membershipTypes.default,
      draft: true,
      active: true
    };
  },
  publication: function(uuid) {
    return {
      id: uuid(),
      draft: true,
      active: true
    };
  }
};
