import { useEffect, useState } from 'react';

export function useAudioCache(audioPaths: string[]) {
  const [cachedAudios, setCachedAudios] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('✅ SW registered:', reg.scope);
        })
        .catch(console.error);
    }

    // Check which audios are cached
    if ('caches' in window) {
      audioPaths.forEach((path) => {
        caches.match(path).then((res) => {
          setCachedAudios((prev) => ({
            ...prev,
            [path]: !!res,
          }));
        });
      });
    }
  }, [audioPaths]);

  return { cachedAudios };
}
