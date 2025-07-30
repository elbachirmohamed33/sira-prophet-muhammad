// Service Worker pour l'application Sira & Coran
const CACHE_NAME = 'sira-coran-v1.2.0';
const urlsToCache = [
  '/app-sira-quran.html',
  '/index_v2.html',
  '/css/style_optimized.css',
  '/css/adsense.css',
  '/js/adsense.js',
  '/js/quran-data.js',
  '/js/app-main.js',
  // Icônes et assets
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Pages principales
  '/periode1_v2.html',
  '/periode2_v2.html',
  '/periode3_v2.html',
  '/periode4_v2.html',
  '/periode5_v2.html',
  '/periode6_v2.html',
  '/periode7_v2.html',
  '/periode8_v2.html',
  '/periode9_v2.html',
  '/periode10_v2.html',
  '/periode11_v2.html',
  '/periode12_v2.html',
  '/periode13_v2.html',
  '/periode14_v2.html',
  '/periode15_complete.html',
  // Outils éducatifs
  '/carte_interactive.html',
  '/quiz.html',
  '/audio.html',
  '/galerie.html',
  '/recherche.html'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installation en cours...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cache ouvert');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: Toutes les ressources ont été mises en cache');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Erreur lors de la mise en cache:', error);
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activation en cours...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activation terminée');
      return self.clients.claim();
    })
  );
});

// Stratégie de cache: Cache First pour les ressources statiques
self.addEventListener('fetch', (event) => {
  // Ignorer les requêtes non-HTTP et les requêtes vers les APIs externes
  if (!event.request.url.startsWith('http') || 
      event.request.url.includes('googlesyndication.com') ||
      event.request.url.includes('googletagmanager.com') ||
      event.request.url.includes('google-analytics.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si la ressource est en cache, la retourner
        if (response) {
          console.log('Service Worker: Ressource servie depuis le cache:', event.request.url);
          return response;
        }

        // Sinon, faire une requête réseau
        console.log('Service Worker: Récupération depuis le réseau:', event.request.url);
        return fetch(event.request)
          .then((response) => {
            // Vérifier si la réponse est valide
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Cloner la réponse pour la mettre en cache
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch((error) => {
            console.error('Service Worker: Erreur réseau:', error);
            
            // Retourner une page hors ligne si disponible
            if (event.request.destination === 'document') {
              return caches.match('/offline.html');
            }
          });
      })
  );
});

// Gestion des notifications push (pour futures mises à jour)
self.addEventListener('push', (event) => {
  console.log('Service Worker: Notification push reçue');
  
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body || 'Nouvelle mise à jour disponible',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey || 'default'
      },
      actions: [
        {
          action: 'explore',
          title: 'Découvrir',
          icon: '/icons/checkmark.png'
        },
        {
          action: 'close',
          title: 'Fermer',
          icon: '/icons/xmark.png'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'Sira & Coran', options)
    );
  }
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Clic sur notification');
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/app-sira-quran.html')
    );
  } else if (event.action === 'close') {
    // Ne rien faire, la notification est déjà fermée
  } else {
    // Clic par défaut sur la notification
    event.waitUntil(
      clients.matchAll().then((clientList) => {
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
    );
  }
});

// Synchronisation en arrière-plan
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Synchronisation en arrière-plan');
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Ici, vous pouvez synchroniser les données hors ligne
      syncOfflineData()
    );
  }
});

// Fonction pour synchroniser les données hors ligne
function syncOfflineData() {
  return new Promise((resolve) => {
    // Simuler la synchronisation des données
    console.log('Service Worker: Synchronisation des données hors ligne...');
    
    // Ici, vous pourriez:
    // - Envoyer les données sauvegardées localement
    // - Récupérer les nouvelles mises à jour
    // - Synchroniser les favoris et marque-pages
    
    setTimeout(() => {
      console.log('Service Worker: Synchronisation terminée');
      resolve();
    }, 1000);
  });
}

// Gestion des erreurs globales
self.addEventListener('error', (event) => {
  console.error('Service Worker: Erreur globale:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('Service Worker: Promesse rejetée non gérée:', event.reason);
  event.preventDefault();
});
