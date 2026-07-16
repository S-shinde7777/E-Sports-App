import React from 'react';

export const Leaderboard: React.FC = () => {


  const leaders = [
    { rank: 1, name: 'SagarPro_FF', kills: 48, points: 280, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFbvoe6oSRrWwK1HW09Gwf3NHkJwBiM4tKOOP7JPgZd5D-VFQ8WC90WAUhIzJEF0J5wBbb7tUKGVJHEuUGnL6mbe0dTEaF8bPe63QkLvuX57L8GxWJ8vpPmtNft0kQ3YByNw4f0ewfo5ct6DQe1iJ_3juQkYNHJBsbdrKpb8HYd9gOQexAjAj12vhys-OAs_8T6zUSneWv9QdRehWsjz22kFNp-ws4XL74PgrcTJ1xThjnI7F3ksMBjEnjihSX85LD6hWrk636gQ', isSelf: true },
    { rank: 2, name: 'Killer_Jordi', kills: 42, points: 245, avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=100&auto=format&fit=crop' },
    { rank: 3, name: 'Phantom_X', kills: 39, points: 230, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop' },
    { rank: 4, name: 'SniperKing_99', kills: 35, points: 210, avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop' },
    { rank: 5, name: 'ClawGamer_FF', kills: 31, points: 195, avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100&auto=format&fit=crop' },
    { rank: 6, name: 'Ninja_Booyah', kills: 27, points: 180, avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?q=80&w=100&auto=format&fit=crop' }
  ];

  return (
    <div className="px-gutter space-y-stack-md animate-fade-in">
      <div className="flex flex-col gap-1">
        <h2 className="font-display-lg text-xl font-black text-white uppercase">Clan Rankings</h2>
        <p className="text-on-surface-variant/60 text-xs">Top performers in Free Fire Elite Series</p>
      </div>

      {/* Stats Summary Card */}
      <div className="glass-card rounded-2xl p-4 flex justify-between items-center text-center">
        <div className="flex-1 border-r border-white/5 py-1">
          <p className="text-[10px] font-label-caps text-on-surface-variant/40 uppercase">My Rank</p>
          <p className="text-primary font-black text-lg">#1</p>
        </div>
        <div className="flex-1 border-r border-white/5 py-1">
          <p className="text-[10px] font-label-caps text-on-surface-variant/40 uppercase">Total Kills</p>
          <p className="text-white font-black text-lg">48</p>
        </div>
        <div className="flex-1 py-1">
          <p className="text-[10px] font-label-caps text-on-surface-variant/40 uppercase">Win Rate</p>
          <p className="text-secondary-container font-black text-lg">74%</p>
        </div>
      </div>

      {/* Rankings List */}
      <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
        <div className="grid grid-cols-12 bg-white/5 px-4 py-2 text-[9px] font-label-caps uppercase tracking-wider text-on-surface-variant/50 border-b border-white/5">
          <div className="col-span-2">Rank</div>
          <div className="col-span-5">Player</div>
          <div className="col-span-2 text-center">Kills</div>
          <div className="col-span-3 text-right">Points</div>
        </div>

        <div className="divide-y divide-white/5">
          {leaders.map((leader, i) => {
            const isTop3 = leader.rank <= 3;
            const rankColors = 
              leader.rank === 1 ? 'text-amber-400' :
              leader.rank === 2 ? 'text-slate-300' :
              leader.rank === 3 ? 'text-amber-700' : 'text-on-surface-variant/60';

            return (
              <div 
                key={i} 
                className={`grid grid-cols-12 items-center px-4 py-3 text-xs transition-colors ${
                  leader.isSelf ? 'bg-primary/5' : i % 2 === 1 ? 'bg-white/[0.02]' : ''
                }`}
              >
                {/* Rank number or icon */}
                <div className="col-span-2 font-display-lg italic font-black text-sm">
                  {isTop3 ? (
                    <span className={`material-symbols-outlined text-base ${rankColors}`} style={{ fontVariationSettings: '"FILL" 1' }}>
                      emoji_events
                    </span>
                  ) : (
                    <span className={rankColors}>#{leader.rank}</span>
                  )}
                </div>

                {/* Profile Avatar and Name */}
                <div className="col-span-5 flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-white/5 bg-[#201F20]">
                    <img className="w-full h-full object-cover" src={leader.avatar} alt="avatar" />
                  </div>
                  <span className={`font-semibold truncate text-white/90 ${leader.isSelf ? 'text-primary font-bold' : ''}`}>
                    {leader.name} {leader.isSelf && '(You)'}
                  </span>
                </div>

                {/* Kills */}
                <div className="col-span-2 text-center text-white/80 font-medium">
                  {leader.kills}
                </div>

                {/* Points */}
                <div className="col-span-3 text-right text-primary font-bold">
                  {leader.points} pts
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
