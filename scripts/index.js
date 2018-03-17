#!/usr/bin/env node

const serveOptions = yargs => {
  yargs
  .positional('port', {
    describe: 'port to bind on',
    default: 3001
  });
}

const serveCommand = argv => {
  const app = require('./serve.js');
  const port = argv.port;
  app.listen(port, () => {
    console.log(`Webdash running on port ${port}!`);
  });
};

require('yargs') // eslint-disable-line
.command('serve [port]', 'start webdash server', serveOptions, serveCommand)
.command('$0', 'the default command', serveOptions, serveCommand)
.argv
