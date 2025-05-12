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
    const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    let x = canvas.width / 2; // Начальная позиция шарика
    const y = canvas.height / 2;
    const radius = 20; // Радиус шарика
    const speed = 2; // Скорость движения шарика
    let direction = 1; // 1 - в право, -1 - влево

    // Линия под предметом
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.strokeStyle = 'red';
    ctx.stroke();

    function drawBall() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистка canvas
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.closePath();

      // Изменение позиции шарика
      x += speed * direction;

      // Проверка границ
      if (x + radius > canvas.width || x - radius < 0) {
        direction *= -1; // Изменение направления при столкновении с границей
      }
    }

    function animate() {
      drawBall();
      requestAnimationFrame(animate); // Обновление анимации
    }

    animate(); // Запуск анимации
  });

  const style = {
    border: '1px solid black',
  };

  return (
    <>
      <div className="container">
        <Metronome isPlaying={isPlaying} config={config} />
        <canvas id="myCanvas" width="480" height="80" style={style} />
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
