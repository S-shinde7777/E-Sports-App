import type { Transaction } from '../types';
import { mockDb } from './mockData';

const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const walletService = {
  async getWalletBalance(): Promise<number> {
    await delay();
    return mockDb.getUser().walletBalance;
  },

  async getTransactions(): Promise<Transaction[]> {
    await delay();
    // Sort transactions by date descending
    return [...mockDb.getTransactions()].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  async depositFunds(amount: number): Promise<number> {
    await delay(500); // Simulate bank network delay
    if (amount <= 0) throw new Error('Invalid deposit amount');

    const user = mockDb.getUser();
    const updatedUser = {
      ...user,
      walletBalance: user.walletBalance + amount
    };
    mockDb.setUser(updatedUser);

    const transactions = mockDb.getTransactions();
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      amount,
      type: 'deposit',
      status: 'success',
      createdAt: new Date().toISOString()
    };
    mockDb.setTransactions([...transactions, newTx]);

    return updatedUser.walletBalance;
  },

  async deductFunds(amount: number, _description: string): Promise<number> {
    const user = mockDb.getUser();
    if (user.walletBalance < amount) throw new Error('Insufficient wallet balance');

    const updatedUser = {
      ...user,
      walletBalance: user.walletBalance - amount
    };
    mockDb.setUser(updatedUser);

    const transactions = mockDb.getTransactions();
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      amount,
      type: 'entry_fee',
      status: 'success',
      createdAt: new Date().toISOString()
    };
    mockDb.setTransactions([...transactions, newTx]);

    return updatedUser.walletBalance;
  }
};
