import { ChangeEvent } from 'react';
// import styles from './Tempo.module.css';
import IncDec from './IncDec';
import { initial } from '@/config/metronome-config';
import './Tempo.css';

interface Props {
  tempo: number;
  onTempoChanged: (tempo: number) => void;
}

export default function TempoSelector({ tempo, onTempoChanged }: Props) {
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;

    onTempoChanged(value);
  };

  return (
    <div className="">
      <p>Tempo (BPM)</p>

      <div>
        <IncDec
          label={'' + tempo}
          onDec={() => onTempoChanged(tempo - 1)}
          onInc={() => onTempoChanged(tempo + 1)}
        />
      </div>

      <input
        type="range"
        min={initial.MIN_TEMPO}
        max={initial.MAX_TEMPO}
        step={5}
        value={tempo}
        onChange={changeHandler}
      />
    </div>
  );
}
