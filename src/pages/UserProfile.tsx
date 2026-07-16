import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const UserProfile: React.FC = () => {
  const { user, logoutUser } = useApp();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (confirm('Are you sure you want to log out of the tournament lobby?')) {
      await logoutUser();
      navigate('/login');
    }
  };

  return (
    <div className="px-gutter space-y-stack-md animate-fade-in pb-10">
      <div className="flex flex-col gap-1">
        <h2 className="font-display-lg text-xl font-black text-white uppercase">Clan Profile</h2>
        <p className="text-on-surface-variant/60 text-xs">Verify career statistics and achievements</p>
      </div>

      {/* Avatar Card */}
      <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center space-y-3 relative overflow-hidden border border-white/5">
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-primary-container/20 to-secondary-container/20"></div>
        
        <div className="relative pt-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary shadow-[0_0_15px_rgba(255,182,147,0.4)]">
            <img className="w-full h-full object-cover" src={user?.avatarUrl} alt="avatar" />
          </div>
          <span className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-[#131314] flex items-center justify-center">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          </span>
        </div>

        <div>
          <h3 className="font-headline-sm text-base text-white font-bold">{user?.username}</h3>
          <p className="text-[9px] font-label-caps text-secondary-container uppercase tracking-widest mt-0.5">Lobby Level 14</p>
        </div>

        {/* Action button */}
        <button onClick={() => navigate('/settings')} className="bg-white/5 border border-white/5 text-xs text-white px-4 py-1.5 rounded-lg font-bold hover:bg-white/10 active:scale-95 transition-all">
          Edit Profile
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card rounded-2xl p-4 text-center border border-white/5">
          <span className="material-symbols-outlined text-primary text-xl">sports_esports</span>
          <p className="text-2xl font-black text-white font-display-lg italic mt-1">18</p>
          <p className="text-[9px] font-label-caps text-on-surface-variant/40 uppercase mt-0.5">Matches Played</p>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center border border-white/5">
          <span className="material-symbols-outlined text-[#14D1FF] text-xl">emoji_events</span>
          <p className="text-2xl font-black text-white font-display-lg italic mt-1">8</p>
          <p className="text-[9px] font-label-caps text-on-surface-variant/40 uppercase mt-0.5">Tournaments Won</p>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center border border-white/5">
          <span className="material-symbols-outlined text-primary text-xl">skull</span>
          <p className="text-2xl font-black text-white font-display-lg italic mt-1">48</p>
          <p className="text-[9px] font-label-caps text-on-surface-variant/40 uppercase mt-0.5">Total Kills</p>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center border border-white/5">
          <span className="material-symbols-outlined text-[#14D1FF] text-xl">grade</span>
          <p className="text-2xl font-black text-white font-display-lg italic mt-1">74%</p>
          <p className="text-[9px] font-label-caps text-on-surface-variant/40 uppercase mt-0.5">Win Rate</p>
        </div>
      </div>

      {/* Badges / Accomplishments */}
      <section className="space-y-3">
        <h4 className="font-headline-sm text-xs font-bold text-white/50 uppercase tracking-wider">
          Accomplishments
        </h4>
        <div className="glass-card rounded-2xl p-4 divide-y divide-white/5 border border-white/5 space-y-3">
          <div className="flex items-center gap-3 py-1.5">
            <span className="text-2xl bg-amber-400/10 text-amber-400 p-2 rounded-xl border border-amber-400/20 flex items-center justify-center shrink-0">🎖️</span>
            <div>
              <p className="text-xs font-bold text-white">Elite Booyah Champion</p>
              <p className="text-[10px] text-on-surface-variant/50">Won 3 consecutive custom solo lobby tournaments.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-3 py-1.5">
            <span className="text-2xl bg-[#14D1FF]/10 text-[#14D1FF] p-2 rounded-xl border border-[#14D1FF]/20 flex items-center justify-center shrink-0">🎯</span>
            <div>
              <p className="text-xs font-bold text-white">Sharpshooter Hunter</p>
              <p className="text-[10px] text-on-surface-variant/50">Landed over 15 sniper headshot eliminations in matches.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Logout button */}
      <button 
        onClick={handleLogout}
        className="w-full bg-error-container/10 border border-error/20 text-error h-11 rounded-xl font-bold text-xs flex items-center justify-center gap-1 hover:bg-error-container/15 active:scale-98 transition-all"
      >
        <span className="material-symbols-outlined text-sm">logout</span> Leave Lobby (Log Out)
      </button>
    </div>
  );
};
