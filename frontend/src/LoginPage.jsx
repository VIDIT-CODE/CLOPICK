import React, { useState } from 'react';
const LoginPage = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSendOtp = () => {
    setOtpSent(true);
    alert('OTP sent (simulated)');
  };

  const handleVerifyOtp = () => {
    if (otp === '123456') alert('Logged in (simulated)');
    else alert('Incorrect OTP');
  };

  return (
    <div className="bg-black text-white p-6 min-h-screen">
      <h1 className="text-2xl mb-4">Login/Register</h1>
      {!otpSent ? (
        <button className="bg-white text-black px-4 py-2" onClick={handleSendOtp}>
          Send OTP
        </button>
      ) : (
        <div>
          <input
            className="text-black p-2"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="bg-white text-black px-4 py-2 ml-2" onClick={handleVerifyOtp}>
            Verify
          </button>
        </div>
      )}
    </div>
  );
};
export default LoginPage;