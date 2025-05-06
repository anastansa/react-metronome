import { useEffect, useState } from 'react';
import { BeatLevel, Config } from '../types/metronome';
import useStepMetronome from '../hooks/use-step-metronome';
import usePlayClickSound from '../hooks/use-play-click-sound';
import MetronomeBeat from './MetronomeBeat';
import './Metronome.css';

interface Props {
  isPlaying: boolean;
  config: Config;
}

const defaultBeats: BeatLevel[] = [
  BeatLevel.STRONG,
  BeatLevel.NORMAL,
  BeatLevel.NORMAL,
  BeatLevel.NORMAL,
];

export default function Metronome({ isPlaying, config }: Props) {
  const [beats, setBeats] = useState<BeatLevel[]>(defaultBeats);
  const [activeBeat, setActiveBeat] = useStepMetronome(
    config.tempo,
    config.beatCount,
    isPlaying
  );

  usePlayClickSound(
    activeBeat,
    activeBeat !== null ? beats[activeBeat] : null,
    isPlaying
  );

  useEffect(() => {
    setBeats((curr) => {
      const newBeats = [...curr];

      if (config.beatCount > curr.length) {
        for (let i = curr.length; i < config.beatCount; i++)
          newBeats.push(BeatLevel.NORMAL);
      } else if (config.beatCount < curr.length) {
        for (let i = curr.length; i > config.beatCount; i--) newBeats.pop();
      }

      return newBeats;
    });
    setActiveBeat(null);
  }, [config.beatCount, setActiveBeat]);

  const beatLevelChanged = (index: number, level: BeatLevel) => {
    setBeats((curr) => {
      const newBeats = [...curr];

      newBeats[index] = level;

      return newBeats;
    });
  };

  return (
    <div className="metronome">
      {beats.map((beat, index) => (
        <MetronomeBeat
          key={index}
          beatLevel={beat}
          onBeatLevelChanged={(level: number) => beatLevelChanged(index, level)}
          active={activeBeat == index}
        />
      ))}
    </div>
  );
}
