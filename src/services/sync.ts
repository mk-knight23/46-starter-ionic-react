import { databaseService } from './database';
import { Network } from '@capacitor/network';

interface SyncOperation {
  id: number;
  userId: number;
  operation: 'create' | 'update' | 'delete';
  dataType: 'post' | 'like' | 'comment';
  dataId: number;
  data: string;
  status: 'pending' | 'synced' | 'failed';
  createdAt: string;
  processedAt?: string;
  errorMessage?: string;
}

interface SyncConfig {
  autoSync: boolean;
  wifiOnly: boolean;
  retryAttempts: number;
  batchSize: number;
}

/**
 * Offline Sync Service
 * Manages offline data synchronization with conflict resolution
 */
export class SyncService {
  private static instance: SyncService;
  private isOnline: boolean = true;
  private syncTimer: NodeJS.Timeout | null = null;
  private isSyncing: boolean = false;
  private config: SyncConfig = {
    autoSync: true,
    wifiOnly: false,
    retryAttempts: 3,
    batchSize: 10
  };

  private constructor() {
    this.initializeNetworkListener();
    this.loadConfig();
  }

  static getInstance(): SyncService {
    if (!SyncService.instance) {
      SyncService.instance = new SyncService();
    }
    return SyncService.instance;
  }

  /**
   * Initialize network status listener
   */
  private initializeNetworkListener(): void {
    Network.addListener('networkStatusChange', (status) => {
      this.isOnline = status.connected;
      console.log('Network status changed:', status);

      if (this.isOnline && this.config.autoSync) {
        this.triggerSync();
      }
    });
  }

  /**
   * Load sync configuration
   */
  private loadConfig(): void {
    try {
      const saved = localStorage.getItem('sync_config');
      if (saved) {
        this.config = { ...this.config, ...JSON.parse(saved) };
      }
    } catch (error) {
      console.error('Failed to load sync config:', error);
    }
  }

  /**
   * Save sync configuration
   */
  private saveConfig(): void {
    try {
      localStorage.setItem('sync_config', JSON.stringify(this.config));
    } catch (error) {
      console.error('Failed to save sync config:', error);
    }
  }

  /**
   * Update sync configuration
   */
  updateConfig(newConfig: Partial<SyncConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.saveConfig();

    if (this.config.autoSync && this.isOnline) {
      this.triggerSync();
    }
  }

  /**
   * Get current sync configuration
   */
  getConfig(): SyncConfig {
    return { ...this.config };
  }

  /**
   * Check if sync should be performed
   */
  private shouldSync(): boolean {
    if (!this.isOnline) return false;
    if (this.config.wifiOnly && !this.isWifiOnly()) return false;
    if (this.isSyncing) return false;
    return true;
  }

  /**
   * Check if current connection is WiFi only
   */
  private async isWifiOnly(): Promise<boolean> {
    const status = await Network.getStatus();
    return status.connectionType === 'wifi';
  }

  /**
   * Trigger sync process
   */
  async triggerSync(): Promise<void> {
    if (!this.shouldSync()) {
      return;
    }

    this.isSyncing = true;
    console.log('Starting sync process...');

    try {
      await this.syncPendingOperations();
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      this.isSyncing = false;
    }
  }

  /**
   * Add operation to sync queue
   */
  async queueOperation(
    operation: 'create' | 'update' | 'delete',
    dataType: 'post' | 'like' | 'comment',
    dataId: number,
    data: any
  ): Promise<void> {
    const userId = this.getCurrentUserId();
    if (!userId) {
      throw new Error('User not authenticated');
    }

    try {
      await databaseService.insert('sync_queue', {
        user_id: userId,
        operation,
        data_type: dataType,
        data_id: dataId,
        data: JSON.stringify(data),
        status: 'pending',
        created_at: new Date().toISOString()
      });

      // Trigger sync if online
      if (this.isOnline && this.config.autoSync) {
        this.triggerSync();
      }
    } catch (error) {
      console.error('Failed to queue operation:', error);
      throw error;
    }
  }

  /**
   * Sync all pending operations
   */
  private async syncPendingOperations(): Promise<void> {
    try {
      // Get pending operations
      const operations = await databaseService.query(
        `SELECT * FROM sync_queue
         WHERE status = 'pending'
         ORDER BY created_at ASC
         LIMIT ?`,
        [this.config.batchSize]
      ) as SyncOperation[];

      if (operations.length === 0) {
        console.log('No pending operations to sync');
        return;
      }

      console.log(`Syncing ${operations.length} operations...`);

      // Process each operation
      for (const op of operations) {
        try {
          await this.processOperation(op);
          await this.markOperationSynced(op.id);
        } catch (error) {
          await this.markOperationFailed(op.id, error.message);
          console.error(`Failed to process operation ${op.id}:`, error);
        }
      }
    } catch (error) {
      console.error('Error syncing operations:', error);
      throw error;
    }
  }

  /**
   * Process a single sync operation
   */
  private async processOperation(op: SyncOperation): Promise<void> {
    // This would normally make API calls to your backend
    // For demo purposes, we'll simulate the sync process
    console.log(`Processing ${op.operation} operation for ${op.dataType} ${op.dataId}`);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // In a real app, you would:
    // 1. Send the operation to your backend API
    // 2. Handle conflict resolution
    // 3. Update local data if needed
    console.log('Operation processed successfully');
  }

  /**
   * Mark operation as synced
   */
  private async markOperationSynced(operationId: number): Promise<void> {
    await databaseService.update('sync_queue', operationId, {
      status: 'synced',
      processed_at: new Date().toISOString()
    });
  }

  /**
   * Mark operation as failed
   */
  private async markOperationFailed(operationId: number, errorMessage: string): Promise<void> {
    await databaseService.update('sync_queue', operationId, {
      status: 'failed',
      processed_at: new Date().toISOString(),
      error_message: errorMessage
    });
  }

  /**
   * Get sync statistics
   */
  async getSyncStats(): Promise<{
    pending: number;
    synced: number;
    failed: number;
    lastSync?: string;
  }> {
    try {
      const [pending, synced, failed] = await Promise.all([
        databaseService.query('SELECT COUNT(*) as count FROM sync_queue WHERE status = ?', ['pending']),
        databaseService.query('SELECT COUNT(*) as count FROM sync_queue WHERE status = ?', ['synced']),
        databaseService.query('SELECT COUNT(*) as count FROM sync_queue WHERE status = ?', ['failed'])
      ]);

      const lastSync = await databaseService.queryOne(
        'SELECT processed_at FROM sync_queue WHERE status = ? ORDER BY processed_at DESC LIMIT 1',
        ['synced']
      );

      return {
        pending: (pending[0] as any).count,
        synced: (synced[0] as any).count,
        failed: (failed[0] as any).count,
        lastSync: lastSync?.processed_at
      };
    } catch (error) {
      console.error('Failed to get sync stats:', error);
      return {
        pending: 0,
        synced: 0,
        failed: 0
      };
    }
  }

  /**
   * Clear old sync operations
   */
  async clearOldOperations(days: number = 30): Promise<void> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);

      await databaseService.execute(
        'DELETE FROM sync_queue WHERE status = ? AND created_at < ?',
        ['synced', cutoffDate.toISOString()]
      );

      console.log(`Cleared old sync operations older than ${days} days`);
    } catch (error) {
      console.error('Failed to clear old operations:', error);
    }
  }

  /**
   * Retry failed operations
   */
  async retryFailedOperations(): Promise<void> {
    try {
      const failedOps = await databaseService.query(
        'SELECT * FROM sync_queue WHERE status = ?',
        ['failed']
      ) as SyncOperation[];

      console.log(`Retrying ${failedOps.length} failed operations...`);

      for (const op of failedOps) {
        try {
          await this.processOperation(op);
          await this.markOperationSynced(op.id);
        } catch (error) {
          console.error(`Failed to retry operation ${op.id}:`, error);
        }
      }
    } catch (error) {
      console.error('Failed to retry operations:', error);
    }
  }

  /**
   * Get current user ID
   */
  private getCurrentUserId(): number | null {
    // In a real app, get this from your auth service
    return 1; // Mock user ID
  }

  /**
   * Start auto-sync timer
   */
  startAutoSync(): void {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
    }

    // Check sync status every 30 seconds
    this.syncTimer = setInterval(() => {
      if (this.isOnline && this.config.autoSync) {
        this.triggerSync();
      }
    }, 30000);

    // Initial sync
    this.triggerSync();
  }

  /**
   * Stop auto-sync timer
   */
  stopAutoSync(): void {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
      this.syncTimer = null;
    }
  }

  /**
   * Cleanup on destroy
   */
  destroy(): void {
    this.stopAutoSync();
  }
}

// Export singleton instance
export const syncService = SyncService.getInstance();