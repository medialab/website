/* eslint no-console: 0 */

const {spawn} = require('child_process');

function log(data) {
  process.stdout.write(data);
}

class GatsbyProcess {
  constructor(cwd) {
    this.cwd = cwd;
    this.child = null;
    this.started = false;
  }

  start(callback) {
    const env = Object.assign({}, process.env);

    // Forcing development env for gatsby
    env.NODE_ENV = '';

    this.child = spawn(
      'gatsby',
      ['develop', '--host', '0.0.0.0'],
      {
        cwd: this.cwd,
        env
      }
    );

    const {stdout, stderr} = this.child;

    const handler = data => {
      data = String(data);

      if (data.includes('___graphql')) {
        stdout.removeListener('data', handler);

        if (callback)
          callback();
      }
    };

    stdout.on('data', handler);

    stdout.on('data', log);
    stderr.on('data', log);

    this.started = true;
  }

  restart(callback) {
    console.log('Restarting gatsby...');
    this.child.on('close', () => {
      this.start(callback);
    });
    this.child.kill();
  }

  kill() {
    this.child.kill();
    this.started = false;
  }
}

module.exports = GatsbyProcess;
