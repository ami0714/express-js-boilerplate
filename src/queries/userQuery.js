const { pool } = require('../config/database');

async function findAll() {
  const [rows] = await pool.execute(
    'SELECT * FROM users ORDER BY id'
  );
  return rows;
}

async function findById(id) {
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE id = ?',
    [id]
  );
  return rows[0] || null;
}

module.exports = { findAll, findById };