import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useState } from 'react';

export interface Photo {
  path: string;
  webviewPath?: string;
  base64?: string;
}

/**
 * Camera hook with web fallback
 * Handles photo capture with proper permissions
 */
export const useCamera = () => {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const takePicture = async () => {
    setIsLoading(true);
    try {
      if (Capacitor.isNativePlatform()) {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
        });

        setPhoto({
          path: image.path || '',
          webviewPath: image.webPath,
        });
      } else {
        // Web fallback: Use file input
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.capture = 'environment';

        return new Promise<Photo>((resolve, reject) => {
          input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                const photoData: Photo = {
                  path: file.name,
                  base64: reader.result as string,
                };
                setPhoto(photoData);
                resolve(photoData);
              };
              reader.readAsDataURL(file);
            }
          };
          input.onerror = reject;
          input.click();
        });
      }
    } catch (error) {
      console.error('Camera error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const pickFromGallery = async () => {
    setIsLoading(true);
    try {
      if (Capacitor.isNativePlatform()) {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Uri,
          source: CameraSource.Photos,
        });

        setPhoto({
          path: image.path || '',
          webviewPath: image.webPath,
        });
      } else {
        // Web fallback
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        return new Promise<Photo>((resolve, reject) => {
          input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                const photoData: Photo = {
                  path: file.name,
                  base64: reader.result as string,
                };
                setPhoto(photoData);
                resolve(photoData);
              };
              reader.readAsDataURL(file);
            }
          };
          input.onerror = reject;
          input.click();
        });
      }
    } catch (error) {
      console.error('Gallery error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearPhoto = () => setPhoto(null);

  return { photo, takePicture, pickFromGallery, clearPhoto, isLoading };
};
