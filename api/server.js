const path = require('path');
const express = require('express');
const config = require('config');
const fs = require('fs-extra');
const jsonServer = require('json-server');
const fileUpload = require('express-fileupload');

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

// json-server init
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(fileUpload());
server.use('/assets', express.static(ASSETS_PATH));
ROUTERS.forEach(({model, router}) => server.use(`/${model}`, router));

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

// Serving
console.log(`Listening on port ${PORT}...`);
server.listen(PORT);
