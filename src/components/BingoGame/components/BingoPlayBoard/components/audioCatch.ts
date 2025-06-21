const cacheName = 'audio-cache-v1';

async function cacheAudioFiles(urls: string[]) {
  const cache = await caches.open(cacheName);
  const requests = urls.map(url => new Request(url, { mode: 'no-cors' }));
  await cache.addAll(requests);
}
const getAudioUrls = (language: string): string[] => {
  const baseAmharic = (index: number) => `/src/audios/amharic/${index + 1}.mp3`;
  const letters = ['B', 'I', 'N', 'G', 'O'];

  let urls: string[] = [];

  if (language === 'amharic-default') {
    urls = Array.from({ length: 83 }, (_, i) => {
      if (i === 75) return '/src/audios/amharic/B.mp3';
      if (i === 76) return '/src/audios/amharic/I.mp3';
      if (i === 77) return '/src/audios/amharic/N.mp3';
      if (i === 78) return '/src/audios/amharic/G.mp3';
      if (i === 79) return '/src/audios/amharic/O.mp3';
      if (i === 80) return '/src/audios/amharic/game-start.mp3';
      if (i === 81) return '/src/audios/amharic/game-finished.mp3';
      if (i === 82) return '/src/audios/amharic/game-pause.mp3';
      return baseAmharic(i);
    });
  }

  else if (language === 'amharic') {
    urls = Array.from({ length: 83 }, (_, i) => {
      if (i === 75) return '/src/audios/amharic/B.mp3';
      if (i === 76) return '/src/audios/amharic/I.mp3';
      if (i === 77) return '/src/audios/amharic/N.mp3';
      if (i === 78) return '/src/audios/amharic/G.mp3';
      if (i === 79) return '/src/audios/amharic/O.mp3';
      if (i === 80) return '/src/audios/BINGO-EN/bingo.mp3';
      if (i === 81) return '/src/audios/amharic/game-finished.mp3';
      if (i === 82) return '/src/audios/BINGO-EN/stop.mp3';

      const groupIndex = Math.floor(i / 15);
      const num = i + 1;
      if (i < 15) return `/src/audios/BINGO-EN/B${num}.mp3`;
      if (i < 30) return `/src/audios/BINGO-EN/I${num}.mp3`;
      if (i < 45) return `/src/audios/BINGO-EN/N${num}.mp3`;
      if (i < 60) return `/src/audios/BINGO-EN/G${num}.mp3`;
      if (i < 75) return `/src/audios/BINGO-EN/O${num}.mp3`;

      return baseAmharic(i);
    });
  }

  else if (language === 'amharic-female') {
    urls = Array.from({ length: 83 }, (_, i) => {
      if (i === 75) return '/src/audios/amharic/B.mp3';
      if (i === 76) return '/src/audios/amharic/I.mp3';
      if (i === 77) return '/src/audios/amharic/N.mp3';
      if (i === 78) return '/src/audios/amharic/G.mp3';
      if (i === 79) return '/src/audios/amharic/O.mp3';
      if (i === 80) return '/src/audios/bingo-female/bingo.mp3';
      if (i === 81) return '/src/audios/amharic/game-finished.mp3';
      if (i === 82) return '/src/audios/bingo-female/stop.mp3';

      const groupIndex = Math.floor(i / 15);
      const num = i + 1;
      if (i < 15) return `/src/audios/bingo-female/B${num}.mp3`;
      if (i < 30) return `/src/audios/bingo-female/I${num}.mp3`;
      if (i < 45) return `/src/audios/bingo-female/N${num}.mp3`;
      if (i < 60) return `/src/audios/bingo-female/G${num}.mp3`;
      if (i < 75) return `/src/audios/bingo-female/O${num}.mp3`;

      return baseAmharic(i);
    });
  }

  // Add other languages here as needed

  // Always include shuffle sound
  urls.push('/audios/shuffleBalls/017578485-plastic-fast-flapping-mechanis.m4a');

  return urls;
};

const getAudioUrlForLanguage = (language: string, index: number) => {
    const baseAmharic = (index: number) => `/src/audios/amharic/${index +1}.mp3`;
    if (language === 'amharic-default') {
        if (index === 75 ) return '/src/audios/amharic/B.mp3';
        if (index === 76 ) return '/src/audios/amharic/I.mp3';
        if (index === 77 ) return '/src/audios/amharic/N.mp3';
        if (index === 78 ) return '/src/audios/amharic/G.mp3';
        if (index === 79 ) return '/src/audios/amharic/O.mp3';
        if (index === 81 ) return '/src/audios/amharic/game-finished.mp3';
        if (index === 82 ) return '/src/audios/amharic/game-pause.mp3';
        if (index === 81 ) return '/src/audios/amharic/game-start.mp3';
        if (index === 83 ) return '/src/audios/amharic/undefined.mp3';

        return baseAmharic(index);
    } else if (language === 'amharic') {
        if (index === 75 ) return '/src/audios/amharic/B.mp3';
        if (index === 76 ) return '/src/audios/amharic/I.mp3';
        if (index === 77 ) return '/src/audios/amharic/N.mp3';
        if (index === 78 ) return '/src/audios/amharic/G.mp3';
        if (index === 79 ) return '/src/audios/amharic/O.mp3';
        if (index === 80) return '/src/audios/BINGO-EN/bingo.mp3';
        if (index === 81) return '/src/audios/amharic/game-finished.mp3';
        if (index === 82) return '/src/audios/BINGO-EN/stop.mp3';
        
        
        const groupIndex = Math.floor(index / 15);
        const num = index +1;
        if (index <= 15) return `/src/audios/BINGO-EN/B${num}.mp3`;
        if (index <= 30) return `/src/audios/BINGO-EN/I${num}.mp3`;
        if (index <= 45) return `/src/audios/BINGO-EN/N${num}.mp3`;
        if (index <= 60) return `/src/audios/BINGO-EN/G${num}.mp3`;
        if (index <= 75) return `/src/audios/BINGO-EN/O${num}.mp3`;


    } else if (language === 'amharic-female') {
      if (index === 75) return '/src/audios/amharic/B.mp3';
      if (index === 76) return '/src/audios/amharic/I.mp3';
      if (index === 77) return '/src/audios/amharic/N.mp3';
      if (index === 78) return '/src/audios/amharic/G.mp3';
      if (index === 79) return '/src/audios/amharic/O.mp3';
      if (index === 80) return '/src/audios/bingo-female/bingo.mp3';
      if (index === 81) return '/src/audios/amharic/game-finished.mp3';
      if (index === 82) return '/src/audios/bingo-female/stop.mp3';

      const groupIndex = Math.floor(index / 15);
      const num = index + 1;
      if (index <= 15) return `/src/audios/bingo-female/B${num}.mp3`;
      if (index <= 30) return `/src/audios/bingo-female/I${num}.mp3`;
      if (index <= 45) return `/src/audios/bingo-female/N${num}.mp3`;
      if (index <= 60) return `/src/audios/bingo-female/G${num}.mp3`;
      if (index <= 75) return `/src/audios/bingo-female/O${num}.mp3`;

      return baseAmharic(index);


    }
} 
export { cacheAudioFiles, getAudioUrls, getAudioUrlForLanguage };