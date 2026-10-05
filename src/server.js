require('dotenv').config();

const app = require('./app');
const { connectDatabase, pool } = require('./config/database');

const requiredEnvironmentVariables = [
  'DB_CONNECTION',
  'DB_HOST',
  'DB_DATABASE',
  'DB_USERNAME',
  'JWT_SECRET',
];
const missingVariables = requiredEnvironmentVariables.filter(
  (name) => !process.env[name]
);

if (missingVariables.length > 0) {
  throw new Error(`Missing environment variables: ${missingVariables.join(', ')}`);
}

if (process.env.DB_CONNECTION !== 'mysql') {
  throw new Error('DB_CONNECTION must be set to mysql');
}

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exitCode = 1;
    await pool.end();
  }
}

startServer();