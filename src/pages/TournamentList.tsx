import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const TournamentList: React.FC = () => {
  const { tournaments } = useApp();
  const [activeTab, setActiveTab] = useState<'open' | 'live' | 'completed'>('open');
  const navigate = useNavigate();

  const filteredTournaments = tournaments.filter(t => t.status === activeTab);

  const tabs: { id: 'open' | 'live' | 'completed'; label: string }[] = [
    { id: 'open', label: 'Registering' },
    { id: 'live', label: 'Ongoing (Live)' },
    { id: 'completed', label: 'Results' },
  ];

  return (
    <div className="px-gutter space-y-stack-md animate-fade-in">
      <div className="flex flex-col gap-1">
        <h2 className="font-display-lg text-xl font-black text-white uppercase">Tournaments</h2>
        <p className="text-on-surface-variant/60 text-xs">Join competitive rooms and win big rewards</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#1C1B1C] p-1 rounded-xl border border-white/5">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 text-center text-xs font-semibold rounded-lg transition-all ${
                isSelected 
                  ? 'bg-primary-container text-on-primary-fixed shadow-[0_0_10px_rgba(255,107,0,0.25)]' 
                  : 'text-on-surface-variant/60 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tournament Cards */}
      <div className="space-y-4">
        {filteredTournaments.length === 0 ? (
          <div className="glass-card rounded-2xl p-8 text-center flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant/30">
              folder_open
            </span>
            <p className="text-on-surface-variant/40 text-xs font-medium">
              No tournaments in this category
            </p>
          </div>
        ) : (
          filteredTournaments.map((tournament) => (
            <div
              key={tournament.id}
              onClick={() => navigate(`/tournament/${tournament.id}`)}
              className="glass-card rounded-2xl overflow-hidden cursor-pointer hover:border-white/12 active:scale-99 transition-all"
            >
              <div className="relative h-28">
                <img className="w-full h-full object-cover" src={tournament.imageBanner} alt={tournament.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131314] to-transparent"></div>
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/5 text-[9px] font-bold">
                  {activeTab === 'open' && (
                    <>
                      <span className="w-1.5 h-1.5 bg-[#4cd6ff] rounded-full"></span>
                      {tournament.slotsRemaining} Slots Left
                    </>
                  )}
                  {activeTab === 'live' && (
                    <>
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                      WATCHING LIVE
                    </>
                  )}
                  {activeTab === 'completed' && (
                    <>
                      <span className="w-1.5 h-1.5 bg-on-surface-variant/40 rounded-full"></span>
                      COMPLETED
                    </>
                  )}
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div className="space-y-1">
                  <span className="px-2 py-0.5 bg-white/5 border border-white/5 rounded text-[8px] font-label-caps uppercase tracking-wider text-secondary-container">
                    {tournament.gameType}
                  </span>
                  <h3 className="font-headline-sm text-sm text-white font-semibold mt-1">
                    {tournament.title}
                  </h3>
                  <p className="text-on-surface-variant/50 text-[11px]">
                    {tournament.startTime}
                  </p>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <span className="text-primary font-bold text-base leading-none">
                    ₹{tournament.prizePool}
                  </span>
                  <span className="text-[8px] font-label-caps text-on-surface-variant/40 uppercase">
                    Prize Pool
                  </span>
                  {activeTab === 'open' && (
                    <button className="bg-primary-container text-on-primary-fixed px-3 py-1 rounded text-xs font-bold mt-1 shadow-[0_0_8px_rgba(255,107,0,0.2)]">
                      Join • ₹{tournament.entryFee}
                    </button>
                  )}
                  {activeTab === 'live' && (
                    <button className="bg-[#14D1FF]/10 text-[#14D1FF] border border-[#14D1FF]/20 px-3 py-1 rounded text-xs font-bold mt-1">
                      Spectate
                    </button>
                  )}
                  {activeTab === 'completed' && (
                    <button className="bg-white/5 text-on-surface-variant/80 border border-white/5 px-3 py-1 rounded text-xs font-bold mt-1">
                      Standings
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
