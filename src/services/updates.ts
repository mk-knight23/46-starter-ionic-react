import { App } from '@capacitor/app';

export class UpdateService {
  async getCurrentVersion(): Promise<string> {
    const info = await App.getInfo();
    return info.version;
  }
}

export const updateService = new UpdateService();
