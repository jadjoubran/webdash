const express = require('express');

require('./api.js');

const app = express();

app.use(express.static('./build/es6-bundled'));

app.use('/bower_components', express.static('./bower_components/'));

app.get('/', (req, res) => {
    res.sendFile("build/es6-bundled", { root: __dirname })
});

app.listen(3001, () => {
    console.log('Example app listening on port 3000!');
});