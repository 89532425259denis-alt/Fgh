const CACHE_NAME = 'devo-music-v1';
const ASSETS = [
  './',
  './index.html',
  'https://cdn.tailwindcss.com',
  'https://telegram.org/js/telegram-web-app.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        // Возвращаем заглушку для офлайн-режима
        if (event.request.url.includes('.jpg') || event.request.url.includes('.png')) {
          return caches.match('https://via.placeholder.com/500/ff2d55/ffffff?text=DEVO');
        }
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});