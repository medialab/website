const fs = require('fs');

//this module wrapps the config lib in order to use Secret files for sensitive info by default

// Loading secret files declared in the conf if they exists
const deafultConfig = require('../config/default.json');
deafultConfig.varsInSecretFiles.forEach(envVar => {
    if (process.env[`${envVar}_FILE`]) {
        process.env[envVar] = fs.readFileSync(process.env[`${envVar}_FILE`], 'utf8').trim();
        console.log(`${envVar} loaded from secret file`);
    }
});
// load the config after secret pre-load
const config = require('config-uncached')();
module.exports = config;
