import type { Tournament } from '../types';
import { mockDb } from './mockData';
import { walletService } from './walletService';
import { notificationService } from './notificationService';

const delay = (ms = 400) => new Promise<void>(r => setTimeout(r, ms));

export const tournamentService = {
  async getTournaments(): Promise<Tournament[]> {
    await delay();
    return mockDb.getTournaments();
  },

  async getTournamentById(id: string): Promise<Tournament | undefined> {
    await delay(200);
    return mockDb.getTournaments().find(t => t.id === id);
  },

  async registerForTournament(tournamentId: string): Promise<{ success: boolean; error?: string }> {
    await delay(600);

    const tournaments = mockDb.getTournaments();
    const idx = tournaments.findIndex(t => t.id === tournamentId);
    if (idx === -1) return { success: false, error: 'Tournament not found' };

    const tournament = tournaments[idx];

    // Already joined?
    const joinedIds = mockDb.getJoinedTournaments();
    if (joinedIds.includes(tournamentId))
      return { success: false, error: 'You are already registered for this tournament' };

    // Slots available?
    if (tournament.slotsRemaining <= 0)
      return { success: false, error: 'Tournament is full — no slots remaining' };

    // Balance check?
    const user = mockDb.getUser();
    if (user.walletBalance < tournament.entryFee)
      return { success: false, error: `Insufficient balance. Need ₹${tournament.entryFee}, you have ₹${user.walletBalance}` };

    try {
      // Deduct entry fee
      await walletService.deductFunds(tournament.entryFee, `Entry Fee: ${tournament.title}`);

      // Update slot count
      const updated = [...tournaments];
      updated[idx] = {
        ...tournament,
        filledSlots: tournament.filledSlots + 1,
        slotsRemaining: tournament.slotsRemaining - 1,
      };
      mockDb.setTournaments(updated);

      // Mark joined
      mockDb.setJoinedTournaments([...joinedIds, tournamentId]);

      // Notify
      await notificationService.addNotification(
        'Registration Confirmed ✅',
        `You've joined "${tournament.title}". Entry fee ₹${tournament.entryFee} deducted. Room credentials unlock before match start.`,
        'sports_esports'
      );

      return { success: true };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Registration failed';
      return { success: false, error: msg };
    }
  },

  async getJoinedTournaments(): Promise<Tournament[]> {
    await delay(200);
    const joinedIds = mockDb.getJoinedTournaments();
    return mockDb.getTournaments().filter(t => joinedIds.includes(t.id));
  },
};
