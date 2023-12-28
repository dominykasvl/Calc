var CACHE_NAME = 'my-cache';
var urlsToCache = [
    '/Calc',
    '/Calc/calc.html',
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