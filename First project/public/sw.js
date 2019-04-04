self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('first-app').then(cache => {
      cache.addAll([
        '/',
        '/favicon.ico',
        '/index.html',
        '/src/css/app.css',
        '/src/js/app.js'
      ]);
    })
  );

  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res;
    })
  );
});
