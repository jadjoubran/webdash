const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const getPlugins = require("./lib/get-plugins");

const appRoot = require('./app-root');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const getConfig = () => {
  let config = {};
  if (fs.existsSync(`${appRoot}/webdash.json`)) {
    config = require(`${appRoot}/webdash.json`);
  }
  return config;
};

app.locals.config = getConfig();

app.locals.appRoot = appRoot;

if (!fs.existsSync(`${appRoot}/package.json`)) {
    console.log('No package.json file.');
    process.exit();
}
const packageJson = require(`${appRoot}/package.json`);
if (!packageJson.devDependencies) {
    console.log('No devDependencies in package.json.');
    process.exit();
}

const plugins = getPlugins(packageJson);

for (const plugin of plugins) {
  const apiPath = `${appRoot}/node_modules/${plugin}/api.js`;
  if (!fs.existsSync(apiPath)) {
    continue;
  }
  const pluginSrc = require(apiPath);

  if (!pluginSrc.routes) {
    continue;
  }
  //remove leading "webdash-"
  const pluginRoute = plugin.replace(/^webdash\-/, "");
  const routes = pluginSrc.routes;
  if (routes.get) {
    for (const [route, handler] of Object.entries(routes.get)) {
      app.get(`/${pluginRoute}/${route}`, handler);
    }
  }
  if (routes.post) {
    for (const [route, handler] of Object.entries(routes.post)) {
      app.post(`/${pluginRoute}/${route}`, handler);
    }
  }
}

app.get("/webdash/info", (req, res) => {
  let appName = packageJson.name;
  if (!appName) {
    //fallback to folder name
    appName = appRoot.substr(appRoot.lastIndexOf("/") + 1);
  }
  const appPath = appRoot;
  let version = "";

  if (fs.existsSync("webdash/package.json")) {
    version = require("webdash/package.json").version;
  } else {
    version = require(`${appRoot}/package.json`).version;
  }

  res.send({ appName, appPath, version });
});

app.get("/webdash/config", (req, res) => {
  let config = {};
  if (fs.existsSync(`${appRoot}/webdash.json`)) {
    config = require(`${appRoot}/webdash.json`);
  }

  res.send({ config });
});

app.get("/webdash/plugins", (req, res) => {
  const plugins = getPlugins(packageJson);

  res.send({ plugins });
});

app.use(express.static(__dirname + "/build/es6-bundled"));

app.get("*", function(req, res) {
  res.sendFile("index.html", { root: "." });
});

module.exports = app;
