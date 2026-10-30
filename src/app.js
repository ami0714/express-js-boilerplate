require('dotenv').config();

const express = require('express');
const routes = require('./routes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});
app.use(errorMiddleware);

module.exports = app;