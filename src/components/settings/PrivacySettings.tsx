import { IonItem, IonLabel, IonToggle, IonSelect, IonSelectOption } from '@ionic/react';

interface PrivacySettingsProps {
  privacy: {
    accountVisibility: 'public' | 'private';
    showActivity: boolean;
  };
  onPrivacyChange: (key: 'accountVisibility' | 'showActivity') => void;
  onVisibilityChange: (value: 'public' | 'private') => void;
}

export function PrivacySettings({ privacy, onPrivacyChange, onVisibilityChange }: PrivacySettingsProps) {
  return (
    <>
      <IonItem>
        <IonLabel>Account Visibility</IonLabel>
        <IonSelect
          value={privacy.accountVisibility}
          onIonChange={(e) => onVisibilityChange(e.detail.value)}
          aria-label="Select account visibility"
        >
          <IonSelectOption value="public">Public</IonSelectOption>
          <IonSelectOption value="private">Private</IonSelectOption>
        </IonSelect>
      </IonItem>

      <IonItem>
        <IonLabel>Show activity status</IonLabel>
        <IonToggle
          checked={privacy.showActivity}
          onIonChange={() => onPrivacyChange('showActivity')}
          aria-label="Toggle activity status"
        />
      </IonItem>
    </>
  );
}
