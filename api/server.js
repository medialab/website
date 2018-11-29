/* eslint no-console: 0 */
const path = require('path');
const express = require('express');
const config = require('config');
const jsonServer = require('json-server');
const fileUpload = require('express-fileupload');
const uuid = require('uuid/v4');
const fs = require('fs-extra');

const middlewares = require('./middlewares.js');
const GatsbyProcess = require('./gatsby.js');

const MODELS = require('../specs/models.json');

// Constants
const PORT = config.get('port');
const DATA_PATH = config.get('data');
const ASSETS_PATH = path.join(DATA_PATH, 'assets');

// Ensuring we have the minimal file architecture
fs.ensureDirSync(DATA_PATH);
fs.ensureDirSync(path.join(DATA_PATH, 'assets'));

const settingsPath = path.join(DATA_PATH, 'settings.json');
if (!fs.existsSync(settingsPath))
  fs.writeFileSync(
    settingsPath,
    JSON.stringify({
      settings: {
        home: {
          editorialization: []
        }
      }
    }, null, 2)
  );

MODELS.forEach(model => {
  const p = path.join(DATA_PATH, `${model}.json`);

  if (!fs.existsSync(p))
    fs.writeFileSync(
      p,
      JSON.stringify({[model]: []}, null, 2)
    );
});

// Creating routers
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
server.use('/settings', jsonServer.router(path.join(DATA_PATH, 'settings.json')));

// custom routes
server.post('/upload', (req, res) => {
  const file = req.files.file;

  if (!file)
    return res.status(400).send('No file.');

  const name = `${uuid()}_${file.name}`;

  file.mv(path.join(ASSETS_PATH, name), err => {
    if (err)
      return res.status(500).send(err);

    return res.status(200).json({name});
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
