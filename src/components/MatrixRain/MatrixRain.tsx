import { useEffect, useRef } from 'react';
import './MatrixRain.css';

const MATRIX_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

interface Column {
  x: number;
  y: number;
  speed: number;
  chars: string[];
}

const getRandomChar = () => {
  return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
};

const generateChars = (length: number): string[] => {
  return Array.from({ length }, () => getRandomChar());
};

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const columnsRef = useRef<Column[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fontSize = 18;
    const columnWidth = fontSize * 2.5; // More spacing between columns

    const initColumns = () => {
      const columnCount = Math.ceil(canvas.width / columnWidth);
      columnsRef.current = Array.from({ length: columnCount }, (_, i) => {
        const length = 10 + Math.floor(Math.random() * 20);
        return {
          x: i * columnWidth,
          y: Math.random() * canvas.height,
          speed: 0.2 + Math.random() * 0.5,
          chars: generateChars(length),
        };
      });
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initColumns();
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      // Fade effect - creates the trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "Fira Code", monospace`;

      columnsRef.current.forEach((column) => {
        // Draw the character trail
        for (let i = 0; i < column.chars.length; i++) {
          const charY = column.y - i * fontSize;
          if (charY < 0 || charY > canvas.height) continue;

          // Head character is brightest
          if (i === 0) {
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#00ff00';
            ctx.shadowBlur = 8;
          } else if (i < 5) {
            ctx.fillStyle = '#00ff00';
            ctx.shadowBlur = 3;
          } else {
            // Fade out towards tail - keep more visible
            const alpha = Math.max(0.3, 1 - (i / column.chars.length) * 0.7);
            ctx.fillStyle = `rgba(0, 255, 0, ${alpha})`;
            ctx.shadowBlur = 0;
          }

          // Occasionally flicker a random character (0.5% chance - very subtle)
          if (Math.random() < 0.005) {
            column.chars[i] = getRandomChar();
          }

          ctx.fillText(column.chars[i], column.x, charY);
        }

        // Reset shadow
        ctx.shadowBlur = 0;

        // Move column down
        column.y += column.speed * fontSize * 0.3;

        // Reset column when it goes off screen
        if (column.y - column.chars.length * fontSize > canvas.height) {
          column.y = 0;
          column.speed = 0.2 + Math.random() * 0.5;
          column.chars = generateChars(10 + Math.floor(Math.random() * 20));
        }
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-rain" />;
}
