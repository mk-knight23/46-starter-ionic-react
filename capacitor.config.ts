import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.socialapp.ionic',
  appName: 'SocialApp',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
    cleartext: true,
    // Allow navigation to external URLs
    allowNavigation: [
      '*://unsplash.com:*',
      '*://images.unsplash.com:*',
      '*://api.dicebear.com:*',
    ],
  },
  android: {
    buildOptions: {
      signingType: 'apksigner',
    },
  },
  ios: {
    scheme: 'SocialApp',
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    Haptics: {
      enabled: true,
    },
    Camera: {
      permissions: ['camera', 'photos'],
    },
    Geolocation: {
      permissions: ['location', 'fineLocation', 'coarseLocation'],
    },
    Keyboard: {
      resize: 'ionic',
      style: 'dark',
      resizeOnFullScreen: true,
    },
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#007aff',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#007aff',
    },
    App: {
      backgroundColor: '#f2f2f7',
    },
  },
};

export default config;
