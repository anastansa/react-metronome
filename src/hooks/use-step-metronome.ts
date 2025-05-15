import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function useStepMetronome(
  tempo: number,
  beatCount: number,
  isPlaying: boolean
): [number | null, Dispatch<SetStateAction<number | null>>] {
  const [activeBeat, setActiveBeat] = useState<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      const stepMetronome = () =>
        setActiveBeat((curr) => {
          if (curr == null) return 0;

          return curr + 1;
        });

      const period = Math.round((1000 * 60) / tempo);
      const intervalId = setInterval(stepMetronome, period);
      stepMetronome(); 

      return () => clearInterval(intervalId);
    } else {
      setActiveBeat(null);
    }
  }, [tempo, beatCount, isPlaying]);

  return [activeBeat, setActiveBeat];
}