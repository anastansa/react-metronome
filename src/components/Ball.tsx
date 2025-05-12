import { useEffect } from 'react';

interface Props {
  isPlaying: boolean;
}

export default function PlayStopButton({ isPlaying }: Props) {
  useEffect(() => {
    const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    let x = 20;
    const y = canvas.height / 2;
    const radius = 20;
    const speed = 2;
    let direction = 1;

    function drawCanvas() {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.strokeStyle = '#474747';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.closePath();
    }

    drawCanvas();

    function updateCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawCanvas();

      x += speed * direction;

      if (x + radius > canvas.width || x - radius < 0) {
        direction *= -1;
      }
    }

    function animate() {
      console.log('animate', isPlaying);
      if (isPlaying) {
        updateCanvas();
        requestAnimationFrame(animate);
      }
    }

    console.log('now', isPlaying);

    if (isPlaying) {
      animate();
    } else {
      x = 20;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      requestAnimationFrame(drawCanvas);
    }
  }, [isPlaying]);

  return <canvas id="myCanvas" width="400" height="80" />;
}
