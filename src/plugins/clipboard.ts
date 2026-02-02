import { Clipboard } from '@capacitor/clipboard';
import { Capacitor } from '@capacitor/core';

/**
 * Clipboard plugin wrapper with web fallback
 */
export class ClipboardPlugin {
  private static isNative = Capacitor.isNativePlatform();

  static async write(text: string): Promise<void> {
    try {
      if (this.isNative) {
        await Clipboard.write({ string: text });
      } else {
        // Web fallback
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          // Legacy fallback
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.select();
          try {
            document.execCommand('copy');
          } finally {
            document.body.removeChild(textArea);
          }
        }
      }
    } catch (error) {
      console.error('Clipboard write error:', error);
      throw new Error('Failed to write to clipboard');
    }
  }

  static async read(): Promise<string> {
    try {
      if (this.isNative) {
        const { value } = await Clipboard.read();
        return value || '';
      } else {
        // Web fallback
        if (navigator.clipboard && navigator.clipboard.readText) {
          return await navigator.clipboard.readText();
        } else {
          // Legacy fallback - not possible to read in most browsers
          throw new Error('Reading clipboard not supported in this browser');
        }
      }
    } catch (error) {
      console.error('Clipboard read error:', error);
      throw new Error('Failed to read from clipboard');
    }
  }
}

// Usage:
// await ClipboardPlugin.write('Hello, World!');
// const text = await ClipboardPlugin.read();
