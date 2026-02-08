import { IonItem, IonLabel, IonToggle } from '@ionic/react';

interface NotificationSettingsProps {
  notifications: {
    likes: boolean;
    comments: boolean;
    follows: boolean;
    updates: boolean;
  };
  onNotificationChange: (key: 'likes' | 'comments' | 'follows' | 'updates') => void;
}

export function NotificationSettings({ notifications, onNotificationChange }: NotificationSettingsProps) {
  return (
    <>
      <IonItem>
        <IonLabel>Likes on my posts</IonLabel>
        <IonToggle
          checked={notifications.likes}
          onIonChange={() => onNotificationChange('likes')}
          aria-label="Toggle like notifications"
        />
      </IonItem>

      <IonItem>
        <IonLabel>Comments on my posts</IonLabel>
        <IonToggle
          checked={notifications.comments}
          onIonChange={() => onNotificationChange('comments')}
          aria-label="Toggle comment notifications"
        />
      </IonItem>

      <IonItem>
        <IonLabel>New followers</IonLabel>
        <IonToggle
          checked={notifications.follows}
          onIonChange={() => onNotificationChange('follows')}
          aria-label="Toggle follower notifications"
        />
      </IonItem>

      <IonItem>
        <IonLabel>App updates</IonLabel>
        <IonToggle
          checked={notifications.updates}
          onIonChange={() => onNotificationChange('updates')}
          aria-label="Toggle update notifications"
        />
      </IonItem>
    </>
  );
}
