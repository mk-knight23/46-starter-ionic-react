import { IonItem, IonLabel, IonToggle, IonSelect, IonSelectOption } from '@ionic/react';

interface PreferencesSettingsProps {
  preferences: {
    language: string;
    timezone: string;
    autoSave: boolean;
    offlineMode: boolean;
    dataUsage: 'low' | 'normal' | 'high';
  };
  onPreferenceChange: (key: 'language' | 'timezone' | 'autoSave' | 'offlineMode' | 'dataUsage', value: any) => void;
}

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'zh', label: 'Chinese' },
];

const TIMEZONES = [
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'Eastern Time' },
  { value: 'America/Chicago', label: 'Central Time' },
  { value: 'America/Denver', label: 'Mountain Time' },
  { value: 'America/Los_Angeles', label: 'Pacific Time' },
];

export function PreferencesSettings({ preferences, onPreferenceChange }: PreferencesSettingsProps) {
  return (
    <>
      <IonItem>
        <IonLabel>Language</IonLabel>
        <IonSelect
          value={preferences.language}
          onIonChange={(e) => onPreferenceChange('language', e.detail.value)}
          aria-label="Select language"
        >
          {LANGUAGES.map(lang => (
            <IonSelectOption key={lang.value} value={lang.value}>
              {lang.label}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>

      <IonItem>
        <IonLabel>Timezone</IonLabel>
        <IonSelect
          value={preferences.timezone}
          onIonChange={(e) => onPreferenceChange('timezone', e.detail.value)}
          aria-label="Select timezone"
        >
          {TIMEZONES.map(tz => (
            <IonSelectOption key={tz.value} value={tz.value}>
              {tz.label}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>

      <IonItem>
        <IonLabel>Auto-save</IonLabel>
        <IonToggle
          checked={preferences.autoSave}
          onIonChange={() => onPreferenceChange('autoSave', !preferences.autoSave)}
          aria-label="Toggle auto-save"
        />
      </IonItem>

      <IonItem>
        <IonLabel>Offline mode</IonLabel>
        <IonToggle
          checked={preferences.offlineMode}
          onIonChange={() => onPreferenceChange('offlineMode', !preferences.offlineMode)}
          aria-label="Toggle offline mode"
        />
      </IonItem>

      <IonItem>
        <IonLabel>Data Usage</IonLabel>
        <IonSelect
          value={preferences.dataUsage}
          onIonChange={(e) => onPreferenceChange('dataUsage', e.detail.value)}
          aria-label="Select data usage"
        >
          <IonSelectOption value="low">Low</IonSelectOption>
          <IonSelectOption value="normal">Normal</IonSelectOption>
          <IonSelectOption value="high">High</IonSelectOption>
        </IonSelect>
      </IonItem>
    </>
  );
}
