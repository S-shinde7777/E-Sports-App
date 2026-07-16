import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, notifications } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navItems = [
    { path: '/dashboard', label: 'Home', icon: 'home' },
    { path: '/tournaments', label: 'Tournaments', icon: 'sports_esports' },
    { path: '/my-matches', label: 'My Matches', icon: 'schedule' },
    { path: '/leaderboard', label: 'Rankings', icon: 'leaderboard' },
    { path: '/wallet', label: 'Wallet', icon: 'account_balance_wallet' },
  ];

  // Hide nav layout for splash and login
  const hideLayout = ['/', '/login'].includes(location.pathname);

  if (hideLayout) {
    return (
      <div className="w-[390px] min-h-screen mx-auto bg-[#0A0A0B] relative shadow-[0_0_80px_rgba(0,0,0,0.9)] border-x border-white/5">
        {children}
      </div>
    );
  }

  return (
    /*
     * FIX: The entire app is wrapped in a centered 390px column.
     * Header and nav use position:sticky relative to this wrapper,
     * NOT fixed to the viewport — this ensures they never spill
     * outside the phone frame on wide desktop screens.
     */
    <div className="flex justify-center min-h-screen bg-[#060607]">
      {/* Phone frame column */}
      <div className="w-[390px] min-h-screen bg-[#0A0A0B] relative flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.9)] border-x border-white/5">

        {/* Top App Bar — sticky inside the 390px column */}
        <header className="sticky top-0 z-50 bg-[#131314]/90 backdrop-blur-xl border-b border-white/5 flex justify-between items-center h-16 px-[12px] shrink-0">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/profile')}>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#ffb693]/20 bg-[#1C1B1C]">
              <img
                className="w-full h-full object-cover"
                src={user?.avatarUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuCFbvoe6oSRrWwK1HW09Gwf3NHkJwBiM4tKOOP7JPgZd5D-VFQ8WC90WAUhIzJEF0J5wBbb7tUKGVJHEuUGnL6mbe0dTEaF8bPe63QkLvuX57L8GxWJ8vpPmtNft0kQ3YByNw4f0ewfo5ct6DQe1iJ_3juQkYNHJBsbdrKpb8HYd9gOQexAjAj12vhys-OAs_8T6zUSneWv9QdRehWsjz22kFNp-ws4XL74PgrcTJ1xThjnI7F3ksMBjEnjihSX85LD6hWrk636gQ"}
                alt="avatar"
              />
            </div>
            <span
              className="italic font-black text-[24px] leading-none tracking-tight drop-shadow-[0_0_8px_rgba(255,182,147,0.4)]"
              style={{ fontFamily: '"Sora", sans-serif', color: '#ffb693' }}
            >
              Nexus
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/notifications')}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 active:scale-95 transition-transform relative"
            >
              <span className="material-symbols-outlined text-[#e2bfb0] text-[22px]">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#ffb693] rounded-full ring-2 ring-[#131314] animate-pulse"></span>
              )}
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[#e2bfb0] text-[22px]">settings</span>
            </button>
          </div>
        </header>

        {/* Main Scrollable Content */}
        <main className="flex-grow overflow-y-auto hide-scrollbar pb-24 pt-4">
          {children}
        </main>

        {/* Bottom Navigation Bar — sticky at bottom of column */}
        <nav className="sticky bottom-0 z-50 bg-[#131314]/95 backdrop-blur-xl border-t border-white/5 flex justify-around items-center h-20 px-[12px] pb-4 shrink-0">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path === '/tournaments' && location.pathname.startsWith('/tournament'));
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center w-14 h-12 transition-all relative active:scale-90"
              >
                <span
                  className={`material-symbols-outlined text-[24px] transition-colors ${
                    isActive
                      ? 'drop-shadow-[0_0_6px_rgba(255,182,147,0.5)]'
                      : ''
                  }`}
                  style={{
                    color: isActive ? '#ffb693' : 'rgba(226,191,176,0.5)',
                    fontVariationSettings: isActive ? '"FILL" 1' : '"FILL" 0',
                  }}
                >
                  {item.icon}
                </span>
                <span
                  className="text-[10px] font-medium tracking-tight mt-1 transition-colors"
                  style={{ color: isActive ? '#ffb693' : 'rgba(226,191,176,0.35)' }}
                >
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 w-1.5 h-1.5 bg-[#ffb693] rounded-full"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
