const express = require('express');

const api = require('./api.js');

const app = express();

app.use('/api', api);

app.use(express.static(__dirname + '/build/es6-bundled'));

app.use('/bower_components', express.static('./bower_components/'));

app.get('/', (req, res) => {
    res.sendFile("build/es6-bundled/index.html", { root: __dirname })
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});