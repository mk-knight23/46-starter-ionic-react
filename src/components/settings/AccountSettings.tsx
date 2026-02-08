import { IonItem, IonLabel, IonButton, IonInput, IonAlert } from '@ionic/react';
import { Shield, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface AccountSettingsProps {
  isLoading: boolean;
  onPasswordChange: (current: string, newPassword: string) => void;
  onDeleteAccount: () => void;
}

export function AccountSettings({ isLoading, onPasswordChange, onDeleteAccount }: AccountSettingsProps) {
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordSubmit = () => {
    if (currentPassword && newPassword) {
      onPasswordChange(currentPassword, newPassword);
      setShowPasswordAlert(false);
      setCurrentPassword('');
      setNewPassword('');
    }
    return true;
  };

  const handleDeleteSubmit = () => {
    onDeleteAccount();
    setShowDeleteAlert(false);
  };

  return (
    <>
      <IonItem button onClick={() => setShowPasswordAlert(true)} aria-label="Change password">
        <Shield className="mr-2" />
        <IonLabel>Change Password</IonLabel>
      </IonItem>

      <IonItem button onClick={() => setShowDeleteAlert(true)} aria-label="Delete account" style={{ color: 'var(--ion-color-danger)' }}>
        <Trash2 className="mr-2" />
        <IonLabel>Delete Account</IonLabel>
      </IonItem>

      <IonAlert
        isOpen={showPasswordAlert}
        onDidDismiss={() => setShowPasswordAlert(false)}
        header="Change Password"
        inputs={[
          {
            name: 'currentPassword',
            type: 'password',
            placeholder: 'Current Password',
          },
          {
            name: 'newPassword',
            type: 'password',
            placeholder: 'New Password',
          },
        ]}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Change',
            handler: (data: any) => {
              if (data.currentPassword && data.newPassword) {
                onPasswordChange(data.currentPassword, data.newPassword);
                setCurrentPassword('');
                setNewPassword('');
                setShowPasswordAlert(false);
                return true;
              }
              return false;
            },
          },
        ]}
      />

      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => setShowDeleteAlert(false)}
        header="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone."
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Delete',
            role: 'destructive',
            handler: handleDeleteSubmit,
          },
        ]}
      />
    </>
  );
}
