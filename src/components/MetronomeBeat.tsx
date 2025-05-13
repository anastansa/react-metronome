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
        <span className={` beat weak-beat ${active ?? 'active-beat'}`} />
      )}

      {beatLevel === BeatLevel.NORMAL && (
        <span className={` beat normal-beat ${active ?? 'active-beat'}`} />
      )}

      {beatLevel === BeatLevel.STRONG && (
        <span className={` beat strong-beat ${active ?? 'active-beat'}`} />
      )}
    </div>
  );
}
