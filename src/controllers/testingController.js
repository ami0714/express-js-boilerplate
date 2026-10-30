const {pool} = require('../config/database');



async function insertNewUser(req, res) {
  if (!req) {
    return res.status(400).json({ message: 'Request body is missing' });
    
  }
  const { name } = req.body;

  const [result] = await pool.execute(
    'INSERT INTO user (username) VALUES (?)',
    [name]
  );
return res.status(201).json({ id: result.insertId, name });
}

module.exports = { insertNewUser };