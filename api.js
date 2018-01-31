const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const plugins = [
    'package-json',
];


for (const plugin of plugins) {
    const pluginSrc = require(`./${plugin}/api-${plugin}.js`);
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

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});