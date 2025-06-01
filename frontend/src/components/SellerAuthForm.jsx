import React, { useState } from 'react';
import axios from 'axios';

const SellerAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '', emailOtp: '', mobile: '' });
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendEmailOTP = async () => {
    if (!form.name || !form.email) {
      setMessage("Please fill name and email first.");
      return;
    }
    try {
      setLoading(true);
      setMessage('');
      // Use relative URL so proxy or correct backend port is used automatically
      const res = await axios.post("/api/seller/send-otp", {
        name: form.name,
        email: form.email,
      });
      if (res.data && res.data.message && res.data.message.toLowerCase().includes("otp sent")) {
        setEmailOtpSent(true);
        setMessage("OTP sent to your email address.");
      } else {
        setMessage(res.data?.message || "Failed to send email OTP");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send email OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? '/api/seller/login' : '/api/seller/register';
    try {
      setLoading(true);
      setRegisterSuccess(false);
      let payload = { email: form.email, password: form.password };
      if (!isLogin) {
        // Ensure you send a mobile field if your backend requires it, even if empty
        payload = { ...payload, name: form.name, emailOtp: form.emailOtp, mobile: form.mobile || "" };
      }
      const { data } = await axios.post(url, payload);
      localStorage.setItem('sellerToken', data.token);
      if (isLogin) {
        alert('Login successful');
      } else {
        setRegisterSuccess(true);
        setMessage('');
        setTimeout(() => {
          setIsLogin(true);
        }, 1200);
      }
    } catch (err) {
      setRegisterSuccess(false);
      // Show backend error message if available
      setMessage(err.response?.data?.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Seller Login' : 'Register as Seller'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile"
              value={form.mobile}
              onChange={handleChange}
              required
            />
            <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={handleSendEmailOTP}
                disabled={loading || emailOtpSent}
                style={{
                  background: emailOtpSent ? "#888" : "#232526",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.7rem 1rem",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  cursor: emailOtpSent ? "not-allowed" : "pointer",
                  boxShadow: "0 2px 8px #232526",
                }}
              >
                {emailOtpSent ? "OTP Sent" : "Send Email OTP"}
              </button>
            </div>
            <input
              type="text"
              name="emailOtp"
              placeholder="Enter Email OTP"
              value={form.emailOtp}
              onChange={handleChange}
              required
            />
          </>
        )}
        {isLogin && (
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading || registerSuccess}>
          {isLogin
            ? loading
              ? "Please wait..."
              : "Login"
            : registerSuccess
              ? "Registered Successfully"
              : loading
                ? "Please wait..."
                : "Register"}
        </button>
        {!isLogin && registerSuccess && (
          <p style={{ color: "#28a745", marginTop: "0.5rem", fontWeight: 600 }}>
            Now, you can login with your credentials
          </p>
        )}
        {message && <p style={{ color: emailOtpSent ? "green" : "red" }}>{message}</p>}
      </form>
      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer' }}>
        {isLogin ? 'New seller? Register here' : 'Already registered? Login'}
      </p>
    </div>
  );
};

export default SellerAuthForm;
