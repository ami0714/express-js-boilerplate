const {pool} = require('../config/database');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');

async function registerUser(req, res) {
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is missing' });
  }
const { username, password} = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  if(password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }
  const Hashpassword = await bycrypt.hash(password, 10);
  const [result] = await pool.execute(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, Hashpassword]
  );
  return res.status(201).json({ id: result.insertId, username });

}

async function loginUser(req, res) {
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is missing' });
  }

  const { username, password} = req.body;
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );

    if (rows.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = rows[0];
    const isPasswordValid = await bycrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return res.json({ token });

}
module.exports = { registerUser, loginUser };