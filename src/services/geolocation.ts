import { Geolocation } from '@capacitor/geolocation';

export class GeolocationService {
  async getCurrentPosition() {
    return await Geolocation.getCurrentPosition();
  }

  async watchPosition(callback: (position: any) => void) {
    return await Geolocation.watchPosition({}, callback);
  }

  clearWatch(watchId: string) {
    Geolocation.clearWatch({ id: watchId });
  }
}

export const geolocationService = new GeolocationService();
