// src/AudioPlayer.tsx
import React, { useState } from 'react';
import { getCachedAudio } from '../../../../../audioCache';

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const [src, setSrc] = useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    getCachedAudio(audioUrl).then((blobUrl: any) => {
      if (isMounted) {
        setSrc(blobUrl);
      }
    });

    return () => {
      isMounted = false;
      if (src) URL.revokeObjectURL(src);
    };
  }, [audioUrl]);

  if (!src) return <div>Loading...</div>;

  return <audio src={src} controls autoPlay />;
};

export default AudioPlayer;