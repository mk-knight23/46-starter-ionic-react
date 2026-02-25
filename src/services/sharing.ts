import { Share } from '@capacitor/share';

export class ShareService {
  async share(options: { title?: string; text?: string; url?: string }) {
    await Share.share(options);
  }
}

export const shareService = new ShareService();
