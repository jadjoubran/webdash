const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const plugins = [
    'webdash-package-json',
];


for (const plugin of plugins) {
    const pluginSrc = require(`./bower_components/${plugin}/api.js`);
    if (!pluginSrc.routes) {
        continue;
    }
    const routes = pluginSrc.routes;
    if (routes.get) {
        for (const [route, handler] of Object.entries(routes.get)) {
            app.get(`/api/${plugin}/${route}`, handler);
        }
    }
}

//return list of webdash plugins
app.get('/api/webdash/plugins', (req, res) => {

    const bowerJson = require('./bower.json');
    if (!bowerJson){
        return [];
    }
    const deps = Object.keys(bowerJson.devDependencies);
    if (!deps){
        return [];
    }

    const plugins = deps.filter(dep => dep.startsWith('webdash-'));

    res.send({plugins});
});


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});