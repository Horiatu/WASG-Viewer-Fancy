var CACHE_NAME = 'WCAG-Fancy-cache-v1';
var urlsToCache = [
  './',
  './main.js',
  './main.css'
  // './images/logo.png',
  // './images/flag.CA.22.png',
  // './icomoon/fonts/icomoon.eot',
  // './icomoon/fonts/icomoon.svg', 
  // './icomoon/fonts/icomoon.ttf',
  // './icomoon/fonts/icomoon.woff'
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

self.addEventListener('fetch', function(event) {
  // console.log('request: ', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // console.log('match: ', event.request.url);
        // Cache hit - return response
        if (response) {
          // console.log('response');
          return response;
        }
        // return fetch(event.request);
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      }
    )
  );
});