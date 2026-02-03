import { Database, open as openDatabase } from '@capacitor-sqlite/core';

/**
 * Database Service for SQLite operations
 * Provides centralized database access with schema management
 */
export class DatabaseService {
  private db: Database | null = null;
  private initialized = false;

  /**
   * Initialize database connection
   */
  async initialize(): Promise<void> {
    try {
      this.db = await openDatabase({
        database: 'socialapp.db'
      });
      await this.createTables();
      this.initialized = true;
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
   * Create database tables if they don't exist
   */
  private async createTables(): Promise<void> {
    if (!this.db) return;

    const queries = [
      // Users table
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL,
        display_name TEXT,
        avatar_url TEXT,
        bio TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,

      // Sessions table
      `CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        token TEXT UNIQUE NOT NULL,
        expires_at DATETIME NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )`,

      // Posts table
      `CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        content TEXT,
        image_url TEXT,
        likes_count INTEGER DEFAULT 0,
        comments_count INTEGER DEFAULT 0,
        is_public BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )`,

      // Likes table
      `CREATE TABLE IF NOT EXISTS likes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        post_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, post_id),
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
      )`,

      // Settings table
      `CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        key TEXT NOT NULL,
        value TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, key),
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )`,

      // Sync queue table
      `CREATE TABLE IF NOT EXISTS sync_queue (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        operation TEXT NOT NULL,
        data TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        processed_at DATETIME,
        error_message TEXT,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )`,

      // Create indexes for better performance
      `CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`,
      `CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)`,
      `CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id)`,
      `CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at)`,
      `CREATE INDEX IF NOT EXISTS idx_likes_user_post ON likes(user_id, post_id)`,
      `CREATE INDEX IF NOT EXISTS idx_sync_queue_status ON sync_queue(status)`,
      `CREATE INDEX IF NOT EXISTS idx_sync_queue_user ON sync_queue(user_id)`
    ];

    for (const query of queries) {
      try {
        await this.db.execute({
          statement: query,
          args: []
        });
      } catch (error) {
        console.error('Failed to create table:', error);
        throw error;
      }
    }
  }

  /**
   * Execute a SQL query
   */
  async execute(statement: string, args: any[] = []): Promise<any> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      const result = await this.db.execute({
        statement,
        args
      });
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
      const result = await this.db.query({
        statement,
        args
      });
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