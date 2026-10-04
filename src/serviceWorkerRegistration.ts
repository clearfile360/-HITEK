/**
 * Service Worker Registration utility for Hitek Solutions
 * Ensures offline caching for Vaniyambadi residents with unstable cellular coverage
 */

export function registerServiceWorker() {
  if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'test') {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[Hitek SW] Service Worker registered successfully with scope:', registration.scope);
        })
        .catch((error) => {
          console.warn('[Hitek SW] Service Worker registration failed:', error);
        });
    });
  }
}
