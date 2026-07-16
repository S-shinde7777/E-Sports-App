import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

/**
 * ProtectedRoute — wraps any route that requires a logged-in user.
 * If user is null (not logged in) and the app is done loading,
 * redirect to /login preserving the intended destination.
 */
export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useApp();
  const location = useLocation();

  // Show a minimal loading state while AppContext is initialising
  if (loading) {
    return (
      <div className="w-[390px] min-h-screen mx-auto flex flex-col items-center justify-center gap-4 bg-[#0A0A0B]">
        <div className="w-12 h-12 rounded-2xl bg-[#ff6b00]/10 border border-[#ff6b00]/20 flex items-center justify-center">
          <span
            className="material-symbols-outlined text-2xl animate-spin"
            style={{ color: '#ff6b00' }}
          >
            autorenew
          </span>
        </div>
        <p className="text-[11px] uppercase tracking-widest text-[#e2bfb0]/40"
           style={{ fontFamily: '"JetBrains Mono", monospace' }}>
          Connecting to lobby…
        </p>
      </div>
    );
  }

  // Not logged in — redirect to /login, save intended page in state
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
