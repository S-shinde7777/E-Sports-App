import type { User } from '../types';
import { mockDb } from './mockData';

// Simulated delay helper
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  async getCurrentUser(): Promise<User> {
    await delay();
    return mockDb.getUser();
  },

  async updateProfile(username: string, avatarUrl?: string): Promise<User> {
    await delay();
    const currentUser = mockDb.getUser();
    const updatedUser = {
      ...currentUser,
      username,
      avatarUrl: avatarUrl || currentUser.avatarUrl,
    };
    mockDb.setUser(updatedUser);
    return updatedUser;
  },

  async login(username: string): Promise<User> {
    await delay();
    const currentUser = mockDb.getUser();
    // For mock, just login with the username
    const updatedUser = {
      ...currentUser,
      username: username || currentUser.username,
    };
    mockDb.setUser(updatedUser);
    return updatedUser;
  },

  async logout(): Promise<void> {
    await delay();
    // In actual app, clear session. Here we just return.
  }
};
