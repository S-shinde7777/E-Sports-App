export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  walletBalance: number;
  totalMatches: number;
  totalWins: number;
  totalKills: number;
  winRate: number;
  created_at: string;
}

export interface Tournament {
  id: string;
  title: string;
  startTime: string;
  prizePool: number;
  entryFee: number;
  totalSlots: number;
  filledSlots: number;
  status: 'open' | 'live' | 'completed';
  gameType: string;
  imageBanner: string;
  slotsRemaining: number;
  rules?: string[];
  roomId?: string;
  roomPassword?: string;
}

export interface Team {
  name: string;
  logo: string;
}

export interface LiveMatch {
  id: string;
  team1: Team;
  team2: Team;
  score1?: number;
  score2?: number;
  spectators: string;
  status: 'live' | 'upcoming' | 'completed';
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'entry_fee' | 'prize';
  status: 'success' | 'pending' | 'failed';
  description?: string;
  createdAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatarUrl: string;
  kills: number;
  points: number;
  isSelf?: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  icon?: string;
}
