const CACHE_NAME = "audio-cache-v1";
const AUDIO_FILES = Array.from({ length: 75 }, (_, i) => `/src/audios/amharic/${i + 1}.mp3`)
  .concat([
    "/src/audios/amharic/B.mp3",
    "/src/audios/amharic/I.mp3",
    "/src/audios/amharic/N.mp3",
    "/src/audios/amharic/G.mp3",
    "/src/audios/amharic/O.mp3",
    "/src/audios/amharic/game-start.mp3",
    "/src/audios/amharic/game-finished.mp3",
    "/src/audios/amharic/game-pause.mp3",
  ]);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(AUDIO_FILES);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (AUDIO_FILES.includes(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request))
    );
  }
});
