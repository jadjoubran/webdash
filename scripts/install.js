const fs = require('fs');
const { COPYFILE_EXCL } = fs.constants;

console.log(`${__dirname }/webdash-config.json`);
fs.copyFile(`${__dirname}/webdash-config.json`, 'webdash.json', COPYFILE_EXCL, (err) => {
    if (err){
        //configuration file already exists, we can safely proceed
    }
    console.log('Configuration file created at webdash.json');
});