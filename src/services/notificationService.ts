import type { AppNotification } from '../types';
import { mockDb } from './mockData';

const delay = (ms = 200) => new Promise<void>(r => setTimeout(r, ms));

export const notificationService = {
  async getNotifications(): Promise<AppNotification[]> {
    await delay();
    return [...mockDb.getNotifications()].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  async markAllAsRead(): Promise<void> {
    await delay();
    const updated = mockDb.getNotifications().map(n => ({ ...n, isRead: true }));
    mockDb.setNotifications(updated);
  },

  async addNotification(title: string, message: string, icon = 'notifications'): Promise<void> {
    const notifications = mockDb.getNotifications();
    const newNotification: AppNotification = {
      id: `nt_${Date.now()}`,
      title,
      message,
      createdAt: new Date().toISOString(),
      isRead: false,
      icon,
    };
    mockDb.setNotifications([newNotification, ...notifications]);
  },
};
