import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const LoginSignUp: React.FC = () => {
  const [username, setUsername] = useState('SagarPro_FF');
  const [password, setPassword] = useState('password123');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { loginUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  // If ProtectedRoute saved an intended destination, redirect there after login
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Username cannot be empty');
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      await loginUser(username);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[390px] min-h-screen mx-auto bg-[#0A0A0B] flex flex-col justify-between py-12 px-6 relative overflow-hidden select-none">
      <div className="absolute top-[-50px] left-[-50px] w-[200px] h-[200px] bg-primary/5 rounded-full blur-[60px]"></div>
      <div className="absolute bottom-[-50px] right-[-50px] w-[200px] h-[200px] bg-secondary-container/5 rounded-full blur-[60px]"></div>

      {/* Header */}
      <div className="flex flex-col items-center mt-6">
        <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-tr from-primary-container to-secondary-container rounded-2xl p-[2px] shadow-[0_0_20px_rgba(255,107,0,0.15)]">
          <div className="w-full h-full bg-[#0E0E0F] rounded-[14px] flex items-center justify-center">
            <span className="material-symbols-outlined text-[36px] text-primary drop-shadow-[0_0_10px_rgba(255,182,147,0.4)]" style={{ fontVariationSettings: '"FILL" 1' }}>
              sports_esports
            </span>
          </div>
        </div>
        <h2 className="font-display-lg text-[26px] italic font-black text-white mt-4 uppercase leading-none tracking-tight">
          Nexus <span className="text-primary">E-Sports</span>
        </h2>
        <p className="text-on-surface-variant/40 text-xs font-label-caps uppercase mt-1 tracking-widest">
          Join the Elite Room
        </p>
      </div>

      {/* Main Form */}
      <div className="glass-card p-6 rounded-2xl w-full my-8 space-y-6">
        <div className="space-y-1">
          <h3 className="font-headline-sm text-lg text-white">Welcome Back</h3>
          <p className="text-on-surface-variant/60 text-xs">Enter your details to access your dashboard</p>
        </div>

        {error && (
          <div className="p-3 bg-error-container/20 border border-error/20 text-error text-xs rounded-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">error</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-label-caps text-on-surface-variant/60 uppercase tracking-wider block">
              Esports Username
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-lg">
                person
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full h-11 pl-10 pr-4 bg-[#131314] border border-white/5 rounded-xl text-sm text-white placeholder-on-surface-variant/30 focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container/50 transition-all font-semibold"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-label-caps text-on-surface-variant/60 uppercase tracking-wider block">
              Secure Key (Password)
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-lg">
                lock
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 pl-10 pr-4 bg-[#131314] border border-white/5 rounded-xl text-sm text-white placeholder-on-surface-variant/30 focus:outline-none focus:border-secondary-container focus:ring-1 focus:ring-secondary-container/50 transition-all"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-on-surface-variant/60 py-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" defaultChecked className="rounded border-white/10 bg-[#131314] text-primary focus:ring-0" />
              Remember Me
            </label>
            <span className="text-secondary-container hover:underline cursor-pointer">Forgot Key?</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-container text-on-primary-fixed h-12 rounded-xl font-bold text-sm tracking-wide neon-glow-primary hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Verifying...' : 'Sign In to Lobby'}
            <span className="material-symbols-outlined text-sm font-black">arrow_forward</span>
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-on-surface-variant/40">
        Don't have a clan?{' '}
        <span className="text-secondary-container hover:underline cursor-pointer font-semibold">
          Create Account
        </span>
      </div>
    </div>
  );
};
