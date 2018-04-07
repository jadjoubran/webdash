#!/usr/bin/env node
const chalk = require("chalk");
require("./checks");

const serveOptions = yargs => {
  yargs
    .positional("port", {
      describe: "port to bind on",
      default: 3456
    })
    .positional("host", {
      describe: "hostname",
      default: "localhost"
    });
};

const serveCommand = argv => {
  const opn = require("opn");
  const app = require("./serve");
  const port = argv.port;
  const host = argv.host;
  app.listen(port, host, () => {
    const url = `http://${host}:${port}`;
    const formattedUrl = chalk.underline(url);
    const message = chalk
      .keyword("green")
      .bold(`Webdash running on ${formattedUrl}!`);
    console.log(message);

    try {
      opn(url);
    } catch (error) {
      //couldn't serve webdash, no big deal: end-users can open it manually
    }
  });
};

const configCommand = argv => {
  const { writeConfig } = require("./lib/write-config");
  const getConfig = require("./lib/config-helper");

  const root = process.cwd();

  writeConfig(root, getConfig(root));
};

require("yargs") // eslint-disable-line
  .command(
    "serve [--port] [--host]",
    "start webdash server",
    serveOptions,
    serveCommand
  )
  .command(
    "config",
    "Generate webadsh.json configuration file in this directory",
    {},
    configCommand
  )
  .command("$0", "Defaults to webdash serve", serveOptions, serveCommand)
  .version()
  .alias("version", "v").argv;
