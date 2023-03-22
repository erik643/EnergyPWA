/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-a4536b13'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "assets/index.8f5a6c0c.js",
    "revision": null
  }, {
    "url": "assets/index.ee439e6e.css",
    "revision": null
  }, {
    "url": "css/all.min.css",
    "revision": "3d5ef2bf867c4054a2f336cdbad9e1dc"
  }, {
    "url": "index.html",
    "revision": "86fe6796940719a9c13620d73f8b39a4"
  }, {
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "images/icons/android-chrome-192x192.png",
    "revision": "dafb038594c53c0bce3f17d033c7cd93"
  }, {
    "url": "images/icons/android-chrome-512x512.png",
    "revision": "a04bec30357da347002827b1566afa18"
  }, {
    "url": "favicon.ico",
    "revision": "1ba2ae710d927f13d483fd5d1e548c9b"
  }, {
    "url": "css/all.min.css",
    "revision": "3d5ef2bf867c4054a2f336cdbad9e1dc"
  }, {
    "url": "images/energy.png",
    "revision": "35d96dd3e11ea0e946fab4107393a77c"
  }, {
    "url": "images/EnergyRe.png",
    "revision": "f3272d40bb7e225e8a72759411909c75"
  }, {
    "url": "webfonts/fa-brands-400.ttf",
    "revision": "f34b6a2a94e1a01e4c21fa84dcbf6667"
  }, {
    "url": "webfonts/fa-brands-400.woff2",
    "revision": "ee91e640b5449fb98d9320c877a9866e"
  }, {
    "url": "webfonts/fa-regular-400.ttf",
    "revision": "65e80529f5cfcf16a4b1161601a1616c"
  }, {
    "url": "webfonts/fa-regular-400.woff2",
    "revision": "82bafee9dcc7b6fb7bca7ed323f9b7ae"
  }, {
    "url": "webfonts/fa-solid-900.ttf",
    "revision": "52afeb7a328694838c6b073ad7af24d8"
  }, {
    "url": "webfonts/fa-solid-900.woff2",
    "revision": "57b380d27f14f16e737bcca7e849cf79"
  }, {
    "url": "webfonts/fa-v4compatibility.ttf",
    "revision": "9d6f359a328ee3df73709c1d8f05b0d4"
  }, {
    "url": "webfonts/fa-v4compatibility.woff2",
    "revision": "43044320c62b2b1397b8a0d535dea6a7"
  }, {
    "url": "images/icons/android-chrome-256x256.png",
    "revision": "c62f0deb0024fdd1e9e79c8b7f1386a5"
  }, {
    "url": "images/icons/apple-touch-icon.png",
    "revision": "ca5b1a99821adb9dc1ac33474daa4e47"
  }, {
    "url": "images/icons/favicon-16x16.png",
    "revision": "da1d0673442beb78258ef57be2d1fb04"
  }, {
    "url": "images/icons/favicon-32x32.png",
    "revision": "87a0ecc93baac0df09cd419ba968f8d6"
  }, {
    "url": "images/icons/favicon.ico",
    "revision": "b524ce9e815bcdd3dbf5c46b00f410c8"
  }, {
    "url": "images/icons/mstile-150x150.png",
    "revision": "91bf21147cecff112dfc4ca687c96801"
  }, {
    "url": "images/icons/placeholder.png",
    "revision": "0b83dcbd8bd3fa8ec29dd276ce699a03"
  }, {
    "url": "manifest.webmanifest",
    "revision": "f50a76e6426889594e4db1857fff5334"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/.*images\/*.*.*/, new workbox.CacheFirst({
    "cacheName": "Eriks-Bilder",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 50,
      maxAgeSeconds: 86400
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute("/energy", new workbox.NetworkFirst({
    "cacheName": "Eriks-Energys",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 50,
      maxAgeSeconds: 86400
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute("/eee", new workbox.NetworkFirst({
    "cacheName": "Eriks-Reviews",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 50,
      maxAgeSeconds: 86400
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/\/review\/\d+$/, new workbox.NetworkFirst({
    "cacheName": "Eriks-Detail",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 50,
      maxAgeSeconds: 86400
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
