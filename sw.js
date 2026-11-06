// Service worker de Nivel Nani: guarda los archivos de la app para que abra sin internet.
// Cuando cambies index.html u otro archivo, sube el número de VERSION para que el celular baje lo nuevo.
const VERSION = "nivel-nani-v1";
const ARCHIVOS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(ARCHIVOS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((nombres) => Promise.all(nombres.filter((n) => n !== VERSION).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // La página: primero internet (para ver la versión nueva) y, si no hay, la guardada.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copia = res.clone();
          caches.open(VERSION).then((cache) => cache.put("./index.html", copia));
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Íconos, manifest y las letras de Google Fonts: primero lo guardado, y si no está, internet.
  const esPropio = url.origin === self.location.origin;
  const esFuente = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (!esPropio && !esFuente) return;
  event.respondWith(
    caches.match(req).then((guardado) => {
      if (guardado) return guardado;
      return fetch(req).then((res) => {
        if (res.ok || res.type === "opaque") {
          const copia = res.clone();
          caches.open(VERSION).then((cache) => cache.put(req, copia));
        }
        return res;
      });
    })
  );
});
