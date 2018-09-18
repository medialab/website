const path = require('path');

const config = require('config');
const fs = require('fs-extra');
const jsonServer = require('json-server');

// Constants
const PORT = config.get('port');
const DB_PATH = path.join(config.get('data'), 'db.json');
fs.ensureFileSync(DB_PATH);

// json-server init
const server = jsonServer.create();
const router = jsonServer.router(DB_PATH);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Serving
console.log(`Listening on port ${PORT}...`);
server.listen(PORT);
