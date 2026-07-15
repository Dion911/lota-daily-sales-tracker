const CACHE = 'lota-sales-v17';

// Files to pre-cache on install
const PRECACHE = [
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon-maskable.svg',
  './helmet%20launching%2002.png',
  // Vendored libraries — no runtime CDN dependency (fully offline-capable)
  './vendor/react.production.min.js',
  './vendor/react-dom.production.min.js',
  './vendor/babel.min.js',
  './vendor/tailwind.js',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  const isCDN  = !url.origin.includes(self.location.hostname);
  // Any page navigation counts as HTML — covers subpath deploys like
  // GitHub Pages (/lota-sales-tracker/) where pathname is neither '/' nor *.html.
  const isHTML = e.request.mode === 'navigate' || url.pathname.endsWith('.html');

  // Network-first for HTML + CDN — always get the latest app code
  if (isCDN || isHTML) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
  } else {
    // Cache-first for images, manifest, icons
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        });
      })
    );
  }
});
