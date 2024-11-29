const db = require('../database/db');
const { v4: uuidv4 } = require('uuid');

class UserModel {
  static async create(userData) {
    const id = uuidv4();
    await db.run(
      'INSERT INTO users (id, email, password, name) VALUES (?, ?, ?, ?)',
      [id, userData.email, userData.password, userData.name]
    );
    return { id, ...userData };
  }

  static async findByEmail(email) {
    return await db.get('SELECT * FROM users WHERE email = ?', [email]);
  }

  static async findById(id) {
    return await db.get('SELECT * FROM users WHERE id = ?', [id]);
  }
}

module.exports = UserModel;