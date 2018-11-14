/* eslint no-console: 0 */
const path = require('path');
const express = require('express');
const config = require('config');
const jsonServer = require('json-server');
const fileUpload = require('express-fileupload');

const middlewares = require('./middlewares.js');
const GatsbyProcess = require('./gatsby.js');

const MODELS = require('../specs/models.json');

// Constants
const PORT = config.get('port');
const DATA_PATH = config.get('data');
const ASSETS_PATH = path.join(DATA_PATH, 'assets');

const ROUTERS = MODELS.map(model => {
  return {
    model,
    router: jsonServer.router(path.join(DATA_PATH, `${model}.json`))
  };
});

const gatsby = new GatsbyProcess('./site');

// json-server init
const server = jsonServer.create();
const jsonServerMiddlewares = jsonServer.defaults();

server.use(jsonServerMiddlewares);
server.use(jsonServer.bodyParser);
server.use(fileUpload());
server.use('/assets', express.static(ASSETS_PATH));

ROUTERS.forEach(({model, router}) => {
  server.use(`/${model}`, middlewares.lastUpdated, router);
});

// custom routes
server.post('/upload', (req, res) => {
  const file = req.files.file;

  if (!file)
    return res.status(400).send('No file.');

  file.mv(path.join(ASSETS_PATH, file.name), err => {
    if (err)
      return res.status(500).send(err);

    return res.status(200).send('Ok');
  });
});

server.get('/reboot-gatsby', (req, res) => {
  gatsby.restart(() => res.status(200).send('Ok'));
});

// Starting gatsby
gatsby.start();

// Serving
console.log(`Listening on port ${PORT}...`);
server.listen(PORT);
