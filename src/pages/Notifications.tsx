import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { notificationService } from '../services/notificationService';

export const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, refreshNotifications } = useApp();

  useEffect(() => {
    // Mark notifications as read when visiting
    const markRead = async () => {
      await notificationService.markAllAsRead();
      refreshNotifications();
    };
    markRead();
  }, []);

  return (
    <div className="px-gutter space-y-stack-md animate-fade-in pb-10">
      {/* Header back button */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/5 active:scale-95">
          <span className="material-symbols-outlined text-on-surface text-lg">arrow_back</span>
        </button>
        <span className="font-headline-sm text-sm text-white font-bold">Notification Center</span>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center text-xs text-on-surface-variant/30 flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-3xl">notifications_off</span>
            <span>No notifications received</span>
          </div>
        ) : (
          notifications.map((n) => (
            <div 
              key={n.id} 
              className={`glass-card rounded-2xl p-4 border border-white/5 flex gap-3 relative transition-all ${
                !n.isRead ? 'border-primary/20 bg-primary/[0.01]' : ''
              }`}
            >
              {/* Unread dot */}
              {!n.isRead && (
                <span className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              )}

              <div className="w-9 h-9 rounded-xl bg-white/5 shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-lg">
                  {n.title.toLowerCase().includes('wallet') || n.title.toLowerCase().includes('credited') ? 'account_balance_wallet' : 'sports_esports'}
                </span>
              </div>
              <div className="space-y-0.5 text-xs">
                <h4 className="font-bold text-white">{n.title}</h4>
                <p className="text-on-surface-variant/70 leading-relaxed">{n.message}</p>
                <p className="text-[9px] text-on-surface-variant/40 mt-1 font-label-caps">{n.time}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
