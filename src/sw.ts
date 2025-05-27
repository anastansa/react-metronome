const CACHE_NAME = 'pwa-version-1';

const assets = [
  '/manifest.json',
  '/pwa/images/icons/icon-192.png',
  '/pwa/images/icons/icon-512.png',
  '/pwa/fonts/Montserrat-Medium.woff2',
  '/pwa/fonts/Montserrat-Medium.woff',
  '/fallback.html',
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    self.skipWaiting().then(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(assets).catch((err) => {
          console.log('Failed to cache assets:', err);
        });
      });
    })
  );
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    clients.claim().then(() => {
      return caches.keys().then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        );
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).catch(() => {
        // TODO
        return caches.match('./fallback.html');
      });
    })
  );
});
