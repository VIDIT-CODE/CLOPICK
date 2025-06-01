const express = require('express');
const Seller = require('../models/Seller');
const jwt = require('jsonwebtoken');
const router = express.Router();
const sendEmailOtp = require('../utils/sendEmailOtp');
const { generateOtp } = require('../utils/otp');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Temporary OTP store (in-memory)
const otpStore = {};

// STEP 1: Send OTP to Seller Email
// This is the backend route for http://localhost:3000/api/seller/send-otp
router.post('/send-otp', async (req, res) => {
  const { name, email } = req.body;

  // Debug log to see what is being sent from frontend
  console.log('Received /api/seller/send-otp:', req.body);

  // Only check for name and email, not mobile
  if (!name || !email) {
    // Log the error reason for easier debugging
    console.error('❌ Missing name or email in request body:', req.body);
    return res.status(400).json({ message: 'Name and email are required' });
  }

  try {
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: 'Seller already exists' });
    }

    const otp = generateOtp();
    otpStore[email] = { name, emailOtp: otp, createdAt: Date.now() };

    await sendEmailOtp(email, otp);
    return res.json({ message: 'OTP sent to your email address.' });
  } catch (err) {
    console.error('❌ Error sending OTP:', err.message);
    res.status(500).json({ message: 'Failed to send email OTP', error: err.message });
  }
});

// STEP 2: Register seller with OTP verification
router.post('/register', async (req, res) => {
  // Accept name from req.body for flexibility
  const { name, email, password, emailOtp } = req.body;
  const data = otpStore[email];

  if (!data) {
    return res.status(400).json({ message: 'No OTP found or expired' });
  }

  if (data.emailOtp !== emailOtp) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  try {
    // Use name from req.body if provided, else fallback to OTP store
    const newSeller = await Seller.create({
      name: name || data.name,
      email,
      password,
    });

    delete otpStore[email]; // Clear OTP after use

    const token = jwt.sign({ id: newSeller._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ message: 'Seller registered', seller: newSeller, token });
  } catch (err) {
    console.error('Seller registration error:', err);
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res.status(400).json({ message: 'Email already registered.' });
    }
    res.status(500).json({ message: 'Registration failed', error: err.message, stack: err.stack });
  }
});

// STEP 3: Login seller
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(404).json({ message: 'Seller not found' });

    const isMatch = await seller.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: seller._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ message: 'Login successful', seller, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
