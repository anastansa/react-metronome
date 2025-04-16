import './Tempo.css';

interface Props {
  onInc: () => void;
  onDec: () => void;
  label: string;
}

export default function IncDec({ label, onInc, onDec }: Props) {
  return (
    <div className="incdec__buttons">
      <button onClick={onDec}>-</button>
      <p>{label}</p>
      <button onClick={onInc}>+</button>
    </div>
  );
}
