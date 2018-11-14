const uuid = require('uuid/v4');

module.exports = {
  activity: function() {
    return {
      id: uuid(),
      name: '',
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
