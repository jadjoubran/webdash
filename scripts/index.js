#!/usr/bin/env node
const chalk = require('chalk');
const opn = require('opn')
require('./checks');

const serveOptions = yargs => {
  yargs
  .positional('port', {
    describe: 'port to bind on',
    default: 3456
  })
  .positional('host', {
    describe: 'hostname',
    default: 'localhost'
  });
}

const serveCommand = argv => {
  const app = require('./serve.js');
  const port = argv.port;
  const host = argv.host;
  app.listen(port, host, () => {
    const url = chalk.underline(`http://${host}:${port}`);
    const message = chalk.keyword('green').bold(`Webdash running on ${url}!`);
    console.log(message);
    opn(url)
  });
};

require('yargs') // eslint-disable-line
.command('serve [--port] [--host]', 'start webdash server', serveOptions, serveCommand)
.command('$0', 'the default command', serveOptions, serveCommand)
.version()
.alias('version', 'v')
.argv
