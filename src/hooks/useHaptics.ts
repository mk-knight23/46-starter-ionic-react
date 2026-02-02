import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

/**
 * Haptic feedback hook with web fallback
 * Provides native-like haptic feedback on supported devices
 */
export const useHaptics = () => {
  const isNative = Capacitor.isNativePlatform();

  const triggerImpact = async (style: ImpactStyle = ImpactStyle.Medium) => {
    try {
      if (isNative) {
        await Haptics.impact({ style });
      } else {
        // Web fallback: subtle vibration if supported
        if ('vibrate' in navigator) {
          const duration = style === ImpactStyle.Heavy ? 30 : style === ImpactStyle.Medium ? 20 : 10;
          navigator.vibrate(duration);
        }
      }
    } catch (error) {
      console.warn('Haptics not available:', error);
    }
  };

  const triggerNotification = async (type: NotificationType = NotificationType.Success) => {
    try {
      if (isNative) {
        await Haptics.notification({ type });
      } else {
        if ('vibrate' in navigator) {
          const patterns: Record<NotificationType, number[]> = {
            [NotificationType.Success]: [10],
            [NotificationType.Warning]: [20, 50, 20],
            [NotificationType.Error]: [30, 50, 30, 50],
          };
          navigator.vibrate(patterns[type]);
        }
      }
    } catch (error) {
      console.warn('Haptics not available:', error);
    }
  };

  const triggerSelection = async () => {
    try {
      if (isNative) {
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

  const triggerClick = async () => {
    await triggerImpact(ImpactStyle.Light);
  };

  const triggerToggle = async () => {
    await triggerImpact(ImpactStyle.Medium);
  };

  const triggerSuccess = async () => {
    await triggerNotification(NotificationType.Success);
  };

  const triggerWarning = async () => {
    await triggerNotification(NotificationType.Warning);
  };

  const triggerError = async () => {
    await triggerNotification(NotificationType.Error);
  };

  return {
    triggerImpact,
    triggerNotification,
    triggerSelection,
    triggerClick,
    triggerToggle,
    triggerSuccess,
    triggerWarning,
    triggerError,
    isNative,
  };
};

// Usage example:
// const { triggerClick, triggerToggle, triggerSuccess } = useHaptics();
// await triggerClick(); // Light tap feedback
// await triggerToggle(); // Medium toggle feedback
// await triggerSuccess(); // Success notification vibration
