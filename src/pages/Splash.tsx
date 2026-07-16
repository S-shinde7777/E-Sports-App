import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Splash: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar 0→100 over ~2.2s then navigate
    const step = 100 / 44; // ~44 steps × 50ms = 2.2s
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(p + step, 100);
      });
    }, 50);

    const nav = setTimeout(() => navigate('/login'), 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(nav);
    };
  }, [navigate]);

  return (
    <div className="w-full h-screen bg-[#0a0a0b] flex flex-col items-center justify-between py-14 px-6 relative overflow-hidden select-none">
      {/* Ambient blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-64 h-64 rounded-full bg-[#ff6b00]/8 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-80px] w-64 h-64 rounded-full bg-[#14d1ff]/6 blur-[80px] pointer-events-none" />

      {/* Top pill */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/8 bg-white/5 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ffb693] animate-pulse shadow-[0_0_6px_#ffb693]" />
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-[#e2bfb0]/70">
          Apex Tournaments
        </span>
      </div>

      {/* Centre logo */}
      <div className="flex flex-col items-center gap-5">
        <div className="animate-float relative">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-[28px] bg-gradient-to-tr from-[#ff6b00] to-[#14d1ff] blur-[16px] opacity-30" />
          {/* Icon box */}
          <div className="relative w-28 h-28 rounded-[28px] bg-gradient-to-tr from-[#ff6b00] to-[#ff9940] p-[2px]">
            <div className="w-full h-full rounded-[26px] bg-[#0e0e0f] flex items-center justify-center">
              <span
                className="material-symbols-outlined text-[62px] text-[#ffb693]"
                style={{ fontVariationSettings: '"FILL" 1', filter: 'drop-shadow(0 0 12px rgba(255,182,147,0.6))' }}
              >
                sports_esports
              </span>
            </div>
          </div>
        </div>

        <div className="text-center space-y-1">
          <h1
            className="text-[42px] font-black italic leading-none tracking-tight"
            style={{ fontFamily: '"Sora", sans-serif', color: '#fff' }}
          >
            Nexus{' '}
            <span style={{ color: '#ff6b00', filter: 'drop-shadow(0 0 10px rgba(255,107,0,0.4))' }}>
              Esports
            </span>
          </h1>
          <p
            className="text-[11px] uppercase tracking-[0.15em]"
            style={{ fontFamily: '"JetBrains Mono", monospace', color: 'rgba(226,191,176,0.4)' }}
          >
            Tournament Hub
          </p>
        </div>
      </div>

      {/* Progress bar + label */}
      <div className="w-full flex flex-col items-center gap-3">
        <div className="w-52 h-[3px] rounded-full bg-white/6 overflow-hidden">
          <div
            className="h-full rounded-full transition-[width] duration-75 ease-linear"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #ff6b00, #ffb693)',
              boxShadow: '0 0 8px rgba(255,107,0,0.5)',
            }}
          />
        </div>
        <p
          className="text-[10px] uppercase tracking-[0.1em]"
          style={{ fontFamily: '"JetBrains Mono", monospace', color: 'rgba(226,191,176,0.35)' }}
        >
          {progress < 100 ? 'Loading arena…' : 'Ready'}
        </p>
      </div>
    </div>
  );
};
