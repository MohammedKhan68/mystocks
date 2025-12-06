// Simple service worker: cache shell and serve offline page (basic PWA)
const CACHE_NAME = 'rot-v1';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
  // add icons if present
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(clients.claim());
});

self.addEventListener('fetch', (evt) => {
  // Try network first, fallback to cache
  evt.respondWith(
    fetch(evt.request).catch(() => caches.match(evt.request))
  );
});
