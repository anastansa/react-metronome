import { useCallback, useState } from 'react';
import PlayStopButton from '@/components/PlayStopButton';
import Metronome from '@/components/Metronome';
import './App.css';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlaying = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  return (
    <>
      <Metronome isPlaying={isPlaying} />
      <PlayStopButton isPlaying={isPlaying} handlePlaying={handlePlaying} />
    </>
  );
}
