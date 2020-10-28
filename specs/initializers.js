const enums = require('./enums.json');

module.exports = {
  activity: function(uuid) {
    return {
      id: uuid(),
      type: enums.activityTypes.default,
      draft: true,
      active: true
    };
  },
  news: function(uuid) {
    return {
      id: uuid(),
      startDate: (new Date()).toISOString().split('T')[0],
      draft: true,
      internal: false
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
  production: function(uuid) {
    return {
      id: uuid(),
      draft: true,
      active: true
    };
  }
};
