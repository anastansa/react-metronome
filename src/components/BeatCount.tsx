import IncDec from "./IncDec";

interface Props {
  beatCount: number;
  onBeatCountChanged: (beatCount: number) => void;
}

export default function BeatCount({ beatCount, onBeatCountChanged }: Props) {
  return (
    <div className="">
      <p>Number of beats</p>

      <IncDec
        label={"" + beatCount}
        onInc={() => onBeatCountChanged(beatCount + 1)}
        onDec={() => onBeatCountChanged(beatCount - 1)}
      />
    </div>
  );
}
