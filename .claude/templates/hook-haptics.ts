import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { useEffect } from 'react';

/**
 * Haptic feedback hook with web fallback
 * Provides native-like haptic feedback on supported devices
 */
export const useHaptics = () => {
  const triggerImpact = async (style: ImpactStyle = ImpactStyle.Medium) => {
    try {
      if (Capacitor.isNativePlatform()) {
        await Haptics.impact({ style });
      } else {
        // Web fallback: subtle vibration if supported
        if ('vibrate' in navigator) {
          navigator.vibrate(style === ImpactStyle.Heavy ? 30 : style === ImpactStyle.Medium ? 20 : 10);
        }
      }
    } catch (error) {
      console.warn('Haptics not available:', error);
    }
  };

  const triggerNotification = async (type: 'SUCCESS' | 'WARNING' | 'ERROR') => {
    try {
      if (Capacitor.isNativePlatform()) {
        await Haptics.notification({ type });
      } else {
        if ('vibrate' in navigator) {
          const pattern = type === 'SUCCESS' ? [10] : type === 'WARNING' ? [20, 50, 20] : [30, 50, 30, 50];
          navigator.vibrate(pattern);
        }
      }
    } catch (error) {
      console.warn('Haptics not available:', error);
    }
  };

  const triggerSelection = async () => {
    try {
      if (Capacitor.isNativePlatform()) {
        await Haptics.selectionStart();
        await Haptics.selectionEnd();
      } else {
        if ('vibrate' in navigator) {
          navigator.vibrate(10);
        }
      }
    } catch (error) {
      console.warn('Haptics not available:', error);
    }
  };

  return { triggerImpact, triggerNotification, triggerSelection };
};

// Usage example:
// const { triggerImpact, triggerNotification } = useHaptics();
// await triggerImpact(ImpactStyle.Light);
// await triggerNotification('SUCCESS');
