import { BiometricAuth } from '@capacitor/biometric-auth';

export class BiometricService {
  async isAvailable(): Promise<boolean> {
    try {
      const result = await BiometricAuth.isAvailable();
      return result.has;
    } catch { return false; }
  }

  async authenticate(reason = 'Authenticate'): Promise<boolean> {
    try {
      await BiometricAuth.authenticate({ reason });
      return true;
    } catch { return false; }
  }
}

export const biometricService = new BiometricService();
