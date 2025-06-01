const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const jwt = require('jsonwebtoken');
const sendEmailOtp = require('../utils/sendEmailOtp');
const { generateOtp } = require('../utils/otp');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Temporary OTP store (in-memory)
const otpStore = {};

// STEP 1: Send OTPs to Email
router.post('/send-otp', async (req, res) => {
  const { name, email, type } = req.body;

  // Only require name and email, type is optional for flexibility
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const existingCustomer = await Customer.findOne({ email });
  if (existingCustomer) {
    return res.status(400).json({ message: 'Customer already exists' });
  }

  // Generate OTP
  const otp = generateOtp();

  // Store OTPs temporarily
  otpStore[email] = { name, emailOtp: otp, createdAt: Date.now() };

  try {
    await sendEmailOtp(email, otp);
    return res.json({ message: 'OTP sent to your email address.' });
  } catch (err) {
    console.error('❌ Error sending OTP:', err.message);
    res.status(500).json({ message: 'Failed to send email OTP', error: err.message });
  }
});


// STEP 2: Register customer with OTP verification
router.post('/register', async (req, res) => {
  const { email, password, emailOtp } = req.body;
  const data = otpStore[email];

  if (!data) {
    return res.status(400).json({ message: 'No OTP found or expired' });
  }

  if (data.emailOtp !== emailOtp) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  try {
    const newCustomer = await Customer.create({
      name: data.name,
      email,
      password,
    });

    delete otpStore[email]; // Clear OTP after use

    const token = jwt.sign({ id: newCustomer._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ message: 'Customer registered', customer: newCustomer, token });
  } catch (err) {
    console.error('Customer registration error:', err);
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      // Duplicate email error
      return res.status(400).json({ message: 'Email already registered.' });
    }
    res.status(500).json({ message: 'Registration failed', error: err.message, stack: err.stack });
  }
});

// STEP 3: Login customer
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ email });
    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    const isMatch = await customer.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: customer._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ message: 'Login successful', customer, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
