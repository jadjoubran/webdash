const fs = require("fs");

const writeConfig = (root, config) => {
  const webdashConfig = {
    src: config.src,
    dist: config.dist,
    jsBudgetLimit: 200, //kb
    jsBudgetPath: config.jsBudgetPath,
    manifestPath: config.manifestPath,
    readableAssets: {
      "./src/assets/": "/assets/"
    },
    serverScripts: config.serverScripts
  };

  const configPath = `${root}/webdash.json`;
  if (!fs.existsSync(configPath)) {
    fs.writeFile(configPath, JSON.stringify(webdashConfig, null, 4), err => {
      if (err) return console.error(err);

      console.log("Configuration file created at webdash.json");
    });
  }
};

module.exports = { writeConfig };
