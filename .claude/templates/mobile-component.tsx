import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import React from 'react';

interface MobilePageProps {
  title: string;
  children: React.ReactNode;
}

export const MobilePage: React.FC<MobilePageProps> = ({ title, children }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {children}
      </IonContent>
    </IonPage>
  );
};

// Use Ionic's IonBackButton for navigation
import { IonButtons, IonBackButton } from '@ionic/react';

export const MobilePageWithBack: React.FC<MobilePageProps> = ({ title, children }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {children}
      </IonContent>
    </IonPage>
  );
};
