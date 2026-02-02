# Architecture: 46-starter-ionic-react

## Overview
A premium mobile-first Progressive Web App built with Ionic React, featuring native-style UI components, Capacitor plugin integrations, and offline capabilities. Designed to run as a web app with the ability to be packaged as a native iOS/Android application.

## Tech Stack
- **Framework**: React 19
- **UI Library**: Ionic React 8.7
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite 6
- **Routing**: React Router 5 + Ionic Router
- **Icons**: Lucide React
- **Native Plugins**: Capacitor 6
  - Haptics
  - Camera
  - Geolocation
  - Clipboard

## Project Structure

```
46-starter-ionic-react/
├── public/
│   ├── index.html              # PWA HTML template
│   ├── manifest.json           # PWA manifest
│   └── sw.js                   # Service worker
├── src/
│   ├── App.tsx                 # Main app with Ionic tabs
│   ├── main.tsx                # Entry point
│   ├── index.css               # Global styles + Ionic theme
│   ├── config/
│   │   └── app.config.ts       # Environment configuration
│   ├── hooks/
│   │   └── useHaptics.ts       # Haptics hook
│   └── plugins/
│       ├── camera.ts           # Camera wrapper
│       ├── geolocation.ts      # Geolocation wrapper
│       └── clipboard.ts        # Clipboard wrapper
├── .claude/
│   ├── workflows/              # Development workflows
│   └── templates/              # Code templates
├── capacitor.config.ts         # Capacitor configuration
├── vite.config.ts              # Vite configuration
└── package.json
```

## Core Architecture

### 1. Navigation System

**Ionic Router + React Router**
- Uses `IonReactRouter` for native-style navigation
- `IonTabs` and `IonTabBar` for bottom navigation
- `IonRouterOutlet` for page rendering
- Safe area insets for notched devices

**Tab Structure:**
- `/home` - Main feed with stories and posts
- `/search` - Discover and explore
- `/create` - Create post (includes Haptics demo)
- `/notifications` - Activity feed
- `/profile` - User profile

### 2. Component Architecture

**Page Components:**
- All pages extend `IonPage` for proper layout
- Use `IonHeader` and `IonToolbar` for headers
- Use `IonContent` for scrollable content
- Ionic components for native feel

**Shared Components:**
- `StoryAvatar` - Story circle with gradient ring
- `PostCard` - Social media post with interactions
- Reusable Ionic components throughout

### 3. Plugin Integration

**Capacitor Plugin Wrappers:**
Each plugin has a wrapper class with:
- Native implementation using Capacitor
- Web fallback for browser compatibility
- Permission handling
- Error handling
- TypeScript types

**Plugin Structure:**
```typescript
export class PluginName {
  private static isNative = Capacitor.isNativePlatform();

  static async method() {
    if (this.isNative) {
      // Native implementation
    } else {
      // Web fallback
    }
  }
}
```

### 4. Configuration Management

**Environment-based Configuration:**
- Development, Staging, Production configs
- Feature flags for experimental features
- Plugin capability checks
- API URL management

**Usage:**
```typescript
import { config } from './config/app.config';

const apiUrl = config.apiUrl;
const isDev = config.environment === 'development';
```

### 5. Theming System

**Ionic Theme Variables:**
```css
:root {
  --ion-color-primary: #007aff;
  --ion-background-color: #f2f2f7;
  --ion-card-background: #ffffff;
}
```

**Tailwind Integration:**
- Custom theme colors via `@theme` directive
- Component utility classes
- Mobile-first approach
- Touch-optimized styles

**Dark Mode:**
- Automatic via `prefers-color-scheme`
- Ionic color variables update
- Seamless theme switching

### 6. PWA Architecture

**Service Worker Strategy:**
- Cache-first approach for assets
- Network fallback for dynamic content
- Automatic cache cleanup
- Offline support

**Manifest Configuration:**
- App shortcuts for quick access
- Multiple icon sizes
- Screenshots for install prompts
- Theme color customization

## Performance Optimizations

1. **Code Splitting**: React Router lazy loading ready
2. **Asset Caching**: Service worker for offline access
3. **Tree Shaking**: Vite automatic optimization
4. **Ionic Lazy Loading**: Component lazy loading supported
5. **Touch Optimization**: Native touch feedback
6. **CSS Optimization**: Tailwind v4 native engine

## Native App Capabilities

**When Built with Capacitor:**
- Haptic feedback (iOS/Android)
- Camera access with permissions
- Geolocation with permission handling
- Clipboard read/write
- Native transitions
- Status bar customization
- Splash screen
- Safe area insets

## Development Workflow

**Web Development:**
```bash
npm run dev
```

**Mobile Development:**
```bash
# Add platforms
npx cap add ios
npx cap add android

# Sync files
npx cap sync

# Open IDEs
npx cap open ios    # Xcode
npx cap open android # Android Studio
```

## Build Process

1. **Development Build**: `npm run dev`
2. **Production Build**: `npm run build`
3. **Type Check**: `npm run type-check`
4. **Lint**: `npm run lint`

**Output:**
- Web: `dist/` directory
- iOS: Xcode project
- Android: Gradle project

## Deployment Targets

### Web (PWA)
- GitHub Pages
- Vercel
- Netlify
- Any static host

### Native
- iOS App Store (via Xcode)
- Google Play Store (via Android Studio)

## Security Considerations

- Permission handling for native plugins
- HTTPS required for service workers
- Content Security Policy ready
- Environment variable management
- API key protection via environment variables

## Testing Strategy

**Recommended Tests:**
1. Component testing with React Testing Library
2. E2E testing with Playwright
3. Plugin testing on real devices
4. PWA testing with Lighthouse
5. Cross-browser testing

## Future Enhancements

- State management (Zustand/Redux)
- API integration layer
- Authentication flow
- Push notifications
- Background sync
- More Capacitor plugins
- Offline queue for actions
