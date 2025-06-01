const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmailOtp = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your CLOPICK Email OTP',
    text: `Your OTP for CLOPICK registration is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email OTP sent to ${email}: ${otp}`);
  } catch (err) {
    console.error(`Failed to send email OTP: ${err.message}`);
    if (err.response) {
      console.error('SMTP response:', err.response);
    }
    if (err.code === 'EAUTH') {
      console.error('Gmail authentication failed. Use an App Password for EMAIL_PASS. See https://support.google.com/accounts/answer/185833?hl=en');
    }
    // For development, log the OTP so you can still test
    console.log(`[DEV] Email OTP for ${email}: ${otp}`);
    // Optionally, rethrow or handle as needed
    // throw err;
  }
};

module.exports = sendEmailOtp;
