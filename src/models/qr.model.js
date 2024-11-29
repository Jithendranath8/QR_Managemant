const db = require('../database/db');
const { v4: uuidv4 } = require('uuid');

class QRModel {
  static async create(qrData) {
    const id = uuidv4();
    await db.run(
      'INSERT INTO qr_codes (id, type, current_url, metadata, user_id) VALUES (?, ?, ?, ?, ?)',
      [id, qrData.type, qrData.currentUrl, qrData.metadata, qrData.userId]
    );
    return { id, ...qrData };
  }

  static async findById(id) {
    return await db.get('SELECT * FROM qr_codes WHERE id = ?', [id]);
  }

  static async findByUser(userId) {
    return await db.all('SELECT * FROM qr_codes WHERE user_id = ?', [userId]);
  }

  static async update(id, url) {
    return await db.run(
      'UPDATE qr_codes SET current_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [url, id]
    );
  }

  static async addToHistory(qrCodeId, url) {
    const id = uuidv4();
    return await db.run(
      'INSERT INTO url_history (id, qr_code_id, url) VALUES (?, ?, ?)',
      [id, qrCodeId, url]
    );
  }
}

module.exports = QRModel;