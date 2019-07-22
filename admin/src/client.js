/* global API_URL */
import Client from 'djax-client';

const client = new Client({

  // Client's settings
  settings: {
    baseUrl: API_URL
  },

  // Default call options
  defaults: {
    type: 'GET',
    dataType: 'json',
    xhrFields: {
      withCredentials: true
    }
  },

  // Services
  services: {
    login: {
      url: '/login',
      type: 'POST',
      dataType: 'text'
    },
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
    suggest: {
      url: '/:model/:model?_suggest=:field'
    },
    rebootGatsby: {
      url: '/reboot-gatsby'
    }
  }
});

client.upload = function(file, callback) {
  const formData = new FormData();
  formData.append('file', file);

  fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData
  }).then(response => {
    return response.json();
  }).then(callback);
};

window.client = client;

export default client;
