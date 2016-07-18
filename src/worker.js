self.addEventListener('install', function (event) {
    console.log('Service Worker Installing...');
    event.waitUntil(Promise.resolve().then(function() {
        console.log('Service Worker Installed.');
    }));
});

self.addEventListener('activate', function (event) {
    console.log('Activating Service Worker...');
    event.waitUntil(Promise.resolve().then(function () {
        console.log('Service Worker Activated.');
    }));
});

self.addEventListener('fetch', function (event) {
    if (event.request.url.indexOf('browser-sync') === -1)
        console.log('Application has performed a fetch from ' + event.request.url);

    event.respondWith(fetch(event.request));
});
