import { databaseService } from './database';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: number;
  email: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

interface Session {
  id: number;
  userId: number;
  token: string;
  expiresAt: string;
  createdAt: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  username: string;
  password: string;
  displayName?: string;
}

interface AuthContextState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

/**
 * Authentication Service
 * Handles user authentication, sessions, and JWT token management
 */
export class AuthService {
  private static instance: AuthService;
  private token: string | null = null;
  private user: User | null = null;
  private tokenRefreshTimer: NodeJS.Timeout | null = null;

  private constructor() {
    // Load token from localStorage on initialization
    this.loadToken();
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Login user with credentials
   */
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      // This would normally make an API call to your backend
      // For demo purposes, we'll create a mock user and session
      const mockUser = await this.createUserSession(credentials);

      this.token = mockUser.token;
      this.user = mockUser.user;

      // Store token securely
      this.storeToken(this.token);

      // Set up token refresh timer
      this.setupTokenRefresh();

      return this.user;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Authentication failed');
    }
  }

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<User> {
    try {
      // Check if user already exists
      const existingUser = await databaseService.queryOne(
        'SELECT id FROM users WHERE email = ? OR username = ?',
        [data.email, data.username]
      );

      if (existingUser) {
        throw new Error('User with this email or username already exists');
      }

      // Create new user
      const userId = await databaseService.insert('users', {
        email: data.email,
        username: data.username,
        display_name: data.displayName || data.username,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

      // Log in the new user
      const loginCredentials: LoginCredentials = {
        email: data.email,
        password: data.password
      };

      return await this.login(loginCredentials);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    try {
      // Remove session from database
      if (this.user && this.token) {
        await databaseService.execute(
          'DELETE FROM sessions WHERE user_id = ? AND token = ?',
          [this.user.id, this.token]
        );
      }

      // Clear local state
      this.clearAuth();
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if database operation fails
      this.clearAuth();
    }
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.user;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.user && !!this.token && !this.isTokenExpired();
  }

  /**
   * Get authentication token
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * Refresh authentication session
   */
  async refreshSession(): Promise<User> {
    if (!this.user || !this.token) {
      throw new Error('No active session');
    }

    try {
      // Refresh token logic would go here
      // For demo, we'll just verify the current token
      this.verifyToken(this.token);

      return this.user;
    } catch (error) {
      console.error('Session refresh failed:', error);
      throw new Error('Session expired');
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(data: Partial<User>): Promise<User> {
    if (!this.user) {
      throw new Error('No authenticated user');
    }

    try {
      await databaseService.update('users', this.user.id, {
        ...data,
        updated_at: new Date().toISOString()
      });

      // Refresh user data
      this.user = await databaseService.queryOne(
        'SELECT * FROM users WHERE id = ?',
        [this.user.id]
      ) as User;

      return this.user;
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  }

  /**
   * Change password
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    if (!this.user) {
      throw new Error('No authenticated user');
    }

    // Password validation would go here
    if (!currentPassword || !newPassword) {
      throw new Error('Password cannot be empty');
    }

    // In a real app, you would hash the password and update it
    console.log('Password change requested for user:', this.user.id);
  }

  /**
   * Load token from localStorage
   */
  private loadToken(): void {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        this.token = token;
        this.verifyToken(token);
      }
    } catch (error) {
      console.warn('Failed to load auth token:', error);
    }
  }

  /**
   * Store token in localStorage
   */
  private storeToken(token: string): void {
    try {
      localStorage.setItem('auth_token', token);
    } catch (error) {
      console.error('Failed to store auth token:', error);
    }
  }

  /**
   * Clear authentication data
   */
  private clearAuth(): void {
    this.token = null;
    this.user = null;
    if (this.tokenRefreshTimer) {
      clearTimeout(this.tokenRefreshTimer);
      this.tokenRefreshTimer = null;
    }
    try {
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Failed to remove auth token:', error);
    }
  }

  /**
   * Verify JWT token
   */
  private verifyToken(token: string): void {
    try {
      const decoded = jwtDecode<{ exp: number; userId: number }>(token);
      const now = Math.floor(Date.now() / 1000);

      if (decoded.exp < now) {
        throw new Error('Token expired');
      }

      // Load user data
      this.loadUserData(decoded.userId);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  /**
   * Check if token is expired
   */
  private isTokenExpired(): boolean {
    if (!this.token) return true;

    try {
      const decoded = jwtDecode<{ exp: number }>(this.token);
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp < now;
    } catch {
      return true;
    }
  }

  /**
   * Load user data from database
   */
  private async loadUserData(userId: number): Promise<void> {
    const user = await databaseService.queryOne(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );

    if (!user) {
      throw new Error('User not found');
    }

    this.user = user as User;
  }

  /**
   * Create user session (mock implementation)
   */
  private async createUserSession(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    // Mock user creation - in a real app, this would make an API call
    const user = await databaseService.queryOne(
      'SELECT * FROM users WHERE email = ?',
      [credentials.email]
    ) as User;

    if (!user) {
      // Create mock user for demo
      const userId = await databaseService.insert('users', {
        email: credentials.email,
        username: credentials.email.split('@')[0],
        display_name: 'Demo User',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

      const newUser = await databaseService.queryOne(
        'SELECT * FROM users WHERE id = ?',
        [userId]
      ) as User;

      user = newUser;
    }

    // Create session token (JWT-like)
    const token = this.generateToken(user.id);

    // Store session
    await databaseService.insert('sessions', {
      user_id: user.id,
      token: token,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      created_at: new Date().toISOString()
    });

    return { user, token };
  }

  /**
   * Generate a mock JWT token
   */
  private generateToken(userId: number): string {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const payload = {
      userId,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
      iat: Math.floor(Date.now() / 1000)
    };

    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));

    return `${encodedHeader}.${encodedPayload}.signature`;
  }

  /**
   * Set up automatic token refresh
   */
  private setupTokenRefresh(): void {
    if (this.tokenRefreshTimer) {
      clearTimeout(this.tokenRefreshTimer);
    }

    // Check token every 5 minutes
    this.tokenRefreshTimer = setTimeout(() => {
      if (this.isAuthenticated()) {
        this.refreshSession().catch(console.error);
      }
    }, 5 * 60 * 1000);
  }
}

// Export singleton instance
export const authService = AuthService.getInstance();

// React context hook
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const AuthContext = createContext<AuthContextState>({
  user: null,
  isLoading: true,
  isAuthenticated: false
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthContextState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await databaseService.initialize();

        if (authService.isAuthenticated()) {
          const user = authService.getCurrentUser();
          setState({
            user,
            isLoading: false,
            isAuthenticated: true
          });
        } else {
          setState({
            user: null,
            isLoading: false,
            isAuthenticated: false
          });
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        setState({
          user: null,
          isLoading: false,
          isAuthenticated: false
        });
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
};