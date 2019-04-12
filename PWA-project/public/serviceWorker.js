/* eslint-disable no-unused-vars, no-undef, no-console */

importScripts('/src/js/idb.js');
importScripts('/src/js/utility.js');

// update constants when cached assets get changed
const CACHE_STATIC_NAME = 'static-v4';
const CACHE_DYNAMIC_NAME = 'dynamic-v4';

async function trimCache(cacheName, maxSize) {
  const cache = await caches.open(cacheName);
  const keysInCache = await cache.keys();

  if (keysInCache.length > maxSize) {
    cache.delete(keysInCache[0]);
    trimCache(cacheName, maxSize);
  }
}

self.addEventListener('install', e => {
  console.log('[SW] Install event', e);

  // create cache and store static assets
  e.waitUntil(
    caches.open(CACHE_STATIC_NAME).then(cache => {
      console.log('[SW] Precaching static app shell');
      cache.addAll([
        '/',
        '/index.html',
        '/offline.html',
        '/src/js/app.js',
        '/src/js/feed.js',
        '/src/js/idb.js',
        '/src/js/material.min.js',
        '/src/css/app.css',
        '/src/css/feed.css',
        '/src/images/main-image.jpg',
        'https://fonts.googleapis.com/css?family=Roboto:400,700',
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
      ]);
    })
  );
});

self.addEventListener('activate', e => {
  console.log('[SW] Activate event', e);

  e.waitUntil(
    caches.keys().then(keyList => {
      const keyListPromises = keyList.map(key => {
        // removing outdated caches
        if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
          console.log('[SW] Removing old cache', key);
          return caches.delete(key);
        }
      });

      return Promise.all(keyListPromises);
    })
  );

  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  const URL = 'https://progressive-web-app-a254b.firebaseio.com/posts';

  if (e.request.url.includes(URL)) {
    // clear and update IDB
    e.respondWith(
      fetch(e.request).then(response => {
        clearAllData('posts').then(() => {
          response
            .clone()
            .json()
            .then(data => {
              for (let key in data) {
                writeData('posts', data[key]);
              }
            });
        });

        return response;
      })
    );
  }

  // check if asset already in cache and return it or make http request
  e.respondWith(
    caches.match(e.request).then(async response => {
      // return asset from cache
      if (response) return response;

      // make http request and store it in cache
      try {
        const res = await fetch(e.request);
        const cache = await caches.open(CACHE_DYNAMIC_NAME);
        cache.put(e.request.url, res.clone());

        return res;
      } catch (err) {
        // load fallback page
        const cache = await caches.open(CACHE_STATIC_NAME);

        if (e.request.headers.get('accept').includes('/help')) {
          return cache.match('/offline.html');
        }
      }
    })
  );
});
