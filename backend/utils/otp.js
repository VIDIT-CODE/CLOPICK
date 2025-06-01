const crypto = require('crypto');

// This OTP generator is secure and correct for generating numeric OTPs.
// No changes needed.

function generateOtp(length = 6) {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return crypto.randomInt(min, max + 1).toString();
}

module.exports = { generateOtp };
