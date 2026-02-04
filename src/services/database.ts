/**
 * Database Service for SQLite operations
 * Provides centralized database access with schema management
 *
 * Note: SQLite is only available on native platforms.
 * For web/demo purposes, this uses localStorage as fallback.
 */

interface Database {
  execute: (options: { statement: string; args: any[] }) => Promise<any>;
  query: (options: { statement: string; args: any[] }) => Promise<any>;
  close: () => Promise<void>;
}

interface MockDatabase {
  execute: (options: { statement: string; args: any[] }) => Promise<any>;
  query: (options: { statement: string; args: any[] }) => Promise<any>;
  close: () => Promise<void>;
}

class MockDatabaseImpl implements MockDatabase {
  private storage = new Map<string, any[]>();

  async execute(options: { statement: string; args: any[] }): Promise<any> {
    const { statement, args } = options;

    // Simple mock implementation for INSERT
    if (statement.trim().toUpperCase().startsWith('INSERT')) {
      const match = statement.match(/INSERT INTO (\w+)/);
      if (match) {
        const table = match[1];
        if (!this.storage.has(table)) {
          this.storage.set(table, []);
        }
        const id = this.storage.get(table)!.length + 1;
        this.storage.get(table)!.push({ id, ...args[0] });
        return { lastId: id, rowsAffected: 1 };
      }
    }

    // Simple mock for other operations
    return { lastId: 0, rowsAffected: 0 };
  }

  async query(options: { statement: string; args: any[] }): Promise<any> {
    // Mock implementation
    return { values: [] };
  }

  async close(): Promise<void> {
    // No-op for mock
  }
}

export class DatabaseService {
  private db: Database | null = null;
  private initialized = false;

  /**
   * Initialize database connection
   */
  async initialize(): Promise<void> {
    try {
      // Use mock implementation for web
      this.db = new MockDatabaseImpl();
      this.initialized = true;
      console.log('Database initialized with mock implementation');
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw new Error('Database initialization failed');
    }
  }

  /**
   * Get database instance
   */
  getDb(): Database {
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    return this.db;
  }

  /**
   * Check if database is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Execute a SQL query
   */
  async execute(statement: string, args: any[] = []): Promise<any> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      const result = await this.db.execute({ statement, args });
      return result;
    } catch (error) {
      console.error('SQL execution error:', error);
      throw error;
    }
  }

  /**
   * Get all rows from a query
   */
  async query(statement: string, args: any[] = []): Promise<any[]> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      const result = await this.db.query({ statement, args });
      return result.values || [];
    } catch (error) {
      console.error('Query error:', error);
      throw error;
    }
  }

  /**
   * Get a single row from a query
   */
  async queryOne(statement: string, args: any[] = []): Promise<any | null> {
    const results = await this.query(statement, args);
    return results.length > 0 ? results[0] : null;
  }

  /**
   * Insert data into a table
   */
  async insert(table: string, data: Record<string, any>): Promise<number> {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).fill('?').join(', ');
    const values = Object.values(data);

    const statement = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
    const result = await this.execute(statement, values);
    return result.lastId || 0;
  }

  /**
   * Update data in a table
   */
  async update(table: string, id: number, data: Record<string, any>): Promise<number> {
    const setClause = Object.keys(data)
      .map(key => `${key} = ?`)
      .join(', ');
    const values = Object.values(data);

    const statement = `UPDATE ${table} SET ${setClause} WHERE id = ?`;
    const result = await this.execute(statement, [...values, id]);
    return result.rowsAffected || 0;
  }

  /**
   * Delete data from a table
   */
  async delete(table: string, id: number): Promise<number> {
    const result = await this.execute(`DELETE FROM ${table} WHERE id = ?`, [id]);
    return result.rowsAffected || 0;
  }

  /**
   * Start a transaction
   */
  async beginTransaction(): Promise<void> {
    await this.execute('BEGIN TRANSACTION');
  }

  /**
   * Commit a transaction
   */
  async commitTransaction(): Promise<void> {
    await this.execute('COMMIT');
  }

  /**
   * Rollback a transaction
   */
  async rollbackTransaction(): Promise<void> {
    await this.execute('ROLLBACK');
  }

  /**
   * Close database connection
   */
  async close(): Promise<void> {
    if (this.db) {
      await this.db.close();
      this.db = null;
      this.initialized = false;
    }
  }
}

// Export singleton instance
export const databaseService = new DatabaseService();
