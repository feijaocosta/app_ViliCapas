var files = [
  "/app_ViliCapas/index.html",
  "/app_ViliCapas/manifest.json",  
  "/app_ViliCapas/css/style.css",
  "/app_ViliCapas/imagens/bannerfull.png",
  "/app_ViliCapas/imagens/bannertarja.png",
  "/app_ViliCapas/imagens/botaocarrinho.png",
  "/app_ViliCapas/imagens/botaomenu.png",
  "/app_ViliCapas/imagens/botaopesquisa.png",
  "/app_ViliCapas/imagens/logo.png",
  "/app_ViliCapas/imagens/Produtopreto.png",
  "/app_ViliCapas/imagens/Produtorosa.png",
  "/app_ViliCapas/images/icons/icon-32x32.png",
  "/app_ViliCapas/images/icons/icon-128x128.png",
  "/app_ViliCapas/images/icons/icon-144x144.png",
  "/app_ViliCapas/images/icons/icon-152x152.png",
  "/app_ViliCapas/images/icons/icon-192x192.png",
  "/app_ViliCapas/images/icons/icon-256x256.png",
  "/app_ViliCapas/images/icons/icon-512x512.png"
  
];
// dev only
if (typeof files == 'undefined') {
  var files = [];
} else {
  files.push('./');
}

var CACHE_NAME = 'vili.V4';

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
