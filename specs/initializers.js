const uuid = require('uuid/v4'),
      enums = require('./enums.json');

module.exports = {
  activity: function() {
    return {
      id: uuid(),
      name: '',
      type: enums.activityTypes.default,
      draft: true,
      active: true
    };
  },
  people: function() {
    return {
      id: uuid(),
      firstName: '',
      lastName: '',
      draft: true,
      active: true
    };
  }
};
