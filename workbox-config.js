module.exports = {
  globDirectory: "build/default",
  globPatterns: ["**/*.{html,js,png,xml,ico,svg,json}"],
  globIgnores: ["bower_components/**"],
  swDest: "build/default/service-worker.js",
  swSrc: "src-service-worker.js"
};
