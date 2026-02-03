/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_ENABLE_STORIES: string
  readonly VITE_ENABLE_DARK_MODE: string
  readonly VITE_ENABLE_NOTIFICATIONS: string
  readonly VITE_HAPTICS_ENABLED: string
  readonly VITE_CAMERA_ENABLED: string
  readonly VITE_GEOLOCATION_ENABLED: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
