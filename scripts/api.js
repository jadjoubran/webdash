const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const appRoot = require('./approot');

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

if (!fs.existsSync(`${appRoot}/bower.json`)) {
    console.log('No bower.json file.');
    process.exit();
}
const bowerJson = require(`${appRoot}/bower.json`);
if (!bowerJson.devDependencies) {
    console.log('No devDependencies in bower.json.');
    process.exit();
}

const plugins = getPlugins(bowerJson);

for (const plugin of plugins) {
  const apiPath = `${appRoot}/bower_components/${plugin}/api.js`;
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
  const packageJson = require(`${appRoot}/package.json`);
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
  const plugins = getPlugins(bowerJson);

  res.send({ plugins });
});

app.use(express.static(__dirname + "/build/es6-bundled"));

app.get("*", function(req, res) {
  res.sendFile("index.html", { root: "." });
});

function getPlugins(bowerJson) {
  if (!bowerJson) {
    return [];
  }
  const deps = Object.keys(bowerJson.devDependencies);
  if (!deps) {
    return [];
  }

  return deps.filter(dep => dep.startsWith("webdash-"));
}

module.exports = app;
