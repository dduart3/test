// Force the waiting service worker to become the active service worker.
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

// Delete all caches and unregister
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      return self.registration.unregister();
    })
  );
});

// Intercept fetch requests and force the browser to bypass the cache
self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request).catch(() => new Response('App Offline')));
});