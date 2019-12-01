/* eslint no-console: 0 */
const url = require('url');
const http = require('http');
const path = require('path');
const querystring = require('querystring');
const async = require('async');
const express = require('express');
const exec = require('child_process').exec;
const jsonServer = require('json-server');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const uuid = require('uuid/v4');
const rimraf = require('rimraf');
const simpleGit = require('simple-git');
const CronJob = require('cron').CronJob;
const mime = require('mime-types');
const get = require('lodash/fp/get');
const set = require('lodash/fp/set');
const fs = require('fs-extra');
const io = require('socket.io');

const {build: wilsonBuild} = require('../wilson');
const utils = require('./utils.js');
const dump = require('./dump.js');
const middlewares = require('./middlewares.js');
const Preview = require('../wilson/preview.js');

const {
  retrieveGithubFluxData,
  retrieveTwitterFluxData
} = require('./flux.js');

const {
  findUnusedAssets
} = require('./cleanup.js');

const loadDump = require('./load.js');

const MODELS = require('../specs/models.json');
const spire = require('./spire.js');
const oldSlugRedirections = require('./oldSlugRedirections.js');

const config = require('config-secrets');

// Constants
const ARGV = require('yargs')
  .option('--bypass-auth', {type: 'boolean', default: false})
  .option('--cron', {type: 'boolean', default: true})
  .argv;

const PORT = config.get('port');
const DATA_PATH = config.get('data');
const BUILD_CONF = config.get('build');
const DUMP_PATH = path.join(BUILD_CONF.path, 'dump');
const PUBLISH_DUMP_PATH = path.join(BUILD_CONF.path, 'publish-dump');
const PUBLISH_DATA_PATH = path.join(BUILD_CONF.path, 'publish-data');
const WBUILD_PATH = path.join(BUILD_CONF.path, 'site');
const SITE_SRC_PATH = path.join(__dirname, '..', 'site');
const ASSETS_PATH = path.join(DATA_PATH, 'assets');

// Ensuring we have the minimal file architecture
fs.ensureDirSync(DATA_PATH);
fs.ensureDirSync(path.join(DATA_PATH, 'assets'));
fs.ensureDirSync(BUILD_CONF.path);

const settingsPath = path.join(DATA_PATH, 'settings.json');

if (!fs.existsSync(settingsPath))
  fs.writeFileSync(
    settingsPath,
    JSON.stringify({
      settings: {
        home: {
          grid: [],
          slider: [],
          topActivities: []
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
const ROUTERS = MODELS.concat('settings').map(model => {
  return {
    model,
    router: jsonServer.router(path.join(DATA_PATH, `${model}.json`))
  };
});

const DBS = {};
ROUTERS.forEach(({model, router}) => (DBS[model] = router.db));

const PREVIEW = new Preview(DATA_PATH, '/preview', DBS, {linkToAdmin: 'TODO'});

// json-server init
const app = jsonServer.create();
const jsonServerMiddlewares = jsonServer.defaults();

app.use(jsonServerMiddlewares);
app.use(jsonServer.bodyParser);

app.use(session({
  cookie: {
    httpOnly: false
  },
  resave: false,
  secret: 'medialab',
  saveUninitialized: false
}));

const SUPERUSER = config.get('superuser');

// Login route
app.post('/login', function(req, res) {
  const {username, password} = req.body;

  if (
    username === SUPERUSER.username &&
    password === SUPERUSER.password
  ) {
    req.session.authenticated = true;
    return res.status(200).send('OK');
  }

  return res.status(401).send('Unauthorized');
});

app.get('/is-logged', function(req, res) {
  return res.json(!!(req.session && req.session.authenticated));
});

// Assets are served without auth to avoid canvas tainting and such...
app.use('/assets', express.static(ASSETS_PATH));

// From now on, routes are authenticated
if (!ARGV.bypassAuth)
  app.use(middlewares.authentication);

// TODO: move this before /upload to avoid mishap?
app.use(fileUpload());

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

      // TODO: we can do better...
      if (field === 'contacts.label' || field === 'attachments.label') {
        const target = field.split('.')[0];

        data.forEach(item => {
          if (!item[target])
            return;

          item[target].forEach(contact => values.add(contact.label));
        });
      }
      else {
        data.forEach(item => {
          const value = get(field, item);
          [].concat(value).forEach(v => values.add(v));
        });
      }

      data = Array.from(values).filter(x => x);
    }

    return res.json(data);
  };

  app.use(`/${model}`, middlewares.lastUpdated, router);
});

// Upload route
app.post('/upload', (req, res) => {
  const file = req.files.file;

  if (!file)
    return res.status(400).send('No file.');

  const ext = path.extname(file.name),
        filename = utils.cleanAssetName(path.basename(file.name, ext));

  const name = `${filename}_${uuid()}${ext}`;

  file.mv(path.join(ASSETS_PATH, name), err => {
    if (err)
      return res.status(500).send(err);

    return res.status(200).json({name, originalName: file.name});
  });
});

// Preview
const PREVIEW_PERMALINK_CLEANER = /^\/preview/;

app.get('/preview/medialab.css', (req, res) => {
  return res
    .header('Content-Type', 'text/css')
    .send(PREVIEW.getStylesheet());
});

app.use('/preview/font', express.static(path.join(SITE_SRC_PATH, 'assets', 'font')));
app.use('/preview/js', express.static(path.join(SITE_SRC_PATH, 'assets', 'js')));
app.use('/preview/img', express.static(path.join(SITE_SRC_PATH, 'assets', 'images')));

app.get('/preview/static/*.cover.*', (req, res) => {
  const buffer = PREVIEW.getCoverBuffer(req.url);

  if (!buffer)
    return res.status(404).send('Not Found.');

  return res
    .header('Content-Type', mime.lookup(req.url))
    .send(buffer);
});

app.use('/preview/static', express.static(ASSETS_PATH));

app.get('/preview/*', (req, res) => {
  const permalink = req.url.replace(PREVIEW_PERMALINK_CLEANER, '');

  return PREVIEW.renderPageForPermalink(permalink, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    if (!result)
      return res.status(404).send('Not Found.');

    return res.send(result.html);
  });
});

// Migration routes
const MIGRATION_SCHEMES = {
  'clean-html-metadata': require('./migrations/clean-html-metadata.js')(ASSETS_PATH),
  'clean-unused-assets': require('./migrations/clean-unused-assets.js')(ASSETS_PATH),
  'drop-important': require('./migrations/drop-important.js'),
  'drop-unpublished-spire-notices': require('./migrations/drop-unpublished-spire-notices.js'),
  'fix-asset-names': require('./migrations/fix-asset-names.js'),
  // 'fix-dates': require('./migrations/fix-dates.js'),
  // 'fix-minutes': require('./migrations/fix-minutes.js'),
  // 'fix-missing-processed': require('./migrations/fix-missing-processed.js'),
  'prod-cleanup': require('./migrations/prod-cleanup.js'),
  'reset-settings': require('./migrations/reset-settings.js'),
  'reslugify': require('./migrations/reslugify.js'),
  'refresh-generatedFields-productions': require('./migrations/refresh-generatedFields-productions.js'),
  'rollback': require('./migrations/rollback.js')(BUILD_CONF.rollbackRepository || BUILD_CONF.repository),
  'import-old-slug': require('./migrations/import-old-slug.js'),
  'fix-bad-url-attachments': require('./migrations/fix-bad-url-attachments.js')
};

app.get('/migrate/:scheme', (req, res) => {
  const scheme = req.params.scheme;
  const fn = MIGRATION_SCHEMES[scheme];

  if (typeof fn !== 'function')
    return res.status(404).send('Bad Scheme!');

  return fn(req, DBS, (err, result) => {
    if (err)
      return res.status(500).send('' + err);

    if (!result)
      return res.send('Success!');

    return res.json(result);
  });
});

// Transient data storage
const TRANSIENT_DATA = {
  lastBuildStart: null,
  lastBuildEnd: null,
  lastCommits: null
};

// Creating server
const server = http.Server(app);

// Websocket logic
const ws = io(server, {path: '/sockets'});

// Preview live reloading
PREVIEW.on('upgraded', () => {
  ws.emit('previewUpgraded');
});

const LOCKS = {
  buildStatus: 'free',
  deployStatus: 'free',
  spireStatus: 'free'
};

app.get('/admin', function(req, res) {
  return res.json({
    locks: LOCKS,
    info: TRANSIENT_DATA
  });
});

const changeBuildStatus = (newStatus) => {
  LOCKS.buildStatus = newStatus;
  ws.emit('buildStatusChanged', newStatus);
  ws.emit('locksChanged', LOCKS);

  if (newStatus === 'free')
    ws.emit('infoChanged', TRANSIENT_DATA);
};

const changeDeployStatus = (newStatus) => {
  LOCKS.deployStatus = newStatus;
  ws.emit('deployStatusChanged', newStatus);
  ws.emit('locksChanged', LOCKS);

  if (newStatus === 'free')
    ws.emit('infoChanged', TRANSIENT_DATA);
};

const changeSpireStatus = (newStatus) => {
  LOCKS.spireStatus = newStatus;
  ws.emit('spireStatusChanged', newStatus);
  ws.emit('locksChanged', LOCKS);
};

// Spire logic
function updateSpire(callback) {
  if (LOCKS.spireStatus !== 'free')
    return false;

  changeSpireStatus('working');

  return spire.aSPIRE(err => {
    changeSpireStatus('free');

    return callback(err);
  });
}

app.get('/aspire', (req, res) => {
  const willPerform = updateSpire(err => console.error(err));

  const payload = !willPerform ?
    {result: 'Already doing.'} :
    {result: 'Ok'};

  return res.json(payload);
});

// Flux logic
const PEOPLE_DB = ROUTERS.find(({model}) => model === 'people').router.db;

function retrieveFluxData(callback) {

  // Retrieving people data
  PEOPLE_DB.read();

  const people = PEOPLE_DB.getState().people;

  return async.parallel({
    github: next => {
      return retrieveGithubFluxData(people, (err, data) => {
        if (err)
          return next(err);

        fs.writeJson(path.join(DATA_PATH, 'github.json'), data, {spaces: 2}, next);
      });
    },
    twitter: next => {
      return retrieveTwitterFluxData((err, data) => {
        if (err)
          return next(err);

        fs.writeJson(path.join(DATA_PATH, 'twitter.json'), data, {spaces: 2}, next);
      });
    }
  }, err => {

    return callback(err);
  });
}

// Build data preparation logic
function prepareDataForBuild(callback) {
  fs.ensureDirSync(DUMP_PATH);
  fs.ensureDirSync(PUBLISH_DUMP_PATH);

  const git = simpleGit(PUBLISH_DUMP_PATH);

  function copyFluxData() {
    fs.copySync(
      path.join(DATA_PATH, 'github.json'),
      path.join(PUBLISH_DATA_PATH, 'github.json')
    );

    fs.copySync(
      path.join(DATA_PATH, 'twitter.json'),
      path.join(PUBLISH_DATA_PATH, 'twitter.json')
    );
  }

  // In local, if no repo is indicated, the worflow is a bit different
  const skipGit = !BUILD_CONF.repository;

  if (skipGit) {
    rimraf.sync(PUBLISH_DATA_PATH);

    return retrieveFluxData(err => {
      if (err)
        return callback(err);

      fs.copySync(DATA_PATH, PUBLISH_DATA_PATH);

      return callback();
    });
  }

  return async.series({

    // First we need to check the repo
    init(next) {
      return git
        .init()
        .getRemotes((err, remotes) => {
          if (err)
            return next(err);

          if (!remotes || !remotes.length)
            return git
              .addRemote('origin', BUILD_CONF.repository, next);

          return next();
        });
    },

    // Let's pull data from git
    pull(next) {
      return git.pull('origin', 'master', {'--depth': '5'}, next);
    },

    // Record last commits
    record(next) {

      return git.log(['-5'], (err, commits) => {
        if (err)
          return next(err);

        TRANSIENT_DATA.lastCommits = commits.all;

        return next();
      });
    },

    // Refreshing flux data
    flux(next) {
      return retrieveFluxData(next);
    },

    // Building data into shape
    load(next) {
      loadDump(PUBLISH_DUMP_PATH, PUBLISH_DATA_PATH);

      // Copying flux data
      copyFluxData();

      return next();
    }
  }, callback);
}

// Build logic
function buildStaticSite(callback) {
  console.log('Building site...');

  changeBuildStatus('cleaning');

  const lastBuildStart = Date.now();

  return async.series({

    // Preparing data
    preparingData(next) {
      changeBuildStatus('preparing');

      return prepareDataForBuild(next);
    },

    // Building static site
    building(next) {
      changeBuildStatus('building');

      return wilsonBuild(DATA_PATH, WBUILD_PATH, {skipDrafts: true}, next);
    },

    // Deploying using rsync
    rsync(next) {
      changeBuildStatus('rsync');

      const rsyncConfig = config.get('rsync');

      if (!rsyncConfig.target || !rsyncConfig.password) {
        console.log('Skipping rsync...');
        return next();
      }

      const built = path.join(WBUILD_PATH, '/');

      const command = [
        `RSYNC_PASSWORD=${rsyncConfig.password}`,
        `rsync -az --del ${built} --exclude="/publications" ${rsyncConfig.target}`
      ].join(' ');

      return exec(command, next);
    }
  }, err => {
    TRANSIENT_DATA.lastBuildStart = lastBuildStart;
    TRANSIENT_DATA.lastBuildEnd = Date.now();
    changeBuildStatus('free');
    return callback(err);
  });
}

// Building every 15 minutes
function buildTask() {

  // We can't run several build at once!
  if (
    LOCKS.buildStatus !== 'free' ||
    (LOCKS.deployStatus !== 'free' && LOCKS.deployStatus !== 'building')
  )
    return false;

  buildStaticSite(err => {
    if (err)
      console.error(err);
    else
      console.log('Done building site.');
  });

  return true;
}

const cron = new CronJob(BUILD_CONF.cron, buildTask);

if (ARGV.cron)
  cron.start();

// Need to update build
app.get('/build', (req, res) => {
  const willBuild = buildTask();

  const payload = !willBuild ?
    {result: 'Already building.'} :
    {result: 'Ok'};

  return res.json(payload);
});

// Deployment logic
function deploy(callback) {

  // In local, with no linked repo, we skip this
  if (!BUILD_CONF.repository)
    return false;

  // Don't deploy if already doing it
  if (LOCKS.deployStatus !== 'free')
    return false;

  // Git handle
  let git;

  async.series({

    // 1) Cleanup
    cleanup(next) {
      changeDeployStatus('cleaning');

      rimraf(DUMP_PATH, next);
    },

    // 2) Removing unused assets
    removingUnusedAssets(next) {
      const unused = findUnusedAssets(DBS, ASSETS_PATH);

      return async.each(Array.from(unused), (asset, n) => {
        console.log(`Dropping unused asset "${asset}"`);
        return fs.unlink(path.join(ASSETS_PATH, asset), n);
      }, next);
    },

    // 3) Pulling
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

    // 4) Wiping files
    wiping(next) {
      const toDelete = MODELS.map(m => path.join(DUMP_PATH, m, '*.json'));

      toDelete.push(path.join(DUMP_PATH, 'assets', '*'));
      toDelete.push(path.join(DUMP_PATH, 'settings.json'));

      async.each(toDelete, rimraf, next);
    },

    // 5) Dumping the files
    dump(next) {

      changeDeployStatus('dumping');
      dump(DUMP_PATH);

      process.nextTick(next);
    },

    // 6) Committing the dump
    commit(next) {
      changeDeployStatus('committing');

      git
        .cwd(DUMP_PATH)
        .add('./*')
        .commit('New dump')
        .push('origin', 'master', next);
    },

    // 7) Building the site
    build(next) {
      changeDeployStatus('building');

      if (LOCKS.buildStatus !== 'free')
        process.nextTick(next);

      return buildStaticSite(next);
    }
  }, err => {
    return setTimeout(() => {
      changeDeployStatus('free');

      return callback(err);
    }, 1000);
  });

  return true;
}

app.get('/deploy', function(req, res) {
  const willDeploy = deploy(err => console.error(err));

  const payload = !willDeploy ?
    {result: 'Already deploying.'} :
    {result: 'Ok'};

  return res.json(payload);
});

// Redirections
app.get('/redirects.nginx.conf', (req, res) => {
  oldSlugRedirections((err, redirections) => {
    if (err)
      return res.status(500).send(err);
    else
      return res.type('txt/*').send(redirections);
  });
});

// Listening
function startServer() {

  console.log('Spawning preview...');
  PREVIEW.compileAssets(err => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log(`Listening on port ${PORT}...`);
    server.listen(PORT);
  });
}

startServer();
