import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

type SubTab = 'rules' | 'prizes' | 'players';

export const TournamentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tournaments, joinedTournamentIds, registerForTournament, user } = useApp();
  const [activeTab, setActiveTab] = useState<SubTab>('rules');
  const [isRegistering, setIsRegistering] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const msgRef = useRef<HTMLDivElement>(null);

  const tournament = tournaments.find(t => t.id === id);
  const isJoined = joinedTournamentIds.includes(id ?? '');
  const fillPct = tournament ? (tournament.filledSlots / tournament.totalSlots) * 100 : 0;

  // Scroll msg into view after it appears
  useEffect(() => {
    if (msg) {
      setTimeout(() => msgRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    }
  }, [msg]);

  if (!tournament) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-24 space-y-4 text-center">
        <span className="material-symbols-outlined text-5xl text-[#e2bfb0]/20">search_off</span>
        <p className="text-[#e2bfb0]/50 text-sm">Tournament not found</p>
        <button
          onClick={() => navigate('/tournaments')}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#1a0900]"
          style={{ background: '#ff6b00' }}
        >
          Browse Tournaments
        </button>
      </div>
    );
  }

  const handleRegister = async () => {
    if (isJoined || isRegistering) return;
    setMsg(null);
    setIsRegistering(true);
    try {
      const res = await registerForTournament(tournament.id);
      setMsg({
        type: res.success ? 'success' : 'error',
        text: res.success ? 'Slot locked! Room credentials will be shared before match start.' : (res.error ?? 'Registration failed'),
      });
    } catch {
      setMsg({ type: 'error', text: 'Unexpected error. Please try again.' });
    } finally {
      setIsRegistering(false);
    }
  };

  const tabs: SubTab[] = ['rules', 'prizes', 'players'];

  return (
    <div className="animate-fade-in pb-6">
      {/* Back header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-xl active:scale-90 transition-transform"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <span className="material-symbols-outlined text-[#e5e2e3] text-lg">arrow_back</span>
        </button>
        <h2
          className="text-sm font-bold text-white"
          style={{ fontFamily: '"Sora", sans-serif' }}
        >
          Tournament Details
        </h2>
      </div>

      {/* Banner */}
      <div className="relative h-44 mx-4 rounded-2xl overflow-hidden">
        <img className="w-full h-full object-cover" src={tournament.imageBanner} alt={tournament.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/30 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          {tournament.status === 'live' ? (
            <span className="badge-live">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb693] animate-pulse" />
              Live Now
            </span>
          ) : tournament.status === 'open' ? (
            <span className="badge-open">Registering</span>
          ) : (
            <span className="badge-done">Completed</span>
          )}
        </div>
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold"
          style={{ background: 'rgba(255,107,0,0.85)', color: '#1a0900', backdropFilter: 'blur(8px)' }}
        >
          Entry ₹{tournament.entryFee}
        </div>
      </div>

      {/* Info card */}
      <div className="mx-4 mt-4 glass-card rounded-2xl p-5 space-y-4">
        <div>
          <span className="badge-open text-[8px] mb-2 inline-block">{tournament.gameType}</span>
          <h3
            className="text-lg font-black text-white mt-1"
            style={{ fontFamily: '"Sora", sans-serif' }}
          >
            {tournament.title}
          </h3>
          <p className="text-xs text-[#e2bfb0]/50 mt-1 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-xs">schedule</span>
            {tournament.startTime}
          </p>
        </div>

        {/* Slot bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-[#e2bfb0]/60">Registrations</span>
            <span className="text-[#ffb693]">{tournament.filledSlots} / {tournament.totalSlots} Slots</span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${fillPct}%`,
                background: 'linear-gradient(90deg, #14d1ff, #ffb693)',
              }}
            />
          </div>
          <p className="text-[10px] font-mono text-[#e2bfb0]/35 uppercase tracking-wider">
            {tournament.slotsRemaining} slots remaining
          </p>
        </div>

        {/* Prize summary */}
        <div
          className="flex justify-between items-center p-3 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb693] text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>
              emoji_events
            </span>
            <div>
              <p className="text-[9px] font-mono text-[#e2bfb0]/35 uppercase tracking-wider">Prize Pool</p>
              <p className="text-sm font-black text-white" style={{ fontFamily: '"Sora", sans-serif' }}>₹{tournament.prizePool}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-mono text-[#e2bfb0]/35 uppercase tracking-wider">1st Place</p>
            <p className="text-sm font-black text-[#14d1ff]" style={{ fontFamily: '"Sora", sans-serif' }}>
              ₹{Math.floor(tournament.prizePool * 0.5)}
            </p>
          </div>
        </div>
      </div>

      {/* Msg */}
      {msg && (
        <div
          ref={msgRef}
          className="mx-4 mt-4 p-4 rounded-xl flex items-start gap-2.5 text-xs"
          style={{
            background: msg.type === 'success' ? 'rgba(255,107,0,0.08)' : 'rgba(147,0,10,0.12)',
            border: `1px solid ${msg.type === 'success' ? 'rgba(255,107,0,0.25)' : 'rgba(255,180,171,0.2)'}`,
            color: msg.type === 'success' ? '#ffb693' : '#ffb4ab',
          }}
        >
          <span className="material-symbols-outlined text-sm mt-0.5" style={{ fontVariationSettings: '"FILL" 1' }}>
            {msg.type === 'success' ? 'check_circle' : 'error'}
          </span>
          <div className="flex-1">
            <p className="font-bold">{msg.type === 'success' ? 'Joined Successfully!' : 'Registration Failed'}</p>
            <p className="mt-0.5 text-[#e2bfb0]/70">{msg.text}</p>
            {msg.type === 'error' && msg.text.toLowerCase().includes('balance') && (
              <button
                onClick={() => navigate('/wallet')}
                className="mt-2 text-[10px] font-bold text-[#14d1ff] flex items-center gap-1"
              >
                Add Funds to Wallet
                <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mx-4 mt-5">
        <div className="flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 pb-2.5 text-center text-[10px] font-bold uppercase tracking-widest transition-all"
              style={{
                borderBottom: activeTab === tab ? '2px solid #ffb693' : '2px solid transparent',
                color: activeTab === tab ? '#ffb693' : 'rgba(226,191,176,0.35)',
                fontFamily: '"JetBrains Mono", monospace',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {/* Rules */}
          {activeTab === 'rules' && (
            <div className="glass-card rounded-2xl p-5 space-y-4 animate-fade-only">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/70">
                Match Rules & Guidelines
              </h4>
              <ul className="space-y-3">
                {(tournament.rules ?? ['Standard competitive rules apply.']).map((rule, i) => (
                  <li key={i} className="flex gap-3 text-xs text-[#e2bfb0]/70">
                    <span
                      className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-mono font-bold"
                      style={{ background: 'rgba(255,107,0,0.12)', border: '1px solid rgba(255,107,0,0.2)', color: '#ffb693' }}
                    >
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prizes */}
          {activeTab === 'prizes' && (
            <div className="glass-card rounded-2xl p-5 space-y-3 animate-fade-only">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/70 mb-1">
                Prize Breakdown
              </h4>
              {[
                { rank: '1st', label: 'Booyah!', pct: 0.5, color: '#f59e0b', icon: 'emoji_events' },
                { rank: '2nd', label: 'Runner Up', pct: 0.25, color: '#94a3b8', icon: 'emoji_events' },
                { rank: '3rd', label: 'Third Place', pct: 0.15, color: '#b45309', icon: 'emoji_events' },
                { rank: 'Per Kill', label: 'Kill Bonus', pct: 0, color: '#14d1ff', icon: 'gps_fixed' },
              ].map(row => (
                <div key={row.rank} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-sm" style={{ color: row.color, fontVariationSettings: '"FILL" 1' }}>
                      {row.icon}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-white">{row.rank}</p>
                      <p className="text-[10px] text-[#e2bfb0]/40">{row.label}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black" style={{ color: row.color }}>
                    {row.pct > 0 ? `₹${Math.floor(tournament.prizePool * row.pct)}` : '₹2.00'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Players */}
          {activeTab === 'players' && (
            <div className="glass-card rounded-2xl p-5 space-y-3 animate-fade-only">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/70">
                Registered Competitors
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto hide-scrollbar">
                {isJoined && (
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-xs font-semibold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#14d1ff]" />
                      {user?.username} (You)
                    </span>
                    <span className="text-[9px] font-mono text-[#14d1ff]">Lobby Joined</span>
                  </div>
                )}
                {['Killer_Jordi', 'Phantom_X', 'Scout_Noob', 'ShadowAce', 'NightRaider', 'BladeRunner_99'].map(name => (
                  <div key={name} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                    <span className="text-xs text-white/70 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      {name}
                    </span>
                    <span className="text-[9px] font-mono text-[#e2bfb0]/35">Ready</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      {tournament.status === 'open' && (
        <div className="mx-4 mt-6 space-y-2">
          <button
            onClick={handleRegister}
            disabled={isRegistering || isJoined}
            className="w-full h-13 rounded-2xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2"
            style={{
              height: '52px',
              background: isJoined
                ? 'rgba(20,209,255,0.08)'
                : '#ff6b00',
              border: isJoined ? '1px solid rgba(20,209,255,0.2)' : 'none',
              color: isJoined ? '#14d1ff' : '#1a0900',
              boxShadow: isJoined ? 'none' : '0 0 20px rgba(255,107,0,0.4)',
              fontFamily: '"Sora", sans-serif',
              opacity: isRegistering ? 0.75 : 1,
            }}
          >
            {isRegistering ? (
              <>
                <span className="material-symbols-outlined text-sm animate-spin">autorenew</span>
                Processing…
              </>
            ) : isJoined ? (
              <>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                Slot Reserved
              </>
            ) : (
              `Register Now • Pay ₹${tournament.entryFee}`
            )}
          </button>
          {!isJoined && (
            <p className="text-[10px] text-center font-mono text-[#e2bfb0]/30">
              ₹{tournament.entryFee} will be deducted from Nexus Wallet
              {user ? ` (Balance: ₹${user.walletBalance})` : ''}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
