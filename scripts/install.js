const { appRootNoGlobal } = require("./app-root");
const getConfig = require("./lib/config-helper");

const { writeConfig } = require("./lib/write-config");

const root = appRootNoGlobal;

writeConfig(root, getConfig(root));
