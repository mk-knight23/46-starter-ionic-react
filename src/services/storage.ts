import { Preferences } from '@capacitor/preferences';

export class LocalStorage {
  static async get(key: string) {
    const { value } = await Preferences.get({ key });
    return value ? JSON.parse(value) : null;
  }

  static async set(key: string, value: any) {
    await Preferences.set({ key, value: JSON.stringify(value) });
  }

  static async remove(key: string) {
    await Preferences.remove({ key });
  }
}
