const db = require('../database/db');
const { v4: uuidv4 } = require('uuid');

class EventModel {
  static async create(eventData) {
    const id = uuidv4();
    await db.run(
      `INSERT INTO events (id, qr_code_id, location, device, browser, ip_address, metadata)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        eventData.qrCodeId,
        eventData.location,
        eventData.device,
        eventData.browser,
        eventData.ipAddress,
        eventData.metadata
      ]
    );
    return { id, ...eventData };
  }

  static async findByQRCode(qrCodeId) {
    return await db.all(
      'SELECT * FROM events WHERE qr_code_id = ? ORDER BY timestamp DESC',
      [qrCodeId]
    );
  }

  static async getAnalytics(qrCodeId, startDate, endDate) {
    const dateFilter = startDate && endDate 
      ? 'AND timestamp BETWEEN ? AND ?' 
      : '';
    const params = startDate && endDate 
      ? [qrCodeId, startDate, endDate]
      : [qrCodeId];

    const totalScans = await db.get(
      `SELECT COUNT(*) as total FROM events WHERE qr_code_id = ? ${dateFilter}`,
      params
    );

    const uniqueUsers = await db.get(
      `SELECT COUNT(DISTINCT ip_address) as total FROM events WHERE qr_code_id = ? ${dateFilter}`,
      params
    );

    const deviceDistribution = await db.all(
      `SELECT device, COUNT(*) as count FROM events 
       WHERE qr_code_id = ? ${dateFilter} GROUP BY device`,
      params
    );

    const geoDistribution = await db.all(
      `SELECT location, COUNT(*) as count FROM events 
       WHERE qr_code_id = ? ${dateFilter} GROUP BY location`,
      params
    );

    return {
      totalScans: totalScans.total,
      uniqueUsers: uniqueUsers.total,
      deviceDistribution,
      geographicDistribution: geoDistribution
    };
  }
}

module.exports = EventModel;