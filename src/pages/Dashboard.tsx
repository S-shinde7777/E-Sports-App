import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { mockDb } from '../services/mockData';

export const Dashboard: React.FC = () => {
  const { tournaments, user } = useApp();
  const navigate = useNavigate();
  const [imgErr, setImgErr] = useState(false);

  const liveMatches = mockDb.getLiveMatches();
  const openTournaments = tournaments.filter(t => t.status === 'open');
  const liveTournaments = tournaments.filter(t => t.status === 'live');
  const featuredTournament = openTournaments[0] ?? liveTournaments[0];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="px-4 pb-4 space-y-5 animate-fade-in">
      {/* Greeting strip */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <p className="text-[11px] text-[#e2bfb0]/50 font-mono uppercase tracking-widest">{greeting}</p>
          <p
            className="text-[17px] font-black text-white leading-tight mt-0.5"
            style={{ fontFamily: '"Sora", sans-serif' }}
          >
            {user?.username ?? 'Player'} 👋
          </p>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl cursor-pointer active:scale-95 transition-transform"
          style={{ background: 'rgba(255,107,0,0.12)', border: '1px solid rgba(255,107,0,0.2)' }}
          onClick={() => navigate('/wallet')}
        >
          <span className="material-symbols-outlined text-[#ffb693] text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>
            account_balance_wallet
          </span>
          <span className="text-[#ffb693] text-xs font-bold">₹{user?.walletBalance ?? 0}</span>
        </div>
      </div>

      {/* Hero Banner */}
      {featuredTournament && (
        <section
          className="relative w-full h-48 rounded-2xl overflow-hidden cursor-pointer active:scale-[0.99] transition-transform"
          onClick={() => navigate(`/tournament/${featuredTournament.id}`)}
        >
          <img
            className="w-full h-full object-cover"
            src={imgErr ? 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop' : featuredTournament.imageBanner}
            alt={featuredTournament.title}
            onError={() => setImgErr(true)}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          {/* Tag */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="badge-live">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb693] animate-pulse" />
              {featuredTournament.status === 'live' ? 'Live Now' : 'Registering'}
            </span>
          </div>
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2.5">
            <h2
              className="text-[18px] font-black text-white leading-tight max-w-[75%]"
              style={{ fontFamily: '"Sora", sans-serif' }}
            >
              {featuredTournament.title.toUpperCase()}
            </h2>
            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-[#1a0900] neon-glow-primary active:scale-95 transition-all"
                style={{ background: '#ff6b00' }}
              >
                Register Now
                <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
              </button>
              <span className="text-white/70 text-xs font-mono">
                ₹{featuredTournament.prizePool} Prize Pool
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Live Matches */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3
            className="text-sm font-bold text-white flex items-center gap-2"
            style={{ fontFamily: '"Sora", sans-serif' }}
          >
            <span className="w-2 h-2 rounded-full bg-[#ffb693] animate-pulse shadow-[0_0_8px_#ffb693]" />
            Live Matches
          </h3>
          <button
            className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#14d1ff] active:opacity-70"
            onClick={() => navigate('/live-results')}
          >
            View All →
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
          {liveMatches.map((match) => (
            <div
              key={match.id}
              onClick={() => navigate('/live-results')}
              className="flex-shrink-0 w-60 glass-card rounded-xl p-4 space-y-3 cursor-pointer active:scale-[0.98] transition-all"
            >
              <div className="flex justify-between items-center">
                <span className="badge-live">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb693] animate-pulse" />
                  LIVE
                </span>
                <div className="flex items-center gap-1 text-[10px]" style={{ color: 'rgba(226,191,176,0.5)' }}>
                  <span className="material-symbols-outlined text-xs">visibility</span>
                  {match.spectators}
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                {/* Team 1 */}
                <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
                  <div className="w-11 h-11 rounded-lg bg-[#201f20] flex items-center justify-center p-1.5 border border-white/5">
                    <img className="w-full h-full object-contain" src={match.team1.logo} alt={match.team1.name} />
                  </div>
                  <span className="text-[9px] font-bold truncate w-full text-center text-white/80">
                    {match.team1.name}
                  </span>
                </div>

                {/* Score */}
                <div className="flex flex-col items-center">
                  <div
                    className="text-base font-black flex gap-1.5"
                    style={{ fontFamily: '"Sora", sans-serif', color: '#ffb693' }}
                  >
                    <span>{match.score1}</span>
                    <span style={{ color: 'rgba(255,255,255,0.15)' }}>:</span>
                    <span>{match.score2}</span>
                  </div>
                  <span className="text-[8px] font-mono text-[#e2bfb0]/30 uppercase tracking-wider mt-0.5">Score</span>
                </div>

                {/* Team 2 */}
                <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
                  <div className="w-11 h-11 rounded-lg bg-[#201f20] flex items-center justify-center p-1.5 border border-white/5">
                    <img className="w-full h-full object-contain" src={match.team2.logo} alt={match.team2.name} />
                  </div>
                  <span className="text-[9px] font-bold truncate w-full text-center text-white/80">
                    {match.team2.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Tournaments */}
      <section className="space-y-3">
        <h3
          className="text-sm font-bold text-white"
          style={{ fontFamily: '"Sora", sans-serif' }}
        >
          Featured Tournaments
        </h3>
        <div className="space-y-3">
          {openTournaments.map((tournament) => (
            <div
              key={tournament.id}
              onClick={() => navigate(`/tournament/${tournament.id}`)}
              className="glass-card rounded-2xl overflow-hidden cursor-pointer active:scale-[0.99] transition-all"
            >
              <div className="relative h-28">
                <img className="w-full h-full object-cover" src={tournament.imageBanner} alt={tournament.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131314] to-transparent" />
                {/* Slots chip */}
                <div
                  className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold"
                  style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}
                >
                  <span className="material-symbols-outlined text-[#ffb693] text-xs" style={{ fontVariationSettings: '"FILL" 1' }}>groups</span>
                  {tournament.filledSlots}/{tournament.totalSlots}
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 min-w-0 pr-2">
                    <h4
                      className="text-sm font-bold text-white leading-tight"
                      style={{ fontFamily: '"Sora", sans-serif' }}
                    >
                      {tournament.title}
                    </h4>
                    <p className="text-[11px] text-[#e2bfb0]/50 mt-0.5">{tournament.startTime}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-base font-black text-[#ffb693]" style={{ fontFamily: '"Sora", sans-serif' }}>
                      ₹{tournament.prizePool}
                    </p>
                    <p className="text-[8px] font-mono text-[#e2bfb0]/35 uppercase tracking-wider">Prize Pool</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="badge-open">{tournament.gameType}</span>
                  <button
                    className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-[11px] font-bold text-[#1a0900] neon-glow-primary active:scale-95 transition-transform"
                    style={{ background: '#ff6b00' }}
                    onClick={e => { e.stopPropagation(); navigate(`/tournament/${tournament.id}`); }}
                  >
                    Join • ₹{tournament.entryFee}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
