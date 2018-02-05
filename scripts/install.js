const fs = require('fs');
const { COPYFILE_EXCL } = fs.constants;

fs.copyFile('./webdash.json', 'webdash.json', COPYFILE_EXCL, (err) => {
    if (err){
        //configuration file already exists, we can safely proceed
    }
    console.log('Configuration file created at webdash.json');
});