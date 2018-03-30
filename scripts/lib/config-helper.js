const fs = require("fs");
const FileHound = require("filehound");
const appRoot = require("./../app-root");


const fileExists = file => {
  return fs.existsSync(`${appRoot}/${file}`);
};

let src = "./src/";
let dist = "./dist/";
let jsBudgetPath = `${dist}*.js`;
let manifestPath = `${src}manifest.json`;
const serverScripts = ["start", "dev", "serve", "server", "watch"];

if (fileExists("src")) {
  src = "./src/";
} else if (fileExists("source")) {
  src = "./source/";
} else {
  src = "./";
}

if (fileExists("dist")) {
  dist = "./dist/";
} else if (fileExists("build")) {
  dist = "./build/";
} else if (fileExists("build_production")) {
  dist = "./build_production";
}

try {
  const jsFiles = FileHound.create()
  .ignoreHiddenDirectories()
  .ignoreHiddenFiles()
  .path(`${appRoot}/${dist}`)
  .ext("js")
  .depth(1)
  .findSync();

  if (jsFiles.length) {
    let path = jsFiles[0];
    path = path.replace(`${appRoot}/`, "");
    jsBudgetPath =
    "./" + path.substr(0, path.lastIndexOf("/")) + "/*.js";
  }
}catch (error){

}

try {
  const manifestFiles = FileHound.create()
  .ignoreHiddenDirectories()
  .ignoreHiddenFiles()
  .path(appRoot)
  .discard(/bower_components|node_modules/)
  .match("manifest.json")
  .depth(3)
  .findSync();
  if (manifestFiles.length) {
    manifestPath = "./" + manifestFiles[0].replace(`${appRoot}/`, '');
  } else {
    const webManifestFiles = FileHound.create()
    .ignoreHiddenDirectories()
    .ignoreHiddenFiles()
    .path(appRoot)
    .discard(/bower_components|node_modules/)
    .match("site.webmanifest")
    .depth(3)
    .findSync();
    if (webManifestFiles.length) {
      manifestPath = "./" + webManifestFiles[0].replace(`${appRoot}/`, "");
    }
  }
}catch (err){

}

module.exports = {
  src,
  dist,
  jsBudgetPath,
  manifestPath,
  serverScripts
};
