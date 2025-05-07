import { BeatLevel } from '../types/metronome';
import Click1 from '@/assets/sounds/click1.mp3';
import Click2 from '@/assets/sounds/click2.mp3';
import Click3 from '@/assets/sounds/click3.mp3';

const audios = [
	new Audio(Click1),
	new Audio(Click2),
	new Audio(Click3),
];

export class RecordedClickService {
	play(level: BeatLevel) {
		const audio = audios[level];

		audio.play();
		audio.currentTime = 0;
	}
}

const recordedClickService = new RecordedClickService();
export default recordedClickService;
