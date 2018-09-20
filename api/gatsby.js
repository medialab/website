const {spawn} = require('child_process');

function log(data) {
  process.stdout.write(data);
}

class GatsbyProcess {
  constructor(cwd) {
    this.cwd = cwd;
    this.child = null;
  }

  start(callback) {
    this.child = spawn('gatsby', ['develop'], {cwd: this.cwd});

    const {stdout, stderr} = this.child;

    const handler = data => {
      data = String(data);

      if (data.includes('___graphql')) {
        stdout.off('data', handler);

        if (callback)
          callback();
      }
    };

    stdout.on('data', handler);

    stdout.on('data', log);
    stderr.on('data', log);
  }

  restart(callback) {
    console.log('Restarting gatsby...');
    this.child.on('close', () => {
      this.start(callback);
    });
    this.child.kill();
  }
}

module.exports = GatsbyProcess;
