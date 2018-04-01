const fs = require("fs");
const ora = require("ora");
const appRoot = require("./app-root");
const configHelper = require('./lib/config-helper');


const spinner = ora(
  "Tailoring webdash for you. Saving configuration in webdash.json"
).start();

//isGlobal in ./app-root will return true when running `npm install --save-dev webdash`
const configPath = `${appRoot}/../../webdash.json`;

const webdashConfig = {
  src: configHelper.src,
  dist: configHelper.dist,
  jsBudgetLimit: 200, //kb
  jsBudgetPath: configHelper.jsBudgetPath,
  manifestPath: configHelper.manifestPath,
  readableAssets: {
    "./src/assets/": "/assets/"
  },
  serverScripts: configHelper.serverScripts
};

const writeConfig = () => {
  fs.writeFile(
    configPath,
    JSON.stringify(webdashConfig, null, 4),
    err => {
      if (err) return console.error(err);

      console.log("Configuration file created at webdash.json");
    }
  );
};

if (!fs.existsSync(configPath)) {
  writeConfig();
}
spinner.stop();
