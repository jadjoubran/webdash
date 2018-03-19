#!/usr/bin/env node
const chalk = require('chalk');

const serveOptions = yargs => {
  yargs
  .positional('port', {
    describe: 'port to bind on',
    default: 3456
  });
}

const serveCommand = argv => {
  const app = require('./serve.js');
  const port = argv.port;
  app.listen(port, () => {
    const url = chalk.underline(`http://localhost:${port}`);
    const message = chalk.keyword('green').bold(`Webdash running on port ${url}!`);
    console.log(message);
  });
};

require('yargs') // eslint-disable-line
.command('serve [port]', 'start webdash server', serveOptions, serveCommand)
.command('$0', 'the default command', serveOptions, serveCommand)
.argv
