import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { authService } from '../services/authService';

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { user, refreshUser } = useApp();
  const [username, setUsername] = useState(user?.username || '');
  const [avatar, setAvatar] = useState(user?.avatarUrl || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setMsg('');

    try {
      await authService.updateProfile(username, avatar);
      await refreshUser();
      setMsg('Profile updated successfully');
      setTimeout(() => setMsg(''), 2000);
    } catch (err) {
      setMsg('Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="px-gutter space-y-stack-md animate-fade-in pb-10">
      {/* Header back button */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/5 active:scale-95">
          <span className="material-symbols-outlined text-on-surface text-lg">arrow_back</span>
        </button>
        <span className="font-headline-sm text-sm text-white font-bold">App Settings</span>
      </div>

      {msg && (
        <div className="p-3 bg-primary-container/10 border border-primary/20 text-primary text-xs rounded-xl text-center">
          {msg}
        </div>
      )}

      {/* Edit Form */}
      <form onSubmit={handleSave} className="glass-card rounded-2xl p-5 space-y-4 border border-white/5">
        <h3 className="font-semibold text-xs text-white uppercase tracking-wider">Account Credentials</h3>

        <div className="space-y-1">
          <label className="text-[10px] font-label-caps text-on-surface-variant/50 uppercase tracking-widest">
            Clan Name / Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-11 px-4 bg-[#131314] border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-primary transition-all font-semibold"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-label-caps text-on-surface-variant/50 uppercase tracking-widest">
            Avatar Image URL
          </label>
          <input
            type="url"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="w-full h-11 px-4 bg-[#131314] border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-primary transition-all"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="w-full h-11 bg-primary-container text-on-primary-fixed rounded-xl font-bold text-xs neon-glow-primary active:scale-95 transition-all"
        >
          {isUpdating ? 'Saving profile changes...' : 'Save Settings'}
        </button>
      </form>

      {/* App Preferences */}
      <div className="glass-card rounded-2xl p-5 space-y-4 border border-white/5 text-xs">
        <h3 className="font-semibold text-xs text-white uppercase tracking-wider">Lobby Preferences</h3>

        <div className="flex justify-between items-center py-1">
          <div>
            <p className="font-semibold text-white">Push Notifications</p>
            <p className="text-[10px] text-on-surface-variant/45 mt-0.5">Receive room credentials immediately</p>
          </div>
          <span className="material-symbols-outlined text-primary text-2xl cursor-pointer">toggle_on</span>
        </div>

        <div className="flex justify-between items-center py-1 border-t border-white/5 pt-3">
          <div>
            <p className="font-semibold text-white">Sound Effects</p>
            <p className="text-[10px] text-on-surface-variant/45 mt-0.5">Lobby notification alarms</p>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant/40 text-2xl cursor-pointer">toggle_off</span>
        </div>
      </div>
    </div>
  );
};
