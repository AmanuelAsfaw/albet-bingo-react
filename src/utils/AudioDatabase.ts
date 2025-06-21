// src/utils/AudioDatabase.ts
import { useState } from 'react';
import { Audio } from '../types/audio';
import { resolve } from 'mathjs';

export class AudioDatabase {
  private db: IDBDatabase | null = null;

  constructor(private dbName: string, private dbVersion: number) {
    this.openDatabase();
  }

  openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('audios')) {
          const store = db.createObjectStore('audios', { keyPath: 'id', autoIncrement: true });
          store.createIndex('name', 'name', { unique: false });
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  private ensureDatabaseInitialized(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this.db);
      } else {
        this.openDatabase()
          .then(db => resolve(db))
          .catch(error => reject(error));
      }
    });
  }

  addAudio(audio: Audio): Promise<number> {
    return this.ensureDatabaseInitialized()
      .then(db => {
        const transaction = db.transaction(['audios'], 'readwrite');
        const store = transaction.objectStore('audios');
        const request = store.add(audio);

        return new Promise<number>((resolve, reject) => {
          request.onsuccess = (event) => {
            const insertedId = (event.target as IDBRequest).result as number;
            resolve(insertedId);
          };
          request.onerror = (event) => {
            reject((event.target as IDBRequest).error);
          };
        });
      });
  }

  updateAudioById(id: number, audio: Audio) : Promise<void> {
    return this.ensureDatabaseInitialized()
        .then(db => {
            const transaction = db.transaction(['audios', 'readwrite']);
            const store = transaction.objectStore('audios');
            const request = store.put({...audio, id});
            return new Promise<void>((resolve, reject) => {
                request.onsuccess = () => {
                    resolve();
                }
                request.onerror = (event) => {
                    reject((event.target as IDBRequest).error);
                }                
            })
        })

  }

  updateAudioByName(name: string, audio: Audio): Promise<void> {
    return this.ensureDatabaseInitialized()
        .then(db => {
            const transaction = db.transaction(['audios'], 'readwrite');
            const store = transaction.objectStore('audios');
            const index = store.index('name');
            const request = index.get(name);
            return new Promise<void>((resolve, reject) => {
                request.onsuccess = (event) => {
                    const existingAudio = (event.target as IDBRequest).result as Audio | undefined;
                    if (existingAudio) {
                        const updatedAudio = { ...existingAudio, ...audio };
                        updatedAudio.name = name;
                        const updateRequest = store.put(updatedAudio);
                        updateRequest.onsuccess = () => {
                            resolve();
                        }
                        updateRequest.onerror =  (event_) => {
                            reject((event_.target as IDBRequest).error);
                        }
                    }
                    else {
                        reject(new Error(`Audio with name "${name}" not found.`))
                    }
                }
            })
        })
  }
  updateOrAddAudio(audio: Audio, name: string): Promise<Audio| undefined> {
    return this.ensureDatabaseInitialized()
        .then(db =>{
            const transaction = db.transaction(['audios'], 'readwrite');
            const store = transaction.objectStore('audios');
            const index = store.index('name');
            const request = index.get(name);
            return new Promise<Audio>((resolve, reject) => {
                request.onsuccess = (event) => {
                    const existingAudio = (event.target as IDBRequest).result as Audio | undefined;
                    if (existingAudio) {
                        const updatedAudio = { ...existingAudio, ...audio };
                        updatedAudio.name = name;
                        const updateRequest = store.put(updatedAudio);
                        updateRequest.onsuccess = () => {
                            resolve(updatedAudio);
                        }
                        updateRequest.onerror =  (event_) => {
                            reject((event_.target as IDBRequest).error);
                        }
                    }
                    else {
                        const newAudioRequest = store.add(audio);

                        return new Promise<Audio>((resolve, reject) => {
                            newAudioRequest.onsuccess = (event) => {
                                const insertedId = (event.target as IDBRequest).result as number;
                                resolve({id:insertedId, ...audio});
                            };
                            newAudioRequest.onerror = (event) => {
                                reject((event.target as IDBRequest).error);
                            };
                        });
                        
                    }
                }
            })
        })
  }

  getAudio(id: number): Promise<Audio | undefined> {
    return this.ensureDatabaseInitialized()
      .then(db => {
        const transaction = db.transaction(['audios'], 'readonly');
        const store = transaction.objectStore('audios');
        const request = store.get(id);

        return new Promise<Audio | undefined>((resolve, reject) => {
          request.onsuccess = (event) => {
            const audio = (event.target as IDBRequest).result as Audio;
            resolve(audio);
          };
          request.onerror = (event) => {
            reject((event.target as IDBRequest).error);
          };
        });
      });
  }

  getAudioByName(name: string): Promise<Audio | undefined> {
    return this.ensureDatabaseInitialized()
      .then(db => {
        const transaction = db.transaction(['audios'], 'readonly');
        const store = transaction.objectStore('audios');
        const index = store.index('name');
        const request = index.get(name);

        return new Promise<Audio | undefined>((resolve, reject) => {
          request.onsuccess = (event) => {
            const audio = (event.target as IDBRequest).result as Audio;
            resolve(audio);
          };
          request.onerror = (event) => {
            reject((event.target as IDBRequest).error);
          };
        });
      });
  }

  getAllAudios(): Promise<Audio[]> {
    return this.ensureDatabaseInitialized()
      .then(db => {
        const transaction = db.transaction(['audios'], 'readonly');
        const store = transaction.objectStore('audios');
        const request = store.getAll();

        return new Promise<Audio[]>((resolve, reject) => {
          request.onsuccess = (event) => {
            const audios = (event.target as IDBRequest).result as Audio[];
            resolve(audios);
          };
          request.onerror = (event) => {
            reject((event.target as IDBRequest).error);
          };
        });
      });
  }

  clearAllAudios(): Promise<void> {
    return this.ensureDatabaseInitialized()
      .then(db => {
        const transaction = db.transaction(['audios'], 'readwrite');
        const store = transaction.objectStore('audios');
        const request = store.clear();

        return new Promise<void>((resolve, reject) => {
          request.onsuccess = () => {
            resolve();
          };
          request.onerror = (event) => {
            reject((event.target as IDBRequest).error);
          };
        });
      });
  }

  checkAudioExistsByName(name: string): Promise<boolean> {
    return this.ensureDatabaseInitialized()
      .then(db => {
        const transaction = db.transaction(['audios'], 'readonly');
        const store = transaction.objectStore('audios');
        const index = store.index('name');
        const request = index.openCursor(IDBKeyRange.only(name));

        return new Promise<boolean>((resolve, reject) => {
          request.onsuccess = (event) => {
            const cursor = (event.target as IDBRequest).result as IDBCursorWithValue;
            resolve(!!cursor);
          };
          request.onerror = (event) => {
            reject((event.target as IDBRequest).error);
          };
        });
      });
  }
}

const audioDb = new AudioDatabase('AudioDatabase', 1);

const fetchFullAudioContent = async (url: string): Promise<Blob> => {
    let  setHttpStatus : number | null = null;
//   const [httpStatus, setHttpStatus] = useState<number | null>(null);
    // Step 1: Get the total file size. We can do this with a HEAD request or a small GET request.
    // A HEAD request is more efficient as it doesn't download content.
    console.log('Fetching audio metadata (total size)...');
    let totalSize = 0;
    let mimeType = 'audio/mpeg'; // Default MIME type, will try to infer from response

    try {
      const headResponse = await fetch(url, { method: 'HEAD' });
      if (!headResponse.ok) {
        throw new Error(`HEAD request failed! Status: ${headResponse.status}`);
      }
      const contentLengthHeader = headResponse.headers.get('Content-Length');
      if (contentLengthHeader) {
        totalSize = parseInt(contentLengthHeader, 10);
      } else {
        // If Content-Length is not available, try a small range request to get Content-Range
        const partialResponse = await fetch(url, { headers: { 'Range': 'bytes=0-0' } });
        const contentRangeHeader = partialResponse.headers.get('Content-Range');
        if (contentRangeHeader) {
          const match = contentRangeHeader.match(/\/(\d+)$/);
          if (match && match[1]) {
            totalSize = parseInt(match[1], 10);
          }
        }
      }
      const contentTypeHeader = headResponse.headers.get('Content-Type');
      if (contentTypeHeader) {
        mimeType = contentTypeHeader.split(';')[0]; // Get main type, ignore charset
      }

      if (totalSize === 0) {
        // Fallback: If total size still unknown, attempt to fetch the whole thing directly
        console.log('Could not determine total size, attempting full download...');
        const fullResponse = await fetch(url);
        if (!fullResponse.ok) {
          throw new Error(`Full download attempt failed! Status: ${fullResponse.status}`);
        }
        setHttpStatus = fullResponse.status; // Set status for the full download
        return await fullResponse.blob();
      }

    } catch (headError) {
      console.warn('Could not get total size via HEAD or initial range request, attempting full download directly.', headError);
      // Fallback: If HEAD or initial range request fails, try to fetch the whole thing directly
      console.log('Error getting metadata, attempting full download...');
      const fullResponse = await fetch(url);
      if (!fullResponse.ok) {
        throw new Error(`Full download attempt failed! Status: ${fullResponse.status}`);
      }
      setHttpStatus = fullResponse.status; // Set status for the full download
      return await fullResponse.blob();
    }

    console.log(`Total audio size: ${totalSize} bytes. Starting chunk download...`);

    const chunkSize = 1024 * 1024; // 1 MB chunks (adjust as needed)
    let fetchedBytes = 0;
    const chunks: ArrayBuffer[] = [];

    // Step 2: Iteratively fetch chunks
    while (fetchedBytes < totalSize) {
      const start = fetchedBytes;
      const end = Math.min(fetchedBytes + chunkSize - 1, totalSize - 1);
      const rangeHeader = `bytes=${start}-${end}`;

      console.log(`Fetching bytes ${start}-${end} of ${totalSize}...`);
      console.log(`Requesting Range: ${rangeHeader}`);

      const response = await fetch(url, {
        headers: {
          'Range': rangeHeader,
        },
      });

      // Update the HTTP status for the last chunk request
      setHttpStatus = response.status;

      if (response.status === 206 || response.status === 200) { // Server might send 200 for the last chunk or if it decides to send full
        const arrayBuffer = await response.arrayBuffer();
        chunks.push(arrayBuffer);
        fetchedBytes += arrayBuffer.byteLength;
      } else {
        throw new Error(`Failed to fetch chunk. Status: ${response.status}`);
      }
    }

    // Step 3 & 4: Concatenate chunks and create final Blob
    console.log('Combining audio chunks...');
    const combinedBuffer = new Uint8Array(totalSize);
    let offset = 0;
    for (const chunk of chunks) {
      combinedBuffer.set(new Uint8Array(chunk), offset);
      offset += chunk.byteLength;
    }

    console.log('Audio download complete. Creating Blob...');
    return new Blob([combinedBuffer], { type: mimeType });
  };

export const saveAudioFile = async (name: string, url: string) => {
//   const response = await fetch(url, {
//     headers: {
//         'Range': '' // Clear the Range header
//     }
//     });
  const blob = await fetchFullAudioContent(url);

  const exampleAudio: Audio = {
    name: `${name}.mp3`,
    audioData: blob,
    parsedURL: URL.createObjectURL(blob),
  };

  await audioDb.addAudio(exampleAudio);
  console.log(`Audio "${name}" saved.`);
};

export const updateOrSaveAudioFile = async (name: string, url: string) => {
//   const response = await fetch(url, {
//     headers: {
//         'Range': '' // Clear the Range header
//     }
//     });
  const blob = await fetchFullAudioContent(url);

  const exampleAudio: Audio = {
    name: `${name}`,
    audioData: blob,
    parsedURL: URL.createObjectURL(blob),
  };

  await audioDb.updateOrAddAudio(exampleAudio, url);
  console.log(`Audio "${name}" saved.`);
};

export const getAudioFileByName  = async (name: string, url: string) => {

    let existing = await audioDb.getAudioByName(name);
    if (!existing){
        existing = await audioDb.getAudioByName(`${name}.mp3`);
    }
    console.log(`Checking cach for audio:: ${name}`, existing);
    
    if (existing) {
        return existing?.audioData;
    }

    const response = await fetch(url);
    const blob = await response.blob();
    const newAudio: Audio = {
        name,
        audioData: blob,
        parsedURL: URL.createObjectURL(blob),
    };

    await audioDb.addAudio(newAudio);
    return blob;
    };
