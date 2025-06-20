// src/types/audio.ts
export interface Audio {
  id?: number;
  name: string;
  audioData: Blob; // Store the binary data of the audio file
  parsedURL: string; // Object URL for playback
}