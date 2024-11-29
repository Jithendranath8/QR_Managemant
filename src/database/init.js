const db = require('./db');

async function initDatabase() {
  try {
    // Create users table
    await db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create qr_codes table
    await db.run(`
      CREATE TABLE IF NOT EXISTS qr_codes (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        current_url TEXT NOT NULL,
        metadata TEXT,
        user_id TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Create events table
    await db.run(`
      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        qr_code_id TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        location TEXT,
        device TEXT,
        browser TEXT,
        ip_address TEXT,
        metadata TEXT,
        FOREIGN KEY (qr_code_id) REFERENCES qr_codes(id)
      )
    `);

    // Create url_history table
    await db.run(`
      CREATE TABLE IF NOT EXISTS url_history (
        id TEXT PRIMARY KEY,
        qr_code_id TEXT NOT NULL,
        url TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (qr_code_id) REFERENCES qr_codes(id)
      )
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDatabase();