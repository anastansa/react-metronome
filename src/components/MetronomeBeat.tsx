import { BeatLevel } from '../types/metronome';
import './Metronome.css';

interface Props {
  beatLevel: BeatLevel;
  onBeatLevelChanged: (beatLevel: BeatLevel) => void;
  active: boolean;
}

export default function MetronomeBeat({
  beatLevel,
  onBeatLevelChanged,
  active,
}: Props) {
  const clickHandler = () => {
    const newLevel = (
      beatLevel === BeatLevel.STRONG ? BeatLevel.WEAK : beatLevel + 1
    ) as BeatLevel;
    onBeatLevelChanged(newLevel);
  };

  return (
    <div
      className={`${
        active ? 'active-beat-container' : 'normal-beat-container'
      } beat-container`}
      onClick={clickHandler}
    >
      {Array.from(Array(beatLevel + 1).keys()).map((el) => (
        <span
          key={el}
          className={`${active ? 'active-beat' : 'normal-beat'} beat `}
        ></span>
      ))}
    </div>
  );
}
