const uuid = require('uuid/v4');

module.exports = {
  people: function() {
    return {
      id: uuid(),
      firstName: '',
      lastName: ''
    };
  }
};
