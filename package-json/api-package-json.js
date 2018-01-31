module.exports = {
    routes: {
        get: {
            'package-json': (req, res) => {
                const package = require('./../package.json');
                const result = { package };

                res.send(result);
            }
        }
    }
}