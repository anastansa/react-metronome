import { useCallback, useReducer, useState, useEffect } from 'react';
import PlayStopButton from './components/PlayStopButton';
import Metronome from './components/Metronome';
import BeatCount from './components/BeatCount';
import Tempo from './components/Tempo';
import { reducer } from './config/metronome-config';
import './App.css';

export default function Home() {
	const [isPlaying, setIsPlaying] = useState(false);

	const [config, dispatch] = useReducer(reducer, {
		beatCount: 4,
		tempo: 100,
	});

	const handlePlaying = useCallback(() => {
		setIsPlaying(!isPlaying);
	}, [isPlaying]);

	useEffect(() => {
		const canvas = document.getElementById("myCanvas")
		const ctx = canvas?.getContext("2d");
		let x = 0;
		let y = canvas?.height - 50;
		const dx = 2;

		function drawBall() {
			ctx.beginPath();
			ctx.arc(x, y, 10, 0, Math.PI * 2);
			ctx.fillStyle = "#0095DD";
			ctx.fill();
			ctx.closePath();
		}

		function draw() {
			ctx?.clearRect(0, 0, canvas.width, canvas.height);
			drawBall();
			x += dx;
		}

		function startGame() {
			setInterval(draw, 10);
		}

		document?.getElementById("runButton")?.addEventListener("click", function () {
			startGame();
		});
	});

	return (
		<>
			<canvas id="myCanvas" width="480" height="320"></canvas>
			<button id="runButton">Start game</button>

			<div className="container">
				<Metronome isPlaying={isPlaying} config={config} />
				<PlayStopButton isPlaying={isPlaying} handlePlaying={handlePlaying} />
				<Tempo
					tempo={config.tempo}
					onTempoChanged={(tempo: number) =>
						dispatch({ type: 'setTempo', data: { tempo } })
					}
				/>
				<BeatCount
					beatCount={config.beatCount}
					onBeatCountChanged={(beatCount: number) =>
						dispatch({ type: 'setBeatCount', data: { beatCount } })
					}
				/>
			</div>
		</>
	);
}
