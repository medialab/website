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
    }
  }
});

window.client = client;

export default client;
