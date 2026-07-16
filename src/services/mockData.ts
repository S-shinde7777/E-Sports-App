import type { Tournament, LiveMatch, Transaction, AppNotification, User } from '../types';

// ─── Relative timestamp helper ──────────────────────────────────────────────
export function timeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return 'Just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

// ─── Seed Data ───────────────────────────────────────────────────────────────
const INITIAL_TOURNAMENTS: Tournament[] = [
  {
    id: 't1',
    title: 'Weekly Elite Series',
    startTime: 'Today, 20:00 IST',
    prizePool: 380,
    entryFee: 10,
    totalSlots: 48,
    filledSlots: 12,
    slotsRemaining: 36,
    status: 'open',
    gameType: 'Free Fire Solo',
    imageBanner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
    roomId: '7294810',
    roomPassword: 'nexus1',
    rules: [
      'Teaming up with opponents is strictly prohibited and will lead to an immediate ban.',
      'Emulators are not allowed in this tournament.',
      'Use of hacks, script changes, or third-party tools will result in disqualification.',
      'Screenshots of results must be uploaded within 10 minutes of match completion.',
    ],
  },
  {
    id: 't2',
    title: 'Nexus Championship',
    startTime: 'Tomorrow, 18:00 IST',
    prizePool: 1500,
    entryFee: 50,
    totalSlots: 100,
    filledSlots: 40,
    slotsRemaining: 60,
    status: 'open',
    gameType: 'Free Fire Squad',
    imageBanner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop',
    roomId: '4829103',
    roomPassword: 'squad99',
    rules: [
      'All team captains must join the Discord lobby 15 minutes before the start.',
      'Squad member changes are not allowed once registration closes.',
      'Default game settings will be used for all rooms.',
    ],
  },
  {
    id: 't3',
    title: 'Cyber Showdown: Phase 2',
    startTime: 'Completed · Jul 9, 2026',
    prizePool: 500,
    entryFee: 20,
    totalSlots: 48,
    filledSlots: 48,
    slotsRemaining: 0,
    status: 'completed',
    gameType: 'Free Fire Solo',
    imageBanner: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=600&auto=format&fit=crop',
    roomId: '3810294',
    roomPassword: 'cyber22',
    rules: ['Standard competitive rules applied.'],
  },
  {
    id: 't4',
    title: 'Apex Neon Clash',
    startTime: 'Live Now',
    prizePool: 1000,
    entryFee: 30,
    totalSlots: 60,
    filledSlots: 60,
    slotsRemaining: 0,
    status: 'live',
    gameType: 'Free Fire Duo',
    imageBanner: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop',
    roomId: '9203748',
    roomPassword: 'apex30',
    rules: ['Dynamic safe-zones enabled.', 'No flare guns allowed.'],
  },
];

const INITIAL_LIVE_MATCHES: LiveMatch[] = [
  {
    id: 'm1',
    team1: {
      name: 'ALPHA SQUAD',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDwOKMNrbshKts_w38PPBy7pgdGgN0m4D8FBd8pjH5uR1Wqy2nBhfvvwjV962-0v-OQJEkMo-WjGOJNlwz43kmUqFiDhWhLEQlSXC7W_WlCOl5SyVVDMx2zKRC23HU-aVIbTjbv9ZUw2wFm_SO0nyESMGqvKI58niacH1tLgaBi7UXYSeq3fVTVHaj0G1EziSjKba8LRsLHIs42MHQL2ktC3dLkuv8e39BqUcq0M-ca_gkV6i1AsHwnRzrXkX4gn9aR_X5afurOg',
    },
    team2: {
      name: 'PHOENIX 7',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKFbH7mstFsdiVEZIMqEm0zYwlYywuwzqBi-RaoudRLSjcKkNSdDu3q_qsKZexk64FjzaINAls_QlcK_LyNMbIcYq7lTKEN6-jM-4oka11FaZbJQewzJT9E0uWyzvOI3fantxSAkdmen7FkwMkjNXwr9OcNOYvTkOQJ5i9OPPfJB-nIZSSYven76JdKN5iozSUVSnDDm7Kd8sV5XzWoLoCjZ0NHgFWqfZbVau0UnitPoVOO5HBIyOU1-s_poSemvcXv4XzvCk3Xg',
    },
    score1: 42,
    score2: 38,
    spectators: '12.4K',
    status: 'live',
  },
  {
    id: 'm2',
    team1: {
      name: 'CYBER DRAGONS',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALevglPAGg6r3I-zUp0QxTqV3A3wuwYoMfJjcGaVyW2pt9mkF0CXx77PjxigGGqSfBRWdFfkI_EH0FYFvwAgk_KRJVla-uAyxO_0GdvGeUFTEvDYzOwuSH8-f-9bMUQCX_J2A6jABsBaHdvCt0choES3vgpmzOGnv0EU1GzA39aFZ_WNpgyN05DwtViqUzoNO7w9MlLSGxDYtsK3qY9aOOlwTZOGbC49A3ikRVU27UeqW3q4lGhNERN_l1c5_nTPgzH0ZdIoh_pQ',
    },
    team2: {
      name: 'BOLT ESPORTS',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRTiLz4Nn0DbsF90DjqwEnCGoL4Wz0a6EhnP-cNVYFyTWNKdqQNtefGnxUHVwB1xOk0mcAHw0_UqsSYyqhzJpEzyvTnaCHKvpsDitzUmJ9r55EKPRFvAzUnXGgs2PEFvZtVBvs3Y_lGpX5Kp7_KwQQIJ0XAc8xRUgc53RtEM3PuuEZDsdeY_RnUEqB9fRb-HSoO8-IemgDbxgOO2lwtrOTz1eQg-8zz442MSohyVDtI1cW1WJIgzpDnupytb91bvqhg_J7Q8urwQ',
    },
    score1: 15,
    score2: 24,
    spectators: '8.9K',
    status: 'live',
  },
];

const INITIAL_USER: User = {
  id: 'user_01',
  username: 'SagarPro_FF',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCFbvoe6oSRrWwK1HW09Gwf3NHkJwBiM4tKOOP7JPgZd5D-VFQ8WC90WAUhIzJEF0J5wBbb7tUKGVJHEuUGnL6mbe0dTEaF8bPe63QkLvuX57L8GxWJ8vpPmtNft0kQ3YByNw4f0ewfo5ct6DQe1iJ_3juQkYNHJBsbdrKpb8HYd9gOQexAjEj12vhys-OAs_8T6zUSneWv9QdRehWsjz22kFNp-ws4XL74PgrcTJ1xThjnI7F3ksMBjEnjihSX85LD6hWrk636gQ',
  walletBalance: 250,
  totalMatches: 18,
  totalWins: 8,
  totalKills: 48,
  winRate: 74,
  created_at: new Date().toISOString(),
};

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_01',
    amount: 250,
    type: 'deposit',
    status: 'success',
    description: 'Wallet Top-up via UPI',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'nt_01',
    title: 'Welcome to Nexus Esports!',
    message: 'Your account is set up. Explore tournaments and start competing.',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isRead: false,
    icon: 'sports_esports',
  },
  {
    id: 'nt_02',
    title: 'Wallet Credited',
    message: '₹250 added successfully to your Nexus Wallet.',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    isRead: true,
    icon: 'account_balance_wallet',
  },
];

// ─── Storage Helpers ─────────────────────────────────────────────────────────
const getStorageItem = <T>(key: string, defaultValue: T): T => {
  try {
    const data = localStorage.getItem(key);
    if (!data) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(data) as T;
  } catch {
    return defaultValue;
  }
};

const setStorageItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn('localStorage write failed:', key);
  }
};

// ─── DB Init ─────────────────────────────────────────────────────────────────
export const initializeMockDatabase = () => {
  getStorageItem('nexus_user', INITIAL_USER);
  getStorageItem('nexus_tournaments', INITIAL_TOURNAMENTS);
  getStorageItem('nexus_live_matches', INITIAL_LIVE_MATCHES);
  getStorageItem('nexus_transactions', INITIAL_TRANSACTIONS);
  getStorageItem('nexus_notifications', INITIAL_NOTIFICATIONS);
  getStorageItem('nexus_joined_tournaments', [] as string[]);
};

// ─── DB API ──────────────────────────────────────────────────────────────────
export const mockDb = {
  getUser: () => getStorageItem<User>('nexus_user', INITIAL_USER),
  setUser: (user: User) => setStorageItem('nexus_user', user),

  getTournaments: () => getStorageItem<Tournament[]>('nexus_tournaments', INITIAL_TOURNAMENTS),
  setTournaments: (t: Tournament[]) => setStorageItem('nexus_tournaments', t),

  getLiveMatches: () => getStorageItem<LiveMatch[]>('nexus_live_matches', INITIAL_LIVE_MATCHES),

  getTransactions: () => getStorageItem<Transaction[]>('nexus_transactions', INITIAL_TRANSACTIONS),
  setTransactions: (txs: Transaction[]) => setStorageItem('nexus_transactions', txs),

  getNotifications: () => getStorageItem<AppNotification[]>('nexus_notifications', INITIAL_NOTIFICATIONS),
  setNotifications: (n: AppNotification[]) => setStorageItem('nexus_notifications', n),

  getJoinedTournaments: () => getStorageItem<string[]>('nexus_joined_tournaments', []),
  setJoinedTournaments: (ids: string[]) => setStorageItem('nexus_joined_tournaments', ids),
};
