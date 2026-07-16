import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDb } from '../services/mockData';

export const LiveResults: React.FC = () => {
  const navigate = useNavigate();
  const liveMatches = mockDb.getLiveMatches();

  const pastResults = [
    {
      id: 'pr_01',
      title: 'Weekly Elite: Group A',
      game: 'Free Fire Solo',
      time: 'Completed 2 hours ago',
      winner: 'SniperKing_99',
      kills: 14,
      points: 80,
      imageBanner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'pr_02',
      title: 'Clash Squad: Arena',
      game: 'Free Fire Squad',
      time: 'Completed 1 day ago',
      winner: 'ALPHA SQUAD',
      kills: 28,
      points: 120,
      imageBanner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop'
    }
  ];

  return (
    <div className="px-gutter space-y-stack-md animate-fade-in">
      {/* Back to dashboard */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/dashboard')} className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/5 active:scale-95">
          <span className="material-symbols-outlined text-on-surface text-lg">arrow_back</span>
        </button>
        <span className="font-headline-sm text-sm text-white font-bold">Match Scoreboards</span>
      </div>

      {/* Active Live Section */}
      <section className="space-y-3">
        <h3 className="font-headline-sm text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#ffb693]"></span>
          Ongoing Matches
        </h3>
        <div className="space-y-4">
          {liveMatches.map((match) => (
            <div key={match.id} className="glass-card rounded-2xl p-5 border border-white/5 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <div className="bg-primary/10 text-primary text-[8px] font-bold px-2 py-0.5 rounded border border-primary/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span> LIVE SCREEN
                </div>
                <div className="flex items-center gap-1.5 text-on-surface-variant/60">
                  <span className="material-symbols-outlined text-xs">visibility</span>
                  <span>{match.spectators} Watching</span>
                </div>
              </div>

              {/* Scoreboard block */}
              <div className="flex items-center justify-between gap-4">
                {/* Team 1 */}
                <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
                  <div className="w-14 h-14 rounded-xl bg-[#201F20] border border-white/5 flex items-center justify-center p-2">
                    <img className="w-full h-full object-contain" src={match.team1.logo} alt="t1" />
                  </div>
                  <span className="text-xs font-bold text-white truncate w-full text-center">{match.team1.name}</span>
                </div>

                {/* Score vs */}
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-black text-primary drop-shadow-[0_0_10px_rgba(255,182,147,0.3)] flex gap-2 font-display-lg italic">
                    <span>{match.score1}</span>
                    <span className="text-white/20">:</span>
                    <span>{match.score2}</span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-white/5 text-on-surface-variant/40 rounded-full font-label-caps text-[9px] uppercase tracking-wider mt-1.5">
                    Round 4
                  </span>
                </div>

                {/* Team 2 */}
                <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
                  <div className="w-14 h-14 rounded-xl bg-[#201F20] border border-white/5 flex items-center justify-center p-2">
                    <img className="w-full h-full object-contain" src={match.team2.logo} alt="t2" />
                  </div>
                  <span className="text-xs font-bold text-white truncate w-full text-center">{match.team2.name}</span>
                </div>
              </div>

              {/* Streaming placeholder button */}
              <button className="w-full h-10 bg-secondary-container/10 text-secondary-container border border-secondary-container/20 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 active:scale-98 transition-all">
                <span className="material-symbols-outlined text-sm">play_circle</span>
                Watch Live broadcast
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Past Matches Section */}
      <section className="space-y-3 pt-2">
        <h3 className="font-headline-sm text-xs font-bold text-white/60 uppercase tracking-wider">
          Past Match Results
        </h3>
        <div className="space-y-4">
          {pastResults.map((res) => (
            <div key={res.id} className="glass-card rounded-2xl p-4 border border-white/5 space-y-3">
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-label-caps text-secondary-container font-semibold uppercase tracking-wider block">
                    {res.game}
                  </span>
                  <h4 className="font-semibold text-sm text-white">{res.title}</h4>
                  <p className="text-[10px] text-on-surface-variant/45">{res.time}</p>
                </div>
                <div className="bg-[#201F20] border border-white/5 px-2.5 py-1.5 rounded-xl text-center">
                  <span className="material-symbols-outlined text-xs text-amber-400 block" style={{ fontVariationSettings: '"FILL" 1' }}>emoji_events</span>
                  <span className="text-[9px] font-bold text-amber-400 font-label-caps uppercase">Winner</span>
                </div>
              </div>

              {/* Winner detail box */}
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black italic text-xs">
                    W
                  </div>
                  <div>
                    <p className="text-white font-semibold">{res.winner}</p>
                    <p className="text-[9px] text-on-surface-variant/40 uppercase font-label-caps">Booyah</p>
                  </div>
                </div>
                <div className="flex gap-4 text-right">
                  <div>
                    <span className="text-white font-bold">{res.kills}</span>
                    <span className="text-[8px] font-label-caps text-on-surface-variant/40 block uppercase">Kills</span>
                  </div>
                  <div>
                    <span className="text-primary font-bold">{res.points}</span>
                    <span className="text-[8px] font-label-caps text-on-surface-variant/40 block uppercase">Points</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
