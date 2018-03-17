const express = require('express');

const api = require('./api.js');

const app = express();

const isLocal = process.argv.includes('--local');

const basePath = isLocal ? '/../' : '/../build/default';

app.use('/api', api);

app.use(express.static(__dirname + basePath));

app.use('/', express.static('./bower_components/'));
app.use('/bower_components', express.static('./bower_components/'));
app.use('/bower_components/bower_components', express.static('./bower_components/'));

app.get('/', (req, res) => {
    res.sendFile(basePath + "/index.html", { root: __dirname })
});

module.exports = app;
