const express = require('express');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
      if (err) return res.status(500).json({ message: 'Login after registration failed' });
      res.status(201).json({ message: 'Registered and logged in', user: registeredUser });
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});


router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Logged in successfully', user: req.user });
});


router.post('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.json({ message: 'Logged out' });
  });
});


router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

module.exports = router;
