import { useEffect } from 'react';
import './Ball.css';

interface Props {
  isPlaying: boolean;
}

export default function PlayStopButton({ isPlaying }: Props) {
  useEffect(() => {
    const canvasBall = document.getElementById(
      'canvasBall'
    ) as HTMLCanvasElement;
    const ctxBall = canvasBall.getContext('2d') as CanvasRenderingContext2D;

    const canvasLine = document.getElementById(
      'canvasLine'
    ) as HTMLCanvasElement;
    const ctxLine = canvasLine.getContext('2d') as CanvasRenderingContext2D;

    let x = 20;
    const y = canvasBall.height / 2;
    const radius = 20;
    const speed = 2;
    let direction = 1;
    let animationId;

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

    drawLine();
    drawBall();

    function updateCanvas() {
      ctxBall.clearRect(0, 0, canvasBall.width, canvasBall.height);
      drawBall();

      x += speed * direction;

      if (x + radius > canvasBall.width || x - radius < 0) {
        direction *= -1;
      }

      // requestAnimationFrame(updateCanvas);
      if (isPlaying) {
        animationId = requestAnimationFrame(updateCanvas);
      }
    }

    // animationId = requestAnimationFrame(updateCanvas);

    if (isPlaying) {
      updateCanvas();
    } else {
      // x = 20;
      // ctxBall.clearRect(0, 0, canvasBall.width, canvasBall.height);
      // requestAnimationFrame(drawBall);
      cancelAnimationFrame(animationId);
    }
  }, [isPlaying]);

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
