console.log('authController loaded');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || password.length < 6) {
      return res.status(400).json({ error: 'Valid email and password (min 6 chars) required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user._id, email: user.email }
    });

  } catch (err) {
    console.error('REGISTER ERROR:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('--- LOGIN ATTEMPT ---');
    console.log('Email received:', email);
    console.log('Password received:', password);

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    console.log('User found in DB:', user ? 'YES' : 'NO');

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    console.log('Stored hash:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log('Token generated:', !!token);
    console.log('--- LOGIN SUCCESS ---');

    res.json({
      token,
      user: { id: user._id, email: user.email }
    });

  } catch (err) {
    console.error('LOGIN ERROR:', err);
    res.status(500).json({ error: 'Server error' });
  }
};