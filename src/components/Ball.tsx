import { useEffect } from 'react';
import './Ball.css';
import type { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { changeAnimationId } from '../animationSlice';

interface Props {
  isPlaying: boolean;
  tempo: number;
  beatsCount: number;
}

export default function Ball({ isPlaying, tempo, beatsCount }: Props) {
  const animationId = useSelector((state: RootState) => state.animation.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const canvasBall = document.getElementById(
      'canvasBall'
    ) as HTMLCanvasElement;
    const ctxBall = canvasBall.getContext('2d') as CanvasRenderingContext2D;

    const canvasLine = document.getElementById(
      'canvasLine'
    ) as HTMLCanvasElement;
    const ctxLine = canvasLine.getContext('2d') as CanvasRenderingContext2D;

    const y = canvasBall.height / 2;
    const radius = 20;
    let x = radius;
    let direction = 1;
    let timePrev = 0;

    if (animationId) {
      cancelAnimationFrame(animationId);
    }

    function drawLine() {
      ctxLine.beginPath();
      ctxLine.moveTo(0, canvasLine.height / 2);
      ctxLine.lineTo(canvasLine.width, canvasLine.height / 2);
      ctxLine.strokeStyle = '#474747';
      ctxLine.stroke();
    }

    function drawBall() {
      ctxBall.beginPath();
      ctxBall.arc(x, y, radius, 0, Math.PI * 2);
      ctxBall.fillStyle = 'blue';
      ctxBall.fill();
      ctxBall.closePath();
    }

    function initBall() {
      ctxBall.clearRect(0, 0, canvasBall.width, canvasBall.height);
      x = radius;
      drawBall();
    }

    drawLine();
    initBall();

    function updateCanvas(timeCurrent: number) {
      ctxBall.clearRect(0, 0, canvasBall.width, canvasBall.height);
      drawBall();
      const tps = tempo / 60;
      const speed = (400 - 2 * radius) * tps;

      if (timePrev) {
        x += ((speed * (timeCurrent - timePrev)) / 1000) * direction;
      }

      if (x + radius >= canvasBall.width || x - radius <= 0) {
        direction *= -1;

        if (x + radius >= canvasBall.width) {
          x = canvasBall.width - radius;
        } else {
          x = radius;
        }
      }

      timePrev = timeCurrent;

      if (isPlaying) {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        dispatch(changeAnimationId(requestAnimationFrame(updateCanvas)));
      }
    }

    if (isPlaying) {
      dispatch(changeAnimationId(requestAnimationFrame(updateCanvas)));
    } else {
      initBall();

      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    }
  }, [isPlaying, tempo, beatsCount]);

  return (
    <>
      <div className="canvas__container">
        <canvas
          id="canvasBall"
          width="400"
          height="80"
          className="canvas__ball"
        ></canvas>
        <canvas
          id="canvasLine"
          width="400"
          height="80"
          className="canvas__line"
        />
      </div>
    </>
  );
}
