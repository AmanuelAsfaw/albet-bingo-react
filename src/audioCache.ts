// src/audioCache.ts
import { getAudioDB, STORE_NAME } from './db';

// Store audio blob under its URL key
export async function cacheAudioFile(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();

  const db = await getAudioDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);

  await store.put({
    url,
    blob,
    timestamp: Date.now(),
  });

  return URL.createObjectURL(blob);
}

// Retrieve cached audio or fetch again
export async function getCachedAudio(url: string): Promise<string> {
  const db = await getAudioDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);

  const haveKey = store.indexNames.contains(url as never);
  store.getAllKeys("").then(async keys => {
    console.log(keys);
    const haveKey_ = keys.includes(url);
    console.log(`Checking cache for audio: ${url}`, haveKey_);
    if (haveKey_){
        const cached = await store.get(url);

        if (cached) {
            return URL.createObjectURL(cached.blob);
        }
    }
  })

  // Fallback to network
  return cacheAudioFile(url);
}