const express = require('express');
const cors = require('cors');
const bugRoutes = require('./routes/bugRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/bugs', bugRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'UP' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

module.exports = app;
