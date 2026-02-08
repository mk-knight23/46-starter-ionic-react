import React, { Component, ErrorInfo, ReactNode } from 'react';
import { IonButton, IonContent, IonPage, IonText, IonCard, IonCardContent } from '@ionic/react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI.
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);

    // Log to error reporting service (e.g., Sentry)
    if (import.meta.env.PROD) {
      // Sentry.captureException(error, { contexts: { react: errorInfo } });
    }

    this.setState({
      error,
      errorInfo,
    });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <IonPage>
          <IonContent className="ion-padding">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1rem' }}>
              <IonText color="danger">
                <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Oops!</h1>
              </IonText>
              <IonText>
                <h2 style={{ fontSize: '1.5rem', textAlign: 'center' }}>Something went wrong</h2>
              </IonText>
              <IonCard>
                <IonCardContent>
                  <IonText color="medium">
                    <p>An unexpected error occurred. Please try refreshing the page.</p>
                  </IonText>
                  {import.meta.env.DEV && this.state.error && (
                    <IonText color="danger">
                      <p style={{ marginTop: '1rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                        {this.state.error.toString()}
                      </p>
                    </IonText>
                  )}
                </IonCardContent>
              </IonCard>
              <IonButton expand="block" onClick={this.handleReset}>
                Reload Page
              </IonButton>
            </div>
          </IonContent>
        </IonPage>
      );
    }

    return this.props.children;
  }
}
