// Service Worker pour fonctionnalités PWA
const CACHE_NAME = 'sira-prophet-v1';
const urlsToCache = [
  '/index_v2.html',
  '/fr/index_v2.html',
  '/carte_interactive.html',
  '/quiz.html',
  '/galerie.html',
  '/recherche.html',
  '/audio.html',
  '/assistant-ia.html',
  '/ar/index_v2.html',
  '/css/style.css',
  '/manifest.json'
];

// Installation du Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interception des requêtes
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Retourner le cache si disponible
        if (response) {
          return response;
        }
        
        // Sinon, récupérer depuis le réseau
        return fetch(event.request).then(
          function(response) {
            // Vérifier que la réponse est valide
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Cloner la réponse
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

// Mise à jour du cache
self.addEventListener('activate', function(event) {
  var cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Notification push (exemple)
self.addEventListener('push', function(event) {
  const options = {
    body: 'Découvrez un nouvel épisode de la vie du Prophète ﷺ',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect width="192" height="192" fill="%23D4AF37"/><text x="96" y="110" font-family="serif" font-size="80" text-anchor="middle" fill="%230F4C3A">ﷺ</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect width="96" height="96" fill="%23D4AF37"/><text x="48" y="60" font-family="serif" font-size="40" text-anchor="middle" fill="%230F4C3A">ﷺ</text></svg>',
    vibrate: [200, 100, 200],
    data: {
      url: '/fr/index_v2.html'
    }
  };

  event.waitUntil(
    self.registration.showNotification('Vie du Prophète ﷺ', options)
  );
});

// Clic sur notification
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
