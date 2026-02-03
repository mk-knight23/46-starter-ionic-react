# SocialApp - Ionic React PWA

A premium mobile-first social application built with Ionic React, featuring native-style UI, PWA capabilities, and Capacitor plugin integrations.

## Features

- **Mobile-First Design**: iOS-inspired UI with native-style bottom tab navigation
- **Progressive Web App**: Installable PWA with offline support and service worker
- **Capacitor Plugins**: Haptics, Camera, Geolocation, and Clipboard integrations
- **Ionic Components**: Rich set of pre-styled mobile components
- **Responsive**: Optimized for mobile devices with desktop fallback
- **Touch Optimized**: Native-like touch feedback and interactions
- **Theme Support**: iOS design language with dark mode support

## Tech Stack

- **Framework**: React 19
- **UI Library**: Ionic React 8.7
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite 6
- **Routing**: React Router 5
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Native Plugins**: Capacitor 6

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/mk-knight23/46-starter-ionic-react.git
cd 46-starter-ionic-react

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build for web
npm run build

# Preview production build
npm run preview
```

### Mobile Development

```bash
# Add iOS and Android platforms
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add ios
npx cap add android

# Sync files
npx cap sync

# Open in Xcode (iOS)
npx cap open ios

# Open in Android Studio (Android)
npx cap open android
```

## Project Structure

```
46-starter-ionic-react/
├── public/
│   ├── index.html           # HTML template with PWA meta tags
│   ├── manifest.json        # PWA manifest
│   └── sw.js               # Service worker for offline support
├── src/
│   ├── App.tsx             # Main app with Ionic tabs
│   ├── main.tsx            # Entry point
│   ├── index.css           # Global styles with Ionic theme
│   ├── config/
│   │   └── app.config.ts   # Environment configuration
│   ├── hooks/
│   │   └── useHaptics.ts   # Haptics hook with web fallback
│   └── plugins/
│       ├── camera.ts       # Camera plugin wrapper
│       ├── geolocation.ts  # Geolocation plugin wrapper
│       └── clipboard.ts    # Clipboard plugin wrapper
├── .claude/                # Claude Code workflows and templates
├── capacitor.config.ts     # Capacitor configuration
├── vite.config.ts          # Vite configuration
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint

## Capacitor Plugins

### Haptics

```typescript
import { useHaptics } from './hooks/useHaptics';

function MyComponent() {
  const { triggerClick, triggerToggle, triggerSuccess } = useHaptics();

  return (
    <button onClick={() => triggerClick()}>
      Click me!
    </button>
  );
}
```

### Camera

```typescript
import { CameraPlugin } from './plugins/camera';

// Take a photo
const photo = await CameraPlugin.takePicture();

// Pick from gallery
const galleryPhoto = await CameraPlugin.pickFromGallery();
```

### Geolocation

```typescript
import { GeolocationPlugin } from './plugins/geolocation';

// Get current position
const position = await GeolocationPlugin.getCurrentPosition();

// Watch position
const watchId = await GeolocationPlugin.watchPosition(
  (pos) => console.log(pos.coords.latitude, pos.coords.longitude)
);
```

### Clipboard

```typescript
import { ClipboardPlugin } from './plugins/clipboard';

// Write to clipboard
await ClipboardPlugin.write('Hello, World!');

// Read from clipboard
const text = await ClipboardPlugin.read();
```

## PWA Features

This app is installable as a Progressive Web App:

- Service worker for offline caching
- Web app manifest for installability
- iOS meta tags for "Add to Home Screen"
- Theme color customization
- App shortcuts for quick access

## Environment Configuration

Create a `.env` file based on `.env.example`:

```bash
# API Configuration
VITE_API_URL=http://localhost:3000/api

# Feature Flags
VITE_ENABLE_STORIES=true
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_NOTIFICATIONS=false

# Capacitor Plugin Flags
VITE_HAPTICS_ENABLED=true
VITE_CAMERA_ENABLED=true
VITE_GEOLOCATION_ENABLED=true
```

## Styling

The app uses Tailwind CSS v4 with custom Ionic theme variables:

- iOS-inspired color palette
- Safe area insets for notched devices
- Touch-optimized interactions
- Native-style transitions and animations
- Dark mode support

## Deployment

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### GitHub Pages

The app is configured for GitHub Pages deployment. Updates to the `main` branch are automatically deployed via GitHub Actions.

## Browser Support

- Chrome/Edge (latest)
- Safari (latest)
- Firefox (latest)
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 8+)

## Native App Features

When built with Capacitor:

- Native haptic feedback
- Camera access
- Geolocation
- Clipboard access
- Native transitions
- Status bar customization
- Splash screen

## License

MIT

## Author

Kazi Musharraf

## Live Deployment

- **Vercel**: https://46-starter-ionic-react.vercel.app ✓
- **Cloudflare Pages**: https://46-starter-ionic-react.pages.dev ✓
- **GitHub Pages**: https://mk-knight23.github.io/46-starter-ionic-react/ *(enable in repo settings)*
- **Version**: 2.1.0

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
