import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Tournament, AppNotification } from '../types';
import { authService } from '../services/authService';
import { tournamentService } from '../services/tournamentService';
import { walletService } from '../services/walletService';
import { notificationService } from '../services/notificationService';
import { initializeMockDatabase } from '../services/mockData';

interface AppContextType {
  user: User | null;
  loading: boolean;
  tournaments: Tournament[];
  notifications: AppNotification[];
  joinedTournamentIds: string[];
  refreshUser: () => Promise<void>;
  refreshTournaments: () => Promise<void>;
  refreshNotifications: () => Promise<void>;
  loginUser: (username: string) => Promise<void>;
  logoutUser: () => Promise<void>;
  registerForTournament: (id: string) => Promise<{ success: boolean; error?: string }>;
  depositMoney: (amount: number) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [joinedTournamentIds, setJoinedTournamentIds] = useState<string[]>([]);

  // Initialize DB on boot
  useEffect(() => {
    initializeMockDatabase();
    
    const initApp = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        
        const activeTournaments = await tournamentService.getTournaments();
        setTournaments(activeTournaments);
        
        const unreadNotifications = await notificationService.getNotifications();
        setNotifications(unreadNotifications);
        
        const joined = await tournamentService.getJoinedTournaments();
        setJoinedTournamentIds(joined.map(t => t.id));
      } catch (err) {
        console.error('Initialization error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    initApp();
  }, []);

  const refreshUser = async () => {
    const currentUser = await authService.getCurrentUser();
    setUser(currentUser);
  };

  const refreshTournaments = async () => {
    const list = await tournamentService.getTournaments();
    setTournaments(list);
    const joined = await tournamentService.getJoinedTournaments();
    setJoinedTournamentIds(joined.map(t => t.id));
  };

  const refreshNotifications = async () => {
    const list = await notificationService.getNotifications();
    setNotifications(list);
  };

  const loginUser = async (username: string) => {
    setLoading(true);
    try {
      const loggedUser = await authService.login(username);
      setUser(loggedUser);
      await refreshNotifications();
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const registerForTournament = async (id: string) => {
    const result = await tournamentService.registerForTournament(id);
    if (result.success) {
      await refreshUser();
      await refreshTournaments();
      await refreshNotifications();
    }
    return result;
  };

  const depositMoney = async (amount: number) => {
    await walletService.depositFunds(amount);
    await refreshUser();
    await refreshNotifications();
  };

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        tournaments,
        notifications,
        joinedTournamentIds,
        refreshUser,
        refreshTournaments,
        refreshNotifications,
        loginUser,
        logoutUser,
        registerForTournament,
        depositMoney,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
