var CACHE_NAME = 'WCAG-Fancy-cache-v1';
var urlsToCache = [
  // '/',
  'https://horiatu.github.io/WASG-Viewer-Fancy/main.css',
  'https://horiatu.github.io/WASG-Viewer-Fancy/main.js',
  // '/icomoon/fonts/icomoon.eot',
  // '/icomoon/fonts/icomoon.svg', 
  // '/icomoon/fonts/icomoon.ttf',
  // '/icomoon/fonts/icomoon.woff'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});