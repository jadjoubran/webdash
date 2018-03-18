let appRoot = require("app-root-path").toString();
let npmLinkMode = process.argv.find(arg => arg.startsWith("--project="));
if (npmLinkMode) {
  appRoot = npmLinkMode.substr("--project=".length);
}

module.exports = appRoot;
