import { useEffect } from 'react';
import recordedClickService from '../services/recorded-click-service';
import { BeatLevel } from '../types/metronome';

export default function usePlayClickSound(
  activeBeatIndex: number | null,
  level: BeatLevel | null,
  isPlaying: boolean
) {
  useEffect(() => {
    if (activeBeatIndex !== null && level !== null && isPlaying) {
      recordedClickService.play(level);
    }
  }, [activeBeatIndex, level, isPlaying]);
}
