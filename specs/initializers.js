const enums = require('./enums.json');

module.exports = {
  activity: function(uuid) {
    return {
      id: uuid(),
      name: '',
      type: enums.activityTypes.default,
      draft: true,
      active: true
    };
  },
  people: function(uuid) {
    return {
      id: uuid(),
      firstName: '',
      lastName: '',
      draft: true,
      active: true
    };
  }
};
