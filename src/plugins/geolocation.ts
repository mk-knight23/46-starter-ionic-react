import { Geolocation, Position, PositionOptions } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';

/**
 * Geolocation plugin wrapper with web fallback
 */
export class GeolocationPlugin {
  private static isNative = Capacitor.isNativePlatform();

  private static defaultOptions: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

  static async getCurrentPosition(options?: PositionOptions): Promise<Position> {
    try {
      if (this.isNative) {
        return await Geolocation.getCurrentPosition({
          ...this.defaultOptions,
          ...options,
        });
      } else {
        // Web fallback
        return new Promise((resolve, reject) => {
          if (!navigator.geolocation) {
            reject(new Error('Geolocation not supported'));
            return;
          }

          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                coords: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  accuracy: position.coords.accuracy,
                  altitude: position.coords.altitude || null,
                  altitudeAccuracy: position.coords.altitudeAccuracy || null,
                  speed: position.coords.speed || null,
                  heading: position.coords.heading || null,
                },
                timestamp: position.timestamp,
              });
            },
            (error) => reject(error),
            {
              ...this.defaultOptions,
              ...options,
            }
          );
        });
      }
    } catch (error) {
      console.error('Geolocation error:', error);
      throw new Error('Failed to get current position');
    }
  }

  static async watchPosition(
    callback: (position: Position) => void,
    errorCallback?: (error: any) => void,
    options?: PositionOptions
  ): Promise<string> {
    try {
      if (this.isNative) {
        const watchId = await Geolocation.watchPosition({
          ...this.defaultOptions,
          ...options,
        }, callback);
        return watchId;
      } else {
        // Web fallback
        if (!navigator.geolocation) {
          throw new Error('Geolocation not supported');
        }

        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            callback({
              coords: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                altitude: position.coords.altitude || null,
                altitudeAccuracy: position.coords.altitudeAccuracy || null,
                speed: position.coords.speed || null,
                heading: position.coords.heading || null,
              },
              timestamp: position.timestamp,
            });
          },
          errorCallback || (() => {}),
          {
            ...this.defaultOptions,
            ...options,
          }
        );

        return watchId.toString();
      }
    } catch (error) {
      console.error('Watch position error:', error);
      throw new Error('Failed to watch position');
    }
  }

  static async clearWatch(watchId: string): Promise<void> {
    try {
      if (this.isNative) {
        await Geolocation.clearWatch({ id: watchId });
      } else {
        navigator.geolocation.clearWatch(parseInt(watchId));
      }
    } catch (error) {
      console.error('Clear watch error:', error);
    }
  }

  static async checkPermissions(): Promise<boolean> {
    if (!this.isNative) {
      return true;
    }

    try {
      const status = await Geolocation.checkPermissions();
      return status.location === 'granted';
    } catch {
      return false;
    }
  }

  static async requestPermissions(): Promise<boolean> {
    if (!this.isNative) {
      return true;
    }

    try {
      const status = await Geolocation.requestPermissions({ permissions: ['location'] });
      return status.location === 'granted';
    } catch {
      return false;
    }
  }
}

// Usage:
// const position = await GeolocationPlugin.getCurrentPosition();
// const watchId = await GeolocationPlugin.watchPosition((pos) => console.log(pos));
// await GeolocationPlugin.clearWatch(watchId);
