/**
 * App Configuration
 * Centralized configuration for different environments
 */

export interface AppConfig {
  apiUrl: string;
  environment: 'development' | 'staging' | 'production';
  enableDebugTools: boolean;
  analyticsEnabled: boolean;
  hapticsEnabled: boolean;
  cameraEnabled: boolean;
  geolocationEnabled: boolean;
}

const DEVELOPMENT_CONFIG: AppConfig = {
  apiUrl: 'http://localhost:3000/api',
  environment: 'development',
  enableDebugTools: true,
  analyticsEnabled: false,
  hapticsEnabled: true,
  cameraEnabled: true,
  geolocationEnabled: true,
};

const STAGING_CONFIG: AppConfig = {
  apiUrl: 'https://staging-api.socialapp.com/api',
  environment: 'staging',
  enableDebugTools: true,
  analyticsEnabled: true,
  hapticsEnabled: true,
  cameraEnabled: true,
  geolocationEnabled: true,
};

const PRODUCTION_CONFIG: AppConfig = {
  apiUrl: 'https://api.socialapp.com/api',
  environment: 'production',
  enableDebugTools: false,
  analyticsEnabled: true,
  hapticsEnabled: true,
  cameraEnabled: true,
  geolocationEnabled: true,
};

const getEnvironment = (): 'development' | 'staging' | 'production' => {
  const hostname = window.location.hostname;
  const env = import.meta.env.MODE || 'development';

  if (hostname === 'localhost' || env === 'development') {
    return 'development';
  } else if (hostname.includes('staging') || env === 'staging') {
    return 'staging';
  } else {
    return 'production';
  }
};

const getConfig = (): AppConfig => {
  const environment = getEnvironment();

  switch (environment) {
    case 'development':
      return DEVELOPMENT_CONFIG;
    case 'staging':
      return STAGING_CONFIG;
    case 'production':
      return PRODUCTION_CONFIG;
    default:
      return DEVELOPMENT_CONFIG;
  }
};

export const config = getConfig();

/**
 * Feature flags for experimental features
 */
export const FEATURE_FLAGS = {
  enableNewPostFlow: import.meta.env.VITE_ENABLE_NEW_POST_FLOW === 'true',
  enableStories: import.meta.env.VITE_ENABLE_STORIES !== 'false',
  enableDarkMode: import.meta.env.VITE_ENABLE_DARK_MODE !== 'false',
  enableNotifications: import.meta.env.VITE_ENABLE_NOTIFICATIONS === 'true',
};

/**
 * Capacitor plugin availability check
 */
export const CAPABILITIES = {
  haptics: import.meta.env.VITE_HAPTICS_ENABLED !== 'false',
  camera: import.meta.env.VITE_CAMERA_ENABLED !== 'false',
  geolocation: import.meta.env.VITE_GEOLOCATION_ENABLED !== 'false',
  clipboard: import.meta.env.VITE_CLIPBOARD_ENABLED !== 'false',
};
