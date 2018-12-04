/* eslint no-console: 0 */
const http = require('http');
const path = require('path');
const async = require('async');
const express = require('express');
const config = require('config');
const jsonServer = require('json-server');
const fileUpload = require('express-fileupload');
const uuid = require('uuid/v4');
const rimraf = require('rimraf');
const simpleGit = require('simple-git');
const fs = require('fs-extra');
const io = require('socket.io');

const dump = require('./dump.js');
const middlewares = require('./middlewares.js');
const GatsbyProcess = require('./gatsby.js');

const MODELS = require('../specs/models.json');

// Constants
const PORT = config.get('port');
const DATA_PATH = config.get('data');
const DUMP_CONF = config.get('dump');
const ASSETS_PATH = path.join(DATA_PATH, 'assets');

// Ensuring we have the minimal file architecture
fs.ensureDirSync(DATA_PATH);
fs.ensureDirSync(path.join(DATA_PATH, 'assets'));
fs.ensureDirSync(DUMP_CONF.path);

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

process.on('exit', () => gatsby.kill());

// json-server init
const app = jsonServer.create();
const jsonServerMiddlewares = jsonServer.defaults();

app.use(jsonServerMiddlewares);
app.use(jsonServer.bodyParser);
app.use(fileUpload());
app.use('/assets', express.static(ASSETS_PATH));

ROUTERS.forEach(({model, router}) => {
  app.use(`/${model}`, middlewares.lastUpdated, router);
});
app.use('/settings', jsonServer.router(path.join(DATA_PATH, 'settings.json')));

// custom routes
app.post('/upload', (req, res) => {
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

app.get('/reboot-gatsby', (req, res) => {
  gatsby.restart(() => res.status(200).send('Ok'));
});

// Starting gatsby
gatsby.start();

// Creating server
const server = http.Server(app);

// Serving websockets
const ws = io(server);

const LOCKS = {
  deployStatus: 'free'
};

const changeDeployStatus = (newStatus) => {
  LOCKS.deployStatus = newStatus;
  ws.emit('deployStatusChanged', newStatus);
};

ws.on('connection', socket => {

  // When retrieving deploy status
  socket.on('getDeployStatus', (data, callback) => {
    callback(null, {status: LOCKS.deployStatus});
  });

  // When triggering deploy
  socket.on('deploy', () => {

    const git = simpleGit(DUMP_CONF.path);

    async.series({

      // 1) Cleanup
      cleanup(next) {
        changeDeployStatus('cleaning');

        rimraf(path.join(DUMP_CONF.path), next);
      },

      // 2) Dumping the files
      dump(next) {
        changeDeployStatus('dumping');
        dump(DUMP_CONF.path);

        process.nextTick(next);
      },

      // 3) Committing the dump
      commit(next) {
        changeDeployStatus('committing');

        git
          .init()
          .addRemote('origin', DUMP_CONF.repository)
          .pull('origin', 'master')
          .add('./*')
          .commit('New dump')
          .push('origin', 'master', next);
      }

    }, err => {
      if (err)
        console.error(err);

      setTimeout(() => changeDeployStatus('free'), 1000);
    });
  });
});

// Listening
console.log(`Listening on port ${PORT}...`);
server.listen(PORT);
