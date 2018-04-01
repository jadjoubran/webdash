const isGlobal = require("is-global");
let appRoot = require("app-root-path").toString();
console.log({appRoot});
//if webdash is running as global
if (isGlobal()){
  console.log('is global');
  appRoot = process.cwd();
  console.log({appRoot});
}

let npmLinkMode = process.argv.find(arg => arg.startsWith("--project="));
if (npmLinkMode) {
  appRoot = npmLinkMode.substr("--project=".length);
}
console.log({appRoot});
module.exports = appRoot;
