import { IonItem, IonLabel, IonToggle } from '@ionic/react';

interface SyncSettingsProps {
  sync: {
    autoSync: boolean;
    wifiOnly: boolean;
    lastSync: string;
  };
  onSyncChange: (key: 'autoSync' | 'wifiOnly' | 'lastSync') => void;
}

export function SyncSettings({ sync, onSyncChange }: SyncSettingsProps) {
  const formatLastSync = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <>
      <IonItem>
        <IonLabel>Auto-sync</IonLabel>
        <IonToggle
          checked={sync.autoSync}
          onIonChange={() => onSyncChange('autoSync')}
          aria-label="Toggle auto-sync"
        />
      </IonItem>

      <IonItem>
        <IonLabel>WiFi only</IonLabel>
        <IonToggle
          checked={sync.wifiOnly}
          onIonChange={() => onSyncChange('wifiOnly')}
          aria-label="Toggle WiFi only sync"
        />
      </IonItem>

      <IonItem>
        <IonLabel>
          Last sync: {formatLastSync(sync.lastSync)}
        </IonLabel>
      </IonItem>
    </>
  );
}
