import Client from 'djax-client';

const client = new Client({

  // Client's settings
  settings: {
    baseUrl: 'http://localhost:3000'
  },

  // Default call options
  defaults: {
    type: 'GET',
    dataType: 'json'
  },

  // Services
  services: {
    list: '/:model/:model',
    get: '/:model/:model/:id',
    post: {
      url: '/:model/:model',
      contentType: 'application/json',
      type: 'POST'
    },
    put: {
      url: '/:model/:model/:id',
      contentType: 'application/json',
      type: 'PUT'
    },
    rebootGatsby: {
      url: '/reboot-gatsby'
    }
  }
});

client.upload = function(data, callback) {
  fetch('http://localhost:3000/upload', {
    method: 'POST',
    body: data
  }).then(callback);
};

window.client = client;

export default client;
