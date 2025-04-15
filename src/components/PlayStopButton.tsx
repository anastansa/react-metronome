interface Props {
  isPlaying: boolean;
  handlePlaying: () => void;
}

export default function PlayStopButton({ isPlaying, handlePlaying }: Props) {
  return <button onClick={handlePlaying}>{isPlaying ? 'Stop' : 'Play'}</button>;
}
