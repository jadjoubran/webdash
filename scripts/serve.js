const express = require('express');
const fs = require('fs');
const api = require('./api.js');

const app = express();

const isLocal = process.argv.includes('--local');

const basePath = isLocal ? '/../' : '/../build/default';

app.use('/api', api);

app.use(express.static(__dirname + basePath));

app.use('/bower_components', express.static('./bower_components/'));

if (fs.existsSync(`${basePath}/webdash.json`)) {
    const webdashConfig = require(`${basePath}/webdash.json`);
    if (webdashConfig && webdashConfig.readableAssets){
      const readableAssets = webdashConfig.readableAssets;
      const userPath = Object.keys(readableAssets)[0];
      const publicPath = Object.values(readableAssets)[0];

      //expose userPath as publicPath
      app.use(publicPath, express.static(userPath));
    }
}

app.get('/', (req, res) => {
    res.sendFile(basePath + "/index.html", { root: __dirname })
});

module.exports = app;
