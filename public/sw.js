/**
 * Hitek Solutions Service Worker
 * Designed for Vaniyambadi residents with low or intermittent cellular/broadband connectivity.
 * Caches core product catalog, emergency electrician/plumber contacts, and store location.
 * Handles Push Notifications for Service Reminders and Local Price Alerts.
 */

const CACHE_NAME = 'hitek-vaniyambadi-cache-v2';
const OFFLINE_URLS = [
  '/',
  '/index.html',
  '/offline-data.json',
  '/batteries.svg',
  '/shop.svg',
  '/products.svg'
];

// Install: Pre-cache essential offline files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(OFFLINE_URLS).catch((err) => {
        console.warn('[SW] Pre-caching partial assets failed:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network-First with Cache Fallback for documents; Cache-First for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  // API or offline-data.json: Stale-While-Revalidate
  if (request.url.includes('/offline-data.json')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          const fetchPromise = fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => cachedResponse);

          return cachedResponse || fetchPromise;
        });
      })
    );
    return;
  }

  // Navigation requests (HTML): Network first, then fallback to cached index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || caches.match('/index.html');
          });
        })
    );
    return;
  }

  // Static assets: Cache-first with network fallback
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        if (request.destination === 'image') {
          return caches.match('/batteries.svg');
        }
      });
    })
  );
});

// Push Notification Handler for Service Reminders & Vaniyambadi Price Alerts
self.addEventListener('push', (event) => {
  let payload = {
    title: 'Hitek Solutions · Vaniyambadi Alert',
    body: 'Service appointment reminder & local power backup discounts.',
    icon: '/batteries.svg',
    badge: '/batteries.svg',
    tag: 'hitek-service-alert',
    data: { url: '/#service-history' }
  };

  if (event.data) {
    try {
      payload = event.data.json();
    } catch (e) {
      payload.body = event.data.text();
    }
  }

  const notificationOptions = {
    body: payload.body,
    icon: payload.icon || '/batteries.svg',
    badge: payload.badge || '/batteries.svg',
    tag: payload.tag || 'hitek-alert',
    data: payload.data || { url: '/' },
    vibrate: [200, 100, 200],
    actions: [
      { action: 'open_app', title: 'Open Details' },
      { action: 'call_hitek', title: 'Call Showroom' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(payload.title, notificationOptions)
  );
});

// Notification Click Handler: Deep link to specific page section or emergency call
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'call_hitek') {
    event.waitUntil(clients.openWindow('tel:+919150051486'));
    return;
  }

  const destinationUrl = (event.notification.data && event.notification.data.url) || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.registration.scope) && 'focus' in client) {
          client.navigate(destinationUrl);
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(destinationUrl);
      }
    })
  );
});
