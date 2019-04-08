/* eslint-disable no-console */

self.addEventListener('install', e => console.log('[SW] Install event', e));

self.addEventListener('activate', e => {
  console.log('[SW] Activate event', e);
  return self.clients.claim();
});

self.addEventListener('fetch', e => e.respondWith(fetch(e.request)));
