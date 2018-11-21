var files = [
  "/curriculo/index.html",
  "/curriculo/manifest.json",  
  "/curriculo/css/style.css",
  "/curriculo/imagens/bannerfull.png",
  "/curriculo/imagens/bannertarja.png",
  "/curriculo/imagens/botaocarrinho.png",
  "/curriculo/imagens/botaomenu.png",
  "/curriculo/imagens/botaopesquisa.png",
  "/curriculo/imagens/logo.png",
  "/curriculo/imagens/Produtopreto.png",
  "/curriculo/imagens/Produtorosa.png",
  "/curriculo/images/icons/icon-32x32.png",
  "/curriculo/images/icons/icon-128x128.png",
  "/curriculo/images/icons/icon-144x144.png",
  "/curriculo/images/icons/icon-152x152.png",
  "/curriculo/images/icons/icon-192x192.png",
  "/curriculo/images/icons/icon-256x256.png",
  "/curriculo/images/icons/icon-512x512.png"
  
];
// dev only
if (typeof files == 'undefined') {
  var files = [];
} else {
  files.push('./');
}

var CACHE_NAME = 'vili.1';

self.addEventListener('activate', function(event) {
  console.log('[SW] Activate');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (CACHE_NAME.indexOf(cacheName) == -1) {
            console.log('[SW] Delete cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('install', function(event){
  console.log('[SW] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return Promise.all(
      	files.map(function(file){
      		return cache.add(file);
      	})
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('[SW] fetch ' + event.request.url)
  event.respondWith(
    caches.match(event.request).then(function(response){
      return response || fetch(event.request.clone());
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event);
  clients.openWindow('/');
});
