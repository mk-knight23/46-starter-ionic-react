import { IonContent, IonSpinner, IonText, IonPage, IonButton } from '@ionic/react';
import React from 'react';

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

/**
 * Loading State Component
 *
 * Displays a loading indicator with optional message.
 * Can be used as a full-screen overlay or inline.
 */
export function LoadingState({ message = 'Loading...', fullScreen = false }: LoadingStateProps) {
  const content = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      padding: '2rem',
    }}>
      <IonSpinner name="crescent" style={{ transform: 'scale(1.5)' }} />
      {message && (
        <IonText color="medium">
          <p>{message}</p>
        </IonText>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <IonPage>
        <IonContent>
          {content}
        </IonContent>
      </IonPage>
    );
  }

  return content;
}

/**
 * Empty State Component
 *
 * Displays an empty state with optional action button.
 */
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, message, action }: EmptyStateProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      padding: '3rem 1rem',
      textAlign: 'center',
    }}>
      {icon && <div style={{ fontSize: '3rem' }}>{icon}</div>}
      <IonText>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{title}</h2>
      </IonText>
      {message && (
        <IonText color="medium">
          <p>{message}</p>
        </IonText>
      )}
      {action && <button onClick={action.onClick}>{action.label}</button>}
    </div>
  );
}

/**
 * Error State Component
 *
 * Displays an error state with retry action.
 */
interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ title = 'Something went wrong', message, onRetry }: ErrorStateProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      padding: '3rem 1rem',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '3rem' }}>⚠️</div>
      <IonText>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{title}</h2>
      </IonText>
      <IonText color="medium">
        <p>{message}</p>
      </IonText>
      {onRetry && (
        <button onClick={onRetry}>Try Again</button>
      )}
    </div>
  );
}
