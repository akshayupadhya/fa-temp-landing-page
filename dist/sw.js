importScripts('/cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('foreAviation').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/app.css',
       '/js/app.bundle.js',
       '/images/airport-1853505_640.jpg',
       '/images/aircraft-513641_640.jpg',
       '/images/airport-2384837_1920.jpg',
       '/images/cockpit-924952_640.jpg',
       'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
       'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
     ]);
   }).then(()=>{
        console.log("all cached and installed");
   })
 );
});

self.addEventListener('fetch', function(event) {

console.log(event.request.url);
event.respondWith(

caches.match(event.request).then(function(response) {

return response || fetch(event.request);

})

);

});