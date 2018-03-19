const express = require("express");
const fs = require("fs");
const api = require("./api.js");
const getPlugins = require("./lib/get-plugins");

const app = express();

const isLocal = process.argv.includes("--local");
const basePath = isLocal ? "/../" : "/../build/default";
const appRoot = require("./app-root");

app.use("/api", api);
app.use(express.static(__dirname + basePath));
app.use("/node_modules", express.static("./node_modules/"));
app.use(
  "/bower_components",
  express.static("./node_modules/webdash/bower_components/")
);

const packageJson = require(`${appRoot}/package.json`);
const plugins = getPlugins(packageJson);

//need to map /bower_components to every plugins' bower_components
for (const plugin of plugins) {
  app.use(
    "/bower_components",
    express.static(`./node_modules/${plugin}/bower_components/`)
  );
}

if (fs.existsSync(`${appRoot}/webdash.json`)) {
  const webdashConfig = require(`${appRoot}/webdash.json`);
  if (webdashConfig && webdashConfig.readableAssets) {
    const readableAssets = webdashConfig.readableAssets;
    const userPath = Object.keys(readableAssets)[0];
    const publicPath = Object.values(readableAssets)[0];

    //expose userPath as publicPath
    app.use(publicPath, express.static(userPath));
  }
}

app.get("/", (req, res) => {
  res.sendFile(basePath + "/index.html", { root: __dirname });
});

module.exports = app;
