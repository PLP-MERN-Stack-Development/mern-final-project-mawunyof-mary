const express = require('express');
const router = express.Router();

// Mock users for testing (in production, use database)
let users = [
  { id: 1, name: 'Demo User', email: 'demo@test.com', password: 'password123' }
];

// Register
router.post('/register', (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const userExists = users.find(u => u.email === email);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = { 
      id: users.length + 1, 
      name, 
      email, 
      password 
    };
    users.push(user);

    res.status(201).json({
      success: true,
      token: 'token-' + user.id,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      success: true,
      token: 'token-' + user.id,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get current user
router.get('/me', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const userId = token.split('-')[1];
    const user = users.find(u => u.id === parseInt(userId));

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
