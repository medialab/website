const uuid = require('uuid/v4');

module.exports = {
  activity: function() {
    return {
      id: uuid(),
      name: ''
    };
  },
  people: function() {
    return {
      id: uuid(),
      firstName: '',
      lastName: ''
    };
  }
};
