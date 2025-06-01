const express = require('express');
const router = express.Router();
const sendEmailOtp = require('../utils/sendEmailOtp');

const otpStore = {}; // Temp store in-memory (use Redis in production)

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

router.post('/send-otp', async (req, res) => {
  const { email } = req.body; // Only email
  const otp = generateOtp();

  otpStore[email] = otp;

  try {
    await sendEmailOtp(email, otp);
    res.json({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'OTP sending failed' });
  }
});

router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body; // Only email and otp

  if (otpStore[email] === otp) {
    delete otpStore[email];
    res.json({ success: true, message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
});

// This file is correct for email OTP only.
// No changes needed if you only want to send and verify OTP via email.

module.exports = router;
