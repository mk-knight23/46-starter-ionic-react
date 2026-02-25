import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export interface Photo {
  filepath: string;
  webviewPath?: string;
}

export class CameraService {
  async takePhoto(): Promise<Photo> {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });
    return { filepath: `${Date.now()}.jpeg`, webviewPath: image.webPath };
  }

  async pickFromGallery(): Promise<Photo> {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });
    return { filepath: `${Date.now()}.jpeg`, webviewPath: image.webPath };
  }
}

export const cameraService = new CameraService();
