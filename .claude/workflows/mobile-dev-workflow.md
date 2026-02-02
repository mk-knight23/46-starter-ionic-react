# Mobile Development Workflow

## Feature Development

1. **Add Ionic Components**
   ```bash
   # Use Ionic components for native feel
   npm install @ionic/react
   ```

2. **Test on Multiple Platforms**
   ```bash
   # Web testing
   npm run dev

   # iOS testing (after capacitor sync)
   npm run build
   npx cap sync ios
   npx cap open ios

   # Android testing
   npx cap sync android
   npx cap open android
   ```

3. **Before Committing**
   - Run type check: `npm run type-check`
   - Run linter: `npm run lint`
   - Test on mobile viewport
   - Verify touch interactions

## Capacitor Plugin Integration

1. Install plugin:
   ```bash
   npm install @capacitor/[plugin-name]
   npx cap sync
   ```

2. Import and use:
   ```typescript
   import { Plugin } from '@capacitor/[plugin-name]';

   // Use with web fallback
   const isNative = Capacitor.isNativePlatform();
   ```

## Common Issues

- **Haptics not working**: Add user interaction first
- **Camera black screen**: Check permissions in capacitor.config.ts
- **Build errors**: Clear node_modules and reinstall
