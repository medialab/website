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
    list: '/:model',
    get: '/:model/:id',
    post: {
      url: '/:model',
      type: 'POST'
    },
    put: {
      url: '/:model/:id',
      type: 'PUT'
    }
  }
});

export default client;
