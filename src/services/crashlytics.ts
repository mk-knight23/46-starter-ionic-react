import * as Sentry from '@sentry/capacitor';

export class CrashlyticsService {
  init(dsn: string) {
    Sentry.init({ dsn });
  }

  captureException(error: Error) {
    Sentry.captureException(error);
  }
}

export const crashlyticsService = new CrashlyticsService();
