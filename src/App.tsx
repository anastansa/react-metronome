import { useCallback, useReducer, useState } from 'react';
import PlayStopButton from './components/PlayStopButton';
import Metronome from './components/Metronome';
import BeatCount from './components/BeatCount';
import Tempo from './components/Tempo';
import { reducer } from './config/metronome-config';
import './App.css';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);

  const [config, dispatch] = useReducer(reducer, {
    beatCount: 4,
    tempo: 100,
  });

  const handlePlaying = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  return (
    <>
      <Metronome isPlaying={isPlaying} />
      <PlayStopButton isPlaying={isPlaying} handlePlaying={handlePlaying} />
      <Tempo
        tempo={config.tempo}
        onTempoChanged={(tempo: number) =>
          dispatch({ type: 'setTempo', data: { tempo } })
        }
      />
      <BeatCount
        beatCount={config.beatCount}
        onBeatCountChanged={(beatCount: number) =>
          dispatch({ type: 'setBeatCount', data: { beatCount } })
        }
      />
    </>
  );
}
