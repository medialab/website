/* eslint no-console: 0 */
const url = require('url');
const http = require('http');
const path = require('path');
const querystring = require('querystring');
const async = require('async');
const express = require('express');
const config = require('config');
const exec = require('child_process').exec;
const jsonServer = require('json-server');
const fileUpload = require('express-fileupload');
const uuid = require('uuid/v4');
const rimraf = require('rimraf');
const simpleGit = require('simple-git');
const get = require('lodash/fp/get');
const set = require('lodash/fp/set');
const fs = require('fs-extra');
const io = require('socket.io');

const dump = require('./dump.js');
const middlewares = require('./middlewares.js');
const GatsbyProcess = require('./gatsby.js');

const MODELS = require('../specs/models.json');

// Constants
const PORT = config.get('port');
const DATA_PATH = config.get('data');
const BUILD_CONF = config.get('build');
const DUMP_PATH = path.join(BUILD_CONF.path, 'dump');
const SITE_PATH = path.join(BUILD_CONF.path, 'site');
const ASSETS_PATH = path.join(DATA_PATH, 'assets');

// Ensuring we have the minimal file architecture
fs.ensureDirSync(DATA_PATH);
fs.ensureDirSync(path.join(DATA_PATH, 'assets'));
fs.ensureDirSync(BUILD_CONF.path);

if (!fs.pathExistsSync(SITE_PATH))
  fs.copySync(path.join(__dirname, '..', 'site'), SITE_PATH);

rimraf.sync(path.join(SITE_PATH, '.cache'));
rimraf.sync(path.join(SITE_PATH, 'public'));

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

  // Adding fields projection
  router.render = (req, res) => {
    const parsed = url.parse(req.url);
    let data = res.locals.data;

    const query = querystring.parse(parsed.query);

    if (query._fields) {
      const fields = query._fields.split(',');

      data = data.map(item => {
        if (fields.length === 1)
          return get(fields[0], item);

        let result = {};

        fields.forEach(field => {
          result = set(field, get(field, item), result);
        });

        return result;
      }).filter(x => x);
    }

    if (query._suggest) {
      const field = query._suggest;

      const values = new Set();

      data.forEach(item => {
        const value = get(field, item);

        [].concat(value).forEach(v => values.add(v));
      });

      data = Array.from(values);
    }

    return res.json(data);
  };

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

    // Git handle
    let git;

    // NOTE: we could do some things in parallel to gain some time

    async.series({

      // 1) Cleanup
      cleanup(next) {
        changeDeployStatus('cleaning');

        rimraf(DUMP_PATH, next);
      },

      // 2) Pulling
      pull(next) {
        changeDeployStatus('pulling');

        fs.ensureDirSync(DUMP_PATH);

        git = simpleGit(DUMP_PATH);

        git
          .cwd(DUMP_PATH)
          .init()
          .addRemote('origin', BUILD_CONF.repository)
          .pull('origin', 'master', next);
      },

      // 3) Wiping files
      wiping(next) {
        const toDelete = MODELS.map(m => path.join(DUMP_PATH, m, '*.json'));

        toDelete.push(path.join(DUMP_PATH, 'assets', '*'));
        toDelete.push(path.join(DUMP_PATH, 'settings.json'));

        async.each(toDelete, rimraf, next);
      },

      // 4) Dumping the files
      dump(next) {

        changeDeployStatus('dumping');
        dump(DUMP_PATH);

        process.nextTick(next);
      },

      // 5) Committing the dump
      commit(next) {
        changeDeployStatus('committing');

        git
          .cwd(DUMP_PATH)
          .add('./*')
          .commit('New dump')
          .push('origin', 'master', next);
      },

      // 6) Dropping last build
      droppingLastBuild(next) {
        return rimraf(path.join(SITE_PATH, 'public'), next);
      },

      // 7) Building static site
      building(next) {
        changeDeployStatus('building');

        const env = Object.assign({}, process.env);

        env.ROOT_PATH = path.resolve(__dirname, '..');

        return exec('gatsby build', {cwd: SITE_PATH, env}, err => {
          if (err)
            return next(err);

          return next();
        });
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
