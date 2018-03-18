const fs = require("fs");
const FileHound = require("filehound");
const appRoot = require("app-root-path").toString();


const fileExists = file => {
  return fs.existsSync(`${appRoot}/${file}`);
};

let src = "./src/";
let dist = "./dist/";
let jsBudgetPath = `${dist}*.js`;
let manifestPath = `${src}manifest.json`;

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

const jsFiles = FileHound.create()
  .ignoreHiddenDirectories()
  .ignoreHiddenFiles()
  .paths(dist)
  .ext("js")
  .depth(1)
  .findSync();

if (jsFiles.length) {
  jsBudgetPath =
    "./" + jsFiles[0].substr(0, jsFiles[0].lastIndexOf("/")) + "/*.js";
}

const manifestFiles = FileHound.create()
  .ignoreHiddenDirectories()
  .ignoreHiddenFiles()
  .path("./")
  .discard(/bower_components|node_modules/)
  .match("manifest.json")
  .depth(3)
  .findSync();
if (manifestFiles.length) {
  manifestPath = "./" + manifestFiles[0];
} else {
  const webManifestFiles = FileHound.create()
    .ignoreHiddenDirectories()
    .ignoreHiddenFiles()
    .path("./")
    .discard(/bower_components|node_modules/)
    .match("site.webmanifest")
    .depth(3)
    .findSync();
  if (webManifestFiles.length) {
    manifestPath = "./" + webManifestFiles[0];
  }
}

module.exports = {
  src,
  dist,
  jsBudgetPath,
  manifestPath
};
