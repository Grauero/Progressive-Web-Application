/* eslint-disable no-console */

self.addEventListener('install', e => console.log('[SW] Install event', e));

self.addEventListener('activate', e => {
  console.log('[SW] Activate event', e);
  return self.clients.claim();
});

self.addEventListener('fetch', e => console.log('[SW] Fetch event', e));
