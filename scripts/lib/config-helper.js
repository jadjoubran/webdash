const fs = require("fs");
const FileHound = require("filehound");

module.exports = getConfig = root => {
  const fileExists = file => {
    return fs.existsSync(`${root}/${file}`);
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
      .discard(/sw|service-worker\.js/)
      .path(`${root}/${dist}`)
      .ext("js")
      .depth(1)
      .findSync();

    if (jsFiles.length) {
      let path = jsFiles[0];
      path = path.replace(`${root}/`, "");
      jsBudgetPath = "./" + path.substr(0, path.lastIndexOf("/")) + "/*.js";
    }
  } catch (error) {}

  try {
    const manifestFiles = FileHound.create()
      .ignoreHiddenDirectories()
      .ignoreHiddenFiles()
      .path(root)
      .discard(/bower_components|node_modules/)
      .match("manifest.json")
      .depth(3)
      .findSync();
    if (manifestFiles.length) {
      manifestPath = "./" + manifestFiles[0].replace(`${root}/`, "");
    } else {
      const webManifestFiles = FileHound.create()
        .ignoreHiddenDirectories()
        .ignoreHiddenFiles()
        .path(root)
        .discard(/bower_components|node_modules/)
        .match("site.webmanifest")
        .depth(3)
        .findSync();
      if (webManifestFiles.length) {
        manifestPath = "./" + webManifestFiles[0].replace(`${root}/`, "");
      }
    }
  } catch (err) {}

  return {
    src,
    dist,
    jsBudgetPath,
    manifestPath,
    serverScripts
  };
};
