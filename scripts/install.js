const fs = require('fs');
const pkgDir = require('pkg-dir');
const { COPYFILE_EXCL } = fs.constants;

const appRoot = pkgDir.sync(__dirname);

fs.copyFile(`${__dirname}/webdash-config.json`, `${appRoot}/webdash.json`, COPYFILE_EXCL, (err) => {
    if (err) {
        //configuration file already exists, we can safely proceed
        return false;
    }
    console.log('Configuration file created at webdash.json');
});