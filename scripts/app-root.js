const isGlobal = require("is-global");
let appRoot = require("app-root-path").toString();
console.log({appRoot});

//if webdash is running as global
//gotcha: isGlobal will return true when running `npm install --save-dev webdash`
// if (isGlobal()){
  // appRoot = process.cwd();
// }

let npmLinkMode = process.argv.find(arg => arg.startsWith("--project="));
if (npmLinkMode) {
  appRoot = npmLinkMode.substr("--project=".length);
}

module.exports = appRoot;
