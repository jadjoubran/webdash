const isGlobal = require("is-global");
let appRoot = require("app-root-path").toString();

//if webdash is running as global
if (isGlobal()){
  appRoot = process.cwd();
}

let npmLinkMode = process.argv.find(arg => arg.startsWith("--project="));
if (npmLinkMode) {
  appRoot = npmLinkMode.substr("--project=".length);
}

module.exports = appRoot;
