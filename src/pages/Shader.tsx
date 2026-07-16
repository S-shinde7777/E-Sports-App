import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const Shader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = 390);
    let height = (canvas.height = 600);

    const points: { x: number; y: number; vx: number; vy: number }[] = [];
    const numPoints = 20;

    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
      });
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 11, 0.2)';
      ctx.fillRect(0, 0, width, height);

      // Render lines connecting close points
      ctx.strokeStyle = 'rgba(255, 107, 0, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < numPoints; i++) {
        for (let j = i + 1; j < numPoints; j++) {
          const dist = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      // Render points with glow
      ctx.fillStyle = '#ff6b00';
      for (let i = 0; i < numPoints; i++) {
        const p = points[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-[390px] min-h-screen mx-auto bg-[#0A0A0B] flex flex-col justify-between py-12 px-6 relative overflow-hidden select-none">
      <div className="flex items-center gap-3 z-10">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/5 active:scale-95">
          <span className="material-symbols-outlined text-on-surface text-lg">arrow_back</span>
        </button>
        <span className="font-headline-sm text-sm text-white font-bold">Ambient Shader</span>
      </div>

      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="glass-card p-6 rounded-2xl relative z-10 space-y-3 mt-auto">
        <h3 className="font-headline-sm text-sm text-white font-bold uppercase tracking-wider">Interactive Node Grid</h3>
        <p className="text-on-surface-variant/70 text-xs leading-relaxed">
          This dynamic ambient backdrop is rendered via a custom HTML Canvas loop. It interacts visually with navigation patterns and adds to the pro-gaming prestige atmosphere of the application.
        </p>
      </div>
    </div>
  );
};
