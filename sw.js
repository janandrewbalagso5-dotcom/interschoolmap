const CACHE_NAME = 'olpc-map-v3';

const ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    'https://unpkg.com/leaflet/dist/leaflet.css',
    'https://unpkg.com/leaflet/dist/leaflet.js'
];

// Install and Precache standard assets
self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
    self.skipWaiting();
});

// Clean up old caches if version changes
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(k => { if (k !== CACHE_NAME) return caches.delete(k); })
        ))
    );
    self.clients.claim();
});

// Offline-First strategy with stale-while-revalidate for network updates
self.addEventListener('fetch', e => {
    // Specialized caching for OpenStreetMap tiles
    if (e.request.url.includes('tile.openstreetmap.org') || e.request.url.includes('tile.openstreetmap.fr')) {
        e.respondWith(
            caches.match(e.request).then(response => {
                if (response) return response;
                return fetch(e.request).then(res => {
                    return caches.open('olpc-tiles').then(cache => {
                        cache.put(e.request.url, res.clone());
                        return res;
                    });
                }).catch(() => new Response());
            })
        );
        return;
    }

    // Standard Asset caching
    e.respondWith(
        caches.match(e.request).then(res => {
            return res || fetch(e.request).then(fetchRes => {
                return caches.open(CACHE_NAME).then(cache => {
                    if (e.request.method === 'GET' && e.request.url.startsWith('http')) {
                        cache.put(e.request, fetchRes.clone());
                    }
                    return fetchRes;
                });
            });
        }).catch(() => caches.match('./index.html'))
    );
});
