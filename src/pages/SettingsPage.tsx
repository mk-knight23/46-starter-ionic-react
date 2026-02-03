import { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
  IonAlert,
  IonToast,
  IonLoading,
  IonIcon,
  IonSegment,
  IonSegmentButton
} from '@ionic/react';
import {
  moon,
  sunny,
  save,
  notifications,
  camera,
  map,
  refresh,
  cloud,
  shield,
  bell,
  cog,
  colorPalette,
  globe
} from 'lucide-react';
import { useAuth } from '../services/auth';
import { config } from '../config/app.config';

interface Settings {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    likes: boolean;
    comments: boolean;
    follows: boolean;
    updates: boolean;
  };
  privacy: {
    accountVisibility: 'public' | 'private';
    showActivity: boolean;
  };
  preferences: {
    language: string;
    timezone: string;
    autoSave: boolean;
    offlineMode: boolean;
    dataUsage: 'low' | 'normal' | 'high';
  };
  sync: {
    autoSync: boolean;
    wifiOnly: boolean;
    lastSync: string;
  };
}

const SettingsPage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [settings, setSettings] = useState<Settings>({
    theme: 'system',
    notifications: {
      likes: true,
      comments: true,
      follows: false,
      updates: true,
    },
    privacy: {
      accountVisibility: 'public',
      showActivity: true,
    },
    preferences: {
      language: 'en',
      timezone: 'UTC',
      autoSave: true,
      offlineMode: true,
      dataUsage: 'normal',
    },
    sync: {
      autoSync: true,
      wifiOnly: false,
      lastSync: new Date().toISOString(),
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showChangesSaved, setShowChangesSaved] = useState(false);
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);
  const [showDeleteAccountAlert, setShowDeleteAccountAlert] = useState(false);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem('app_settings');
        if (savedSettings) {
          const parsed = JSON.parse(savedSettings);
          setSettings(prev => ({ ...prev, ...parsed }));
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };

    loadSettings();
  }, []);

  // Save settings to localStorage
  const saveSettings = (newSettings: Partial<Settings>) => {
    const updatedSettings = { ...settings, ...newSettings };

    try {
      localStorage.setItem('app_settings', JSON.stringify(updatedSettings));
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    saveSettings({ theme });
    applyTheme(theme);
  };

  const applyTheme = (theme: 'light' | 'dark' | 'system') => {
    const root = document.documentElement;

    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } else if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const handleNotificationChange = (key: keyof Settings['notifications']) => {
    saveSettings({
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key]
      }
    });
  };

  const handlePrivacyChange = (key: keyof Settings['privacy']) => {
    saveSettings({
      privacy: {
        ...settings.privacy,
        [key]: !settings.privacy[key]
      }
    });
  };

  const handlePreferenceChange = (key: keyof Settings['preferences'], value: any) => {
    saveSettings({
      preferences: {
        ...settings.preferences,
        [key]: value
      }
    });
  };

  const handleSyncChange = (key: keyof Settings['sync']) => {
    saveSettings({
      sync: {
        ...settings.sync,
        [key]: !settings.sync[key]
      }
    });
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would save to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowChangesSaved(true);
      setShowSaveAlert(true);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = () => {
    setShowPasswordAlert(true);
  };

  const handleDeleteAccount = () => {
    setShowDeleteAccountAlert(true);
  };

  const handlePasswordSubmit = async (currentPassword: string, newPassword: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would call your auth service
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowPasswordAlert(false);
    } catch (error) {
      console.error('Password change failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccountSubmit = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would call your auth service
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowDeleteAccountAlert(false);
    } catch (error) {
      console.error('Account deletion failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Apply theme on initial load and when settings change
  useEffect(() => {
    applyTheme(settings.theme);
  }, [settings.theme]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonLoading isOpen={isLoading} message="Saving settings..." />

        <IonList>
          {/* Theme Settings */}
          <IonListHeader>
            <IonLabel>
              <IonIcon icon={colorPalette} className="mr-2" />
              Appearance
            </IonLabel>
          </IonListHeader>

          <IonItem>
            <IonLabel>Theme</IonLabel>
            <IonSegment
              value={settings.theme}
              onIonChange={(e) => handleThemeChange(e.detail.value as 'light' | 'dark' | 'system')}
            >
              <IonSegmentButton value="light">
                <IonIcon icon={sunny} />
                <IonLabel>Light</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="dark">
                <IonIcon icon={moon} />
                <IonLabel>Dark</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="system">
                <IonIcon icon={globe} />
                <IonLabel>System</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonItem>

          {/* Notification Settings */}
          <IonListHeader>
            <IonLabel>
              <IonIcon icon={bell} className="mr-2" />
              Notifications
            </IonLabel>
          </IonListHeader>

          <IonItem>
            <IonLabel>Likes on my posts</IonLabel>
            <IonToggle
              checked={settings.notifications.likes}
              onIonChange={() => handleNotificationChange('likes')}
            />
          </IonItem>

          <IonItem>
            <IonLabel>Comments on my posts</IonLabel>
            <IonToggle
              checked={settings.notifications.comments}
              onIonChange={() => handleNotificationChange('comments')}
            />
          </IonItem>

          <IonItem>
            <IonLabel>New followers</IonLabel>
            <IonToggle
              checked={settings.notifications.follows}
              onIonChange={() => handleNotificationChange('follows')}
            />
          </IonItem>

          <IonItem>
            <IonLabel>App updates</IonLabel>
            <IonToggle
              checked={settings.notifications.updates}
              onIonChange={() => handleNotificationChange('updates')}
            />
          </IonItem>

          {/* Privacy Settings */}
          <IonListHeader>
            <IonLabel>
              <IonIcon icon={shield} className="mr-2" />
              Privacy
            </IonLabel>
          </IonListHeader>

          <IonItem>
            <IonLabel>Account visibility</IonLabel>
            <IonSelect
              value={settings.privacy.accountVisibility}
              onIonChange={(e) =>
                saveSettings({
                  privacy: {
                    ...settings.privacy,
                    accountVisibility: e.detail.value as 'public' | 'private'
                  }
                })
              }
            >
              <IonSelectOption value="public">Public</IonSelectOption>
              <IonSelectOption value="private">Private</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Show activity status</IonLabel>
            <IonToggle
              checked={settings.privacy.showActivity}
              onIonChange={() => handlePrivacyChange('showActivity')}
            />
          </IonItem>

          {/* Preferences */}
          <IonListHeader>
            <IonLabel>
              <IonIcon icon={cog} className="mr-2" />
              Preferences
            </IonLabel>
          </IonListHeader>

          <IonItem>
            <IonLabel>Language</IonLabel>
            <IonSelect
              value={settings.preferences.language}
              onIonChange={(e) => handlePreferenceChange('language', e.detail.value)}
            >
              <IonSelectOption value="en">English</IonSelectOption>
              <IonSelectOption value="es">Spanish</IonSelectOption>
              <IonSelectOption value="fr">French</IonSelectOption>
              <IonSelectOption value="de">German</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Auto-save drafts</IonLabel>
            <IonToggle
              checked={settings.preferences.autoSave}
              onIonChange={() => handlePreferenceChange('autoSave', !settings.preferences.autoSave)}
            />
          </IonItem>

          <IonItem>
            <IonLabel>Offline mode</IonLabel>
            <IonToggle
              checked={settings.preferences.offlineMode}
              onIonChange={() => handlePreferenceChange('offlineMode', !settings.preferences.offlineMode)}
            />
          </IonItem>

          <IonItem>
            <IonLabel>Data usage</IonLabel>
            <IonSelect
              value={settings.preferences.dataUsage}
              onIonChange={(e) => handlePreferenceChange('dataUsage', e.detail.value)}
            >
              <IonSelectOption value="low">Low</IonSelectOption>
              <IonSelectOption value="normal">Normal</IonSelectOption>
              <IonSelectOption value="high">High</IonSelectOption>
            </IonSelect>
          </IonItem>

          {/* Sync Settings */}
          <IonListHeader>
            <IonLabel>
              <IonIcon icon={cloud} className="mr-2" />
              Sync
            </IonLabel>
          </IonListHeader>

          <IonItem>
            <IonLabel>Auto-sync when online</IonLabel>
            <IonToggle
              checked={settings.sync.autoSync}
              onIonChange={() => handleSyncChange('autoSync')}
            />
          </IonItem>

          <IonItem>
            <IonLabel>WiFi only</IonLabel>
            <IonToggle
              checked={settings.sync.wifiOnly}
              onIonChange={() => handleSyncChange('wifiOnly')}
            />
          </IonItem>

          <IonItem>
            <IonLabel>Last synced</IonLabel>
            <IonLabel slot="end">
              {new Date(settings.sync.lastSync).toLocaleString()}
            </IonLabel>
          </IonItem>

          {/* Account Actions */}
          <IonListHeader>
            <IonLabel>Account</IonLabel>
          </IonListHeader>

          <IonItem button onClick={handleChangePassword}>
            <IonIcon icon={save} className="mr-2" />
            <IonLabel>Change Password</IonLabel>
          </IonItem>

          <IonItem button onClick={handleDeleteAccount} color="danger">
            <IonIcon icon={refresh} className="mr-2" />
            <IonLabel>Delete Account</IonLabel>
          </IonItem>
        </IonList>

        <div className="p-4">
          <IonButton expand="block" onClick={handleSaveSettings}>
            <IonIcon icon={save} className="mr-2" />
            Save Settings
          </IonButton>
        </div>
      </IonContent>

      {/* Toast for save confirmation */}
      <IonToast
        isOpen={showChangesSaved}
        onDidDismiss={() => setShowChangesSaved(false)}
        message="Settings saved successfully!"
        duration={3000}
        position="bottom"
      />

      {/* Password Change Alert */}
      <IonAlert
        isOpen={showPasswordAlert}
        header="Change Password"
        inputs={[
          { name: 'current', type: 'password', placeholder: 'Current Password' },
          { name: 'new', type: 'password', placeholder: 'New Password' },
          { name: 'confirm', type: 'password', placeholder: 'Confirm New Password' }
        ]}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Change Password',
            handler: (data: any) => {
              if (data.new === data.confirm) {
                handlePasswordSubmit(data.current, data.new);
              }
              return false;
            }
          }
        ]}
      />

      {/* Delete Account Alert */}
      <IonAlert
        isOpen={showDeleteAccountAlert}
        header="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone."
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Delete Account',
            role: 'destructive',
            handler: () => handleDeleteAccountSubmit()
          }
        ]}
      />
    </IonPage>
  );
};

export default SettingsPage;