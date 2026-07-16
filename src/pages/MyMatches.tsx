import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { tournamentService } from '../services/tournamentService';
import type { Tournament } from '../types';

export const MyMatches: React.FC = () => {
  const { joinedTournamentIds } = useApp();
  const [joinedTournaments, setJoinedTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJoined = async () => {
      const list = await tournamentService.getJoinedTournaments();
      setJoinedTournaments(list);
      setLoading(false);
    };
    fetchJoined();
  }, [joinedTournamentIds]);

  return (
    <div className="px-gutter space-y-stack-md animate-fade-in">
      <div className="flex flex-col gap-1">
        <h2 className="font-display-lg text-xl font-black text-white uppercase">My Matches</h2>
        <p className="text-on-surface-variant/60 text-xs">Track room schedules and match results</p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-xs text-on-surface-variant/40">Loading matches...</div>
      ) : joinedTournaments.length === 0 ? (
        <div className="glass-card rounded-2xl p-10 text-center flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant/30">
            calendar_today
          </span>
          <div className="space-y-1">
            <p className="text-on-surface-variant/60 text-sm font-semibold">No registered matches</p>
            <p className="text-on-surface-variant/40 text-xs">You haven't registered in any tournament yet.</p>
          </div>
          <button 
            onClick={() => navigate('/tournaments')} 
            className="bg-primary-container text-on-primary-fixed px-5 py-2.5 rounded-xl text-xs font-bold neon-glow-primary active:scale-95 transition-all mt-2"
          >
            Find Tournaments
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {joinedTournaments.map((tournament) => (
            <div
              key={tournament.id}
              onClick={() => navigate(`/tournament/${tournament.id}`)}
              className="glass-card rounded-2xl p-4 cursor-pointer border border-white/5 hover:border-white/10 active:scale-99 transition-all space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary text-[8px] font-label-caps uppercase rounded">
                    {tournament.gameType}
                  </span>
                  <h3 className="font-headline-sm text-sm text-white font-semibold mt-1">
                    {tournament.title}
                  </h3>
                  <p className="text-on-surface-variant/60 text-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">schedule</span>
                    {tournament.startTime}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-secondary-container font-bold text-sm">Registered</span>
                  <p className="text-[8px] font-label-caps text-on-surface-variant/30 uppercase mt-0.5">Slot Confirmed</p>
                </div>
              </div>

              {/* Lobby Details Box */}
              <div className="p-3 bg-[#131314] rounded-xl border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant/60">Room ID</span>
                  <span className="text-white font-label-caps font-bold">1294829</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant/60">Password</span>
                  <span className="text-white font-label-caps font-bold">48294</span>
                </div>
                <p className="text-[9px] text-primary/80 font-semibold flex items-center gap-1 pt-1 border-t border-white/5">
                  <span className="material-symbols-outlined text-xs">info</span>
                  Room credentials will unlock 15 minutes before the match start.
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
