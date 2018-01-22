var CACHE_NAME = 'WCAG-Fancy-cache-v1';
var urlsToCache = [
  // './',
  // './css/main.css'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        caches.delete(CACHE_NAME).then(function() {
          console.log('Opened cache: ', CACHE_NAME, cache.keys());
        });
        return cache.addAll(urlsToCache);
      })
  );
});

// self.addEventListener('fetch', function(event) {
//   // console.log('fetch ',event);
//   event.respondWith(
//     fetch(event.request).then(function(response) {
//       console.log('response status ', response.status);
//       if(response && response.status <= 400) {
//         // console.log('cache');
//         var responseToCache = response.clone();

//         caches.open(CACHE_NAME)
//           .then(function(cache) {
//             console.log("Add to Cache: ", response.status, responseToCache);

//             cache.put(event.request, responseToCache);
//           });
//         return response;
//         }
//       else 
//         { 
//           // error: get from cache
//           caches.open(CACHE_NAME).then(function(cache) {

//             caches.match(event.request).then(function(response) {
//               // Cache hit - return response
//               if (response) {
//                 console.log("From Cache: ", response);
//                 return response;
//               }
//             }, function(reason) {
//               return null;
//             });
//           });
//         }
//       }, function(reason) {
//         console.log('Featch error with reason ', reason);
//       })
//     );
// });

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         // Cache hit - return response
//         if (response) {
//           console.log("From Cache: ", response);
//           return response;
//         }

//         // IMPORTANT: Clone the request. A request is a stream and
//         // can only be consumed once. Since we are consuming this
//         // once by cache and once by the browser for fetch, we need
//         // to clone the response.
//         var fetchRequest = event.request.clone();

//         return fetch(fetchRequest).then(function(response) {
//             // Check if we received a valid response
//             if(
//               response && 
//               response.status === 200 && 
//               response.type === 'basic') {

//               // IMPORTANT: Clone the response. A response is a stream
//               // and because we want the browser to consume the response
//               // as well as the cache consuming the response, we need
//               // to clone it so we have two streams.
//               var responseToCache = response.clone();

//               caches.open(CACHE_NAME)
//                 .then(function(cache) {
//                   console.log("Add to Cache: ", response);

//                   cache.put(event.request, responseToCache);
//                 });
//             }

//             // else {

//             //   if(response.type !== "opaque")
//             //     console.log("invalid response: ", response);
//             // }

//             return response;
//           }
//         );
//       }
//     )
//   );
// });
