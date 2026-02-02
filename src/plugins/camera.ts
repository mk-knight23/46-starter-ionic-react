import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

/**
 * Camera plugin wrapper with web fallback
 */
export class CameraPlugin {
  private static isNative = Capacitor.isNativePlatform();

  static async takePicture(): Promise<string> {
    try {
      if (this.isNative) {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
        });
        return image.webPath || image.path || '';
      } else {
        // Web fallback: Use file input
        return new Promise((resolve, reject) => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.capture = 'environment';

          input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(file);
            }
          };

          input.click();
        });
      }
    } catch (error) {
      console.error('Camera error:', error);
      throw new Error('Failed to take picture');
    }
  }

  static async pickFromGallery(): Promise<string> {
    try {
      if (this.isNative) {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Uri,
          source: CameraSource.Photos,
        });
        return image.webPath || image.path || '';
      } else {
        // Web fallback
        return new Promise((resolve, reject) => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';

          input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(file);
            }
          };

          input.click();
        });
      }
    } catch (error) {
      console.error('Gallery error:', error);
      throw new Error('Failed to pick from gallery');
    }
  }

  static async checkPermissions(): Promise<boolean> {
    if (!this.isNative) {
      return true; // Web doesn't need permissions
    }

    try {
      const status = await Camera.checkPermissions();
      return status.camera === 'granted';
    } catch {
      return false;
    }
  }

  static async requestPermissions(): Promise<boolean> {
    if (!this.isNative) {
      return true;
    }

    try {
      const status = await Camera.requestPermissions({ permissions: ['camera'] });
      return status.camera === 'granted';
    } catch {
      return false;
    }
  }
}

// Usage:
// const photo = await CameraPlugin.takePicture();
// const galleryPhoto = await CameraPlugin.pickFromGallery();
// const hasPermission = await CameraPlugin.checkPermissions();
