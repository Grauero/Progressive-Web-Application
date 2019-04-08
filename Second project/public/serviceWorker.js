/* eslint-disable no-console */

self.addEventListener('install', e => {
  console.log('[SW] Install event', e);

  // create cache and store static assets
  e.waitUntil(
    caches.open('static').then(cache => {
      console.log('[SW] Precaching static app shell');
      cache.addAll([
        '/',
        '/index.html',
        '/src/js/app.js',
        '/src/js/feed.js',
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
  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  // check if asset already in cache and return it or make http request
  e.respondWith(
    caches.match(e.request).then(async response => {
      // return asset from cache
      if (response) return response;

      // make http request and store it in cache
      const res = await fetch(e.request);
      const cache = await caches.open('dynamic');
      cache.put(e.request.url, res.clone());

      return res;
    })
  );
});
