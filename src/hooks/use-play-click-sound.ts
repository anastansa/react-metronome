import { BeatType } from '@/types/metronome';
import { useEffect, useState } from 'react';

export default function usePlayClickSound(
	activeBeatIndex: number | null,
	level: BeatType | null,
	isPlaying: boolean
) {
	const sound1 = "https://universal-soundbank.com/sounds/14010.mp3";
	const sound2 = "https://universal-soundbank.com/sounds/21522.mp3";
	const sound3 = "https://universal-soundbank.com/sounds/21527.mp3";

	const context = new AudioContext();

	const [sound1Buffer, setSound1Buffer] = useState<AudioBufferSourceNode | null>(null);
	const [sound2Buffer, setSound2Buffer] = useState<AudioBufferSourceNode | null>(null);
	const [sound3Buffer, setSound3Buffer] = useState<AudioBufferSourceNode | null>(null);

	function loadBanks() {
		fetch(sound1)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error, status = ${response.status}`);
				}
				return response.arrayBuffer();
			})
			.then((buffer) => context.decodeAudioData(buffer))
			.then((decodedData) => {
				const source = new AudioBufferSourceNode(context);
				source.buffer = decodedData;
				source.connect(context.destination);
				setSound1Buffer(source);
			});

		fetch(sound2)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error, status = ${response.status}`);
				}
				return response.arrayBuffer();
			})
			.then((buffer) => context.decodeAudioData(buffer))
			.then((decodedData) => {
				const source = new AudioBufferSourceNode(context);
				source.buffer = decodedData;
				source.connect(context.destination);
				setSound2Buffer(source);
			});

		fetch(sound3)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error, status = ${response.status}`);
				}
				return response.arrayBuffer();
			})
			.then((buffer) => context.decodeAudioData(buffer))
			.then((decodedData) => {
				const source = new AudioBufferSourceNode(context);
				source.buffer = decodedData;
				source.connect(context.destination);
				setSound3Buffer(source);
			});
	}

	function metronom() {
		const startTime = 0;
		const eighthNoteTime = 0.5;
		for (let bar = 0; bar < 2; bar++) {
			let time = startTime + bar * 8 * eighthNoteTime;

			playSound(sound1Buffer, time);
			playSound(sound1Buffer, time + 4 * eighthNoteTime);

			playSound(sound2Buffer, time + 2 * eighthNoteTime);
			playSound(sound2Buffer, time + 6 * eighthNoteTime);

			for (let i = 0; i < 8; ++i) {
				playSound(sound3Buffer, time + i * eighthNoteTime);
			}
		}
	}

	function playSound(buffer: AudioBuffer, time: number) {
		let source = context.createBufferSource();
		source.buffer = buffer;
		source.connect(context.destination);
		source.start(time);
	}


	useEffect(() => {
		loadBanks();

		if (activeBeatIndex !== null && level !== null && isPlaying) {
			//
		}
	}, [activeBeatIndex, level, isPlaying]);
}
