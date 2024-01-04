var CACHE_NAME = 'my-cache-v4'; // Update the cache name for the new version
var urlsToCache = [
    //'/Calc/calc.html',
    '/Calc/myfont.ttf',
    '/Calc/plugins/jspdf.plugin.autotable.js',
    '/Calc/plugins/jspdf.umd.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
    'https://unpkg.com/jspdf-autotable@3.8.1/dist/jspdf.plugin.autotable.js'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                var cachePromises = urlsToCache.map(function(urlToCache) {
                    return cache.add(urlToCache).catch(function(reason) {
                        console.log(`Failed to cache ${urlToCache}: ${String(reason)}`);
                    });
                });
                return Promise.all(cachePromises);
            })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting out of date cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});