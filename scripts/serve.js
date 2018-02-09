const express = require('express');

const api = require('./api.js');

const app = express();

const isLocal = process.argv.includes('--local');

const basePath = isLocal ? '/../' : '/../build/es6-bundled';
console.log(basePath);

app.use('/api', api);

app.use(express.static(__dirname + basePath));

app.use('/bower_components', express.static('./bower_components/'));

app.get('/', (req, res) => {
    res.sendFile(basePath + "/index.html", { root: __dirname })
});

app.listen(3000, () => {
    console.log('Webdash running on port 3000!');
});