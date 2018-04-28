importScripts("workbox-v3.0.1/workbox-sw.js");

//disable debug since webdash is mostly run from localhost
workbox.setConfig({ debug: false });

workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
  /bower_components\//,
  workbox.strategies.cacheFirst()
);
