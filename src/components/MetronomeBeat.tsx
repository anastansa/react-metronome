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
      {beatLevel === BeatLevel.WEAK && (
        <span className={`${active ?? 'active-beat'} beat weak-beat`} />
      )}

      {beatLevel === BeatLevel.NORMAL && (
        <span className={`${active ?? 'active-beat'} beat normal-beat`} />
      )}

      {beatLevel === BeatLevel.STRONG && (
        <span className={`${active ?? 'active-beat'} beat strong-beat`} />
      )}
    </div>
  );
}
