import { useEffect, useState } from 'react';
import { BeatType, Config } from '../types/metronome';
import useStepMetronome from '../hooks/use-step-metronome';
import usePlayClickSound from '../hooks/use-play-click-sound';

interface Props {
  isPlaying: boolean;
  config: Config;
}

const defaultBeats: BeatType[] = [
  BeatType.STRONG,
  BeatType.NORMAL,
  BeatType.NORMAL,
  BeatType.NORMAL,
];

export default function Metronome({ isPlaying, config }: Props) {
  const [beats, setBeats] = useState<BeatType[]>(defaultBeats);
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
          newBeats.push(BeatType.NORMAL);
      } else if (config.beatCount < curr.length) {
        for (let i = curr.length; i > config.beatCount; i--) newBeats.pop();
      }

      return newBeats;
    });
    setActiveBeat(null);
  }, [config.beatCount, setActiveBeat]);

  const BeatTypeChanged = (index: number, level: BeatType) => {
    setBeats((curr) => {
      const newBeats = [...curr];

      newBeats[index] = level;

      return newBeats;
    });
  };

  return (
    <div className="">
      {beats.map((b, index) => (
        <MetronomeBeat
          key={index}
          BeatType={b}
          onBeatTypeChanged={(level) => BeatTypeChanged(index, level)}
          active={activeBeat == index}
        />
      ))}
    </div>
  );
}
