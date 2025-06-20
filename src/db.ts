// src/db.ts
import { openDB, DBSchema, IDBPDatabase } from 'idb';

// Define schema
interface AudioDB extends DBSchema {
  audioCache: {
    key: string;
    value: {
      url: string;
      blob: Blob;
      timestamp: number;
    };
  };
}

export const DB_NAME = 'bingo-audio-db';
export const STORE_NAME = 'audioCache';
export const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<AudioDB>> | null = null;

export const getAudioDB = (): Promise<IDBPDatabase<AudioDB>> => {
  if (!dbPromise) {
    dbPromise = openDB<AudioDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'url' });
        }
      },
    });
  }
  return dbPromise;
};