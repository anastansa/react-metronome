import { ChangeEvent } from 'react';
import IncDec from './IncDec';
import { MIN_TEMPO, MAX_TEMPO } from '../config/metronome-config';
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
				min={MIN_TEMPO}
				max={MAX_TEMPO}
				step={5}
				value={tempo}
				onChange={changeHandler}
			/>
		</div>
	);
}
