import { IonItem, IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import { Sun, Moon, Globe } from 'lucide-react';

interface ThemeSettingsProps {
  theme: 'light' | 'dark' | 'system';
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
}

export function ThemeSettings({ theme, onThemeChange }: ThemeSettingsProps) {
  return (
    <>
      <IonItem>
        <IonLabel>Theme</IonLabel>
        <IonSegment
          value={theme}
          onIonChange={(e) => onThemeChange(e.detail.value as 'light' | 'dark' | 'system')}
          aria-label="Select theme"
        >
          <IonSegmentButton value="light" aria-label="Light theme">
            <Sun />
            <IonLabel>Light</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="dark" aria-label="Dark theme">
            <Moon />
            <IonLabel>Dark</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="system" aria-label="System theme">
            <Globe />
            <IonLabel>System</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonItem>
    </>
  );
}
