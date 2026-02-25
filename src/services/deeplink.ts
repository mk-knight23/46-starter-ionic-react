import { App } from '@capacitor/app';

export class DeepLinkService {
  async init() {
    App.addListener('appUrlOpen', (data) => {
      console.log('App opened with URL:', data.url);
    });
  }
}

export const deepLinkService = new DeepLinkService();
