import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

export interface Notification {
  id?: number;
  title: string;
  body: string;
  schedule?: { at: Date };
}

export class NotificationService {
  async requestPermission(): Promise<boolean> {
    if (!Capacitor.isPluginAvailable('LocalNotifications')) return false;
    const result = await LocalNotifications.requestPermissions();
    return result.granted;
  }

  async schedule(notification: Notification): Promise<void> {
    await LocalNotifications.schedule({ notifications: [notification] });
  }
}

export const notificationService = new NotificationService();
