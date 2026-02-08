import { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonListHeader,
  IonLabel,
  IonButton,
  IonToast,
  IonLoading,
} from '@ionic/react';
import { Save, Bell as BellIcon, Palette, Cloud } from 'lucide-react';
import { useAuth } from '../services/auth';
import { config } from '../config/app.config';
import {
  ThemeSettings,
  NotificationSettings,
  PrivacySettings,
  PreferencesSettings,
  SyncSettings,
  AccountSettings,
} from '../components/settings';

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
  const [showChangesSaved, setShowChangesSaved] = useState(false);

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

  const handleVisibilityChange = (value: 'public' | 'private') => {
    saveSettings({
      privacy: {
        ...settings.privacy,
        accountVisibility: value
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
    const updatedSync = { ...settings.sync };
    if (key === 'lastSync') {
      updatedSync[key] = new Date().toISOString();
    } else {
      updatedSync[key] = !settings.sync[key];
    }
    saveSettings({ sync: updatedSync });
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would save to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowChangesSaved(true);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (currentPassword: string, newPassword: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would call your auth service
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowChangesSaved(true);
    } catch (error) {
      console.error('Password change failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would call your auth service
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, you would redirect to login page
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
              <Palette className="inline mr-2" />
              Appearance
            </IonLabel>
          </IonListHeader>
          <ThemeSettings theme={settings.theme} onThemeChange={handleThemeChange} />

          {/* Notification Settings */}
          <IonListHeader>
            <IonLabel>
              <BellIcon className="inline mr-2" />
              Notifications
            </IonLabel>
          </IonListHeader>
          <NotificationSettings
            notifications={settings.notifications}
            onNotificationChange={handleNotificationChange}
          />

          {/* Privacy Settings */}
          <IonListHeader>
            <IonLabel>Privacy</IonLabel>
          </IonListHeader>
          <PrivacySettings
            privacy={settings.privacy}
            onPrivacyChange={handlePrivacyChange}
            onVisibilityChange={handleVisibilityChange}
          />

          {/* Preferences Settings */}
          <IonListHeader>
            <IonLabel>Preferences</IonLabel>
          </IonListHeader>
          <PreferencesSettings
            preferences={settings.preferences}
            onPreferenceChange={handlePreferenceChange}
          />

          {/* Sync Settings */}
          <IonListHeader>
            <IonLabel>
              <Cloud className="inline mr-2" />
              Sync
            </IonLabel>
          </IonListHeader>
          <SyncSettings sync={settings.sync} onSyncChange={handleSyncChange} />

          {/* Account Actions */}
          <IonListHeader>
            <IonLabel>Account</IonLabel>
          </IonListHeader>
          <AccountSettings
            isLoading={isLoading}
            onPasswordChange={handlePasswordChange}
            onDeleteAccount={handleDeleteAccount}
          />
        </IonList>

        <div className="p-4">
          <IonButton expand="block" onClick={handleSaveSettings}>
            <Save className="inline mr-2" />
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
    </IonPage>
  );
};

export default SettingsPage;
