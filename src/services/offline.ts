import { Network } from '@capacitor/network';

export class OfflineService {
  async init() {
    const status = await Network.getStatus();
    return status.connected;
  }

  async isOnline() {
    const status = await Network.getStatus();
    return status.connected;
  }
}

export const offlineService = new OfflineService();
