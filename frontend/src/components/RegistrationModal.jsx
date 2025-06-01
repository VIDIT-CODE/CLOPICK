import React, { useState, useEffect } from "react";
import "./RegistrationModal.css";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const API_BASE_URL = "http://localhost:3000"; // Change 5000 to 3000 to match backend

const RegistrationModal = ({ onClose, mode = "register" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    emailOtp: "",
    // mobile: "", // Remove mobile field for seller registration
  });
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Add these states for seller email OTP
  const [sellerEmailOtpSent, setSellerEmailOtpSent] = useState(false);
  const [sellerRegisterSuccess, setSellerRegisterSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendEmailOTP = async () => {
    if (!form.name || !form.email) {
      return setMessage("Please fill name and email first.");
    }
    try {
      setLoading(true);
      setMessage("");
      const res = await axios.post(`${API_BASE_URL}/api/auth/send-otp`, {
        name: form.name,
        email: form.email,
        type: "email",
      });
      // Only show success if backend actually sent the email
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

  // Seller email OTP handler
  const handleSendSellerEmailOTP = async () => {
    if (!form.name || !form.email) {
      return setMessage("Please fill name and email first.");
    }
    try {
      setLoading(true);
      setMessage("");
      const res = await axios.post(`${API_BASE_URL}/api/seller/send-otp`, {
        name: form.name,
        email: form.email,
      });
      if (res.data && res.data.message && res.data.message.toLowerCase().includes("otp sent")) {
        setSellerEmailOtpSent(true);
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

  const handleCustomerRegister = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }
    try {
      setLoading(true);
      setRegisterSuccess(false);
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        email: form.email,
        password: form.password,
        emailOtp: form.emailOtp,
      });
      setRegisterSuccess(true);
      setMessage("");
      // Automatically close modal after a short delay
      setTimeout(() => {
        onClose();
      }, 1200); // 1.2 seconds
    } catch (err) {
      setRegisterSuccess(false);
      // Log the full error for debugging
      console.error('Registration error:', err.response?.data || err);
      const backendMsg = err.response?.data?.message || "Registration failed";
      setMessage(backendMsg);
    } finally {
      setLoading(false);
    }
  };

  // Seller registration handler
  const handleSellerRegister = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }
    // Remove mobile validation
    try {
      setLoading(true);
      setSellerRegisterSuccess(false);
      const res = await axios.post(`${API_BASE_URL}/api/seller/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
        emailOtp: form.emailOtp,
        // Do not send mobile
      });
      setSellerRegisterSuccess(true);
      setMessage("");
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      setSellerRegisterSuccess(false);
      const backendMsg = err.response?.data?.message || "Registration failed";
      setMessage(backendMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.password || form.password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }
    try {
      setLoading(true);
      setLoginSuccess(false);
      await axios.post("/api/auth/login", {
        email: form.email,
        password: form.password,
      });
      setLoginSuccess(true);
      setMessage("");
      // Automatically close modal after a short delay
      setTimeout(() => {
        onClose();
      }, 1200); // 1.2 seconds
    } catch (err) {
      setLoginSuccess(false);
      setMessage(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Ensure form fields are reset for login/register mode
  useEffect(() => {
    if (mode === "login") {
      setForm({
        email: "",
        password: "",
      });
      setMessage("");
      setShowPassword(false);
    }
    if (mode === "register") {
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        emailOtp: "",
      });
      setMessage("");
      setShowPassword(false);
    }
  }, [mode]);

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.55)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "5vh",
        paddingBottom: "5vh",
      }}
    >
      <div
        className="modal-content"
        style={{
          background: "#fff",
          borderRadius: "18px",
          boxShadow: "0 8px 32px #232526, 0 2px 12px #232526",
          padding: "1.5rem 1.2rem 1.2rem 1.2rem",
          minWidth: "260px",
          maxWidth: "450px",
          width: "33vw",
          position: "relative",
          animation: "popup-fade-in 0.25s cubic-bezier(.4,2,.6,1)",
        }}
      >
        <button
          className="close-btn"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 14,
            background: "transparent",
            border: "none",
            color: "#232526",
            fontSize: "2rem",
            fontWeight: 700,
            cursor: "pointer",
            zIndex: 10,
            lineHeight: 1,
          }}
        >
          ×
        </button>
        {mode === "login" ? (
          <form
            className="registration-form"
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
          >
            <h2
              style={{
                color: "#232526",
                textAlign: "center",
                marginBottom: "1.5rem",
                fontWeight: 800,
                letterSpacing: "1px",
              }}
            >
              Login
            </h2>
            <div className="form-group">
              <label style={{ color: "#232526" }}>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={form.email || ""}
                onChange={handleChange}
                required
                style={{
                  padding: "0.7rem 1rem",
                  borderRadius: "8px",
                  border: "1.5px solid #ccc",
                  background: "#fff",
                  color: "#232526",
                  fontSize: "1.08rem",
                  outline: "none",
                  transition: "border 0.2s",
                }}
              />

              <label style={{ color: "#232526" }}>Password</label>
              <div className="password-wrapper" style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password || ""}
                  onChange={handleChange}
                  required
                  style={{
                    padding: "0.7rem 1rem",
                    borderRadius: "8px",
                    border: "1.5px solid #ccc",
                    background: "#fff",
                    color: "#232526",
                    fontSize: "1.08rem",
                    outline: "none",
                    transition: "border 0.2s",
                    width: "100%",
                  }}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="eye-icon"
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#232526",
                    cursor: "pointer",
                    fontSize: "1.15rem",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button
                type="submit"
                disabled={loading || loginSuccess}
                style={{
                  background: loginSuccess ? "#28a745" : "#232526",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.7rem 1rem",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  marginTop: "0.5rem",
                  cursor: loginSuccess ? "default" : "pointer",
                  boxShadow: "0 2px 8px #232526",
                  transition: "background 0.2s",
                }}
              >
                {loginSuccess ? "Login Successful" : loading ? "Please wait..." : "Login"}
              </button>
              {message && <p style={{ color: "red" }}>{message}</p>}
            </div>
          </form>
        ) : mode === "register" ? (
          <form
            className="registration-form"
            onSubmit={handleCustomerRegister}
            style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
          >
            <h2
              style={{
                color: "#232526",
                textAlign: "center",
                marginBottom: "1.5rem",
                fontWeight: 800,
                letterSpacing: "1px",
              }}
            >
              Customer Registration
            </h2>
            <div className="form-group">
              <label style={{ color: "#232526" }}>Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="First and last name"
                value={form.name}
                onChange={handleChange}
                required
                style={{
                  padding: "0.7rem 1rem",
                  borderRadius: "8px",
                  border: "1.5px solid #ccc",
                  background: "#fff",
                  color: "#232526",
                  fontSize: "1.08rem",
                  outline: "none",
                  transition: "border 0.2s",
                }}
              />

              <label style={{ color: "#232526" }}>Email</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={{
                    padding: "0.7rem 1rem",
                    borderRadius: "8px",
                    border: "1.5px solid #ccc",
                    background: "#fff",
                    color: "#232526",
                    fontSize: "1.08rem",
                    outline: "none",
                    transition: "border 0.2s",
                  }}
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
                style={{
                  padding: "0.7rem 1rem",
                  borderRadius: "8px",
                  border: "1.5px solid #ccc",
                  background: "#fff",
                  color: "#232526",
                  fontSize: "1.08rem",
                  outline: "none",
                  transition: "border 0.2s",
                }}
              />

              <label style={{ color: "#232526" }}>Password</label>
              <div className="password-wrapper" style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  style={{
                    padding: "0.7rem 1rem",
                    borderRadius: "8px",
                    border: "1.5px solid #ccc",
                    background: "#fff",
                    color: "#232526",
                    fontSize: "1.08rem",
                    outline: "none",
                    transition: "border 0.2s",
                    width: "100%",
                  }}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="eye-icon"
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#232526",
                    cursor: "pointer",
                    fontSize: "1.15rem",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <label style={{ color: "#232526" }}>Confirm Password</label>
              <div className="password-wrapper" style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  style={{
                    padding: "0.7rem 1rem",
                    borderRadius: "8px",
                    border: "1.5px solid #ccc",
                    background: "#fff",
                    color: "#232526",
                    fontSize: "1.08rem",
                    outline: "none",
                    transition: "border 0.2s",
                    width: "100%",
                  }}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="eye-icon"
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#232526",
                    cursor: "pointer",
                    fontSize: "1.15rem",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button
                type="submit"
                disabled={loading || registerSuccess}
                style={{
                  background: registerSuccess ? "#28a745" : "#232526",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.7rem 1rem",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  marginTop: "0.5rem",
                  cursor: registerSuccess ? "default" : "pointer",
                  boxShadow: "0 2px 8px #232526",
                  transition: "background 0.2s",
                }}
              >
                {registerSuccess ? "Registered Successfully" : loading ? "Please wait..." : "Register"}
              </button>
              {registerSuccess && (
                <p style={{ color: "#28a745", marginTop: "0.5rem", fontWeight: 600 }}>
                  Now, you can login with your credentials
                </p>
              )}
              {message && <p style={{ color: emailOtpSent ? "green" : "red" }}>{message}</p>}

              <p
                style={{
                  color: "#888",
                  fontSize: "0.95rem",
                  marginTop: "1rem",
                }}
              >
                By continuing, you agree to CLOPICK’s Conditions of Use and Privacy
                Notice.
              </p>
            </div>
          </form>
        ) : (
          mode === "seller-register" && (
            <form
              className="registration-form"
              onSubmit={handleSellerRegister}
              style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
            >
              <h2
                style={{
                  color: "#232526",
                  textAlign: "center",
                  marginBottom: "1.5rem",
                  fontWeight: 800,
                  letterSpacing: "1px",
                }}
              >
                Seller Registration
              </h2>
              <div className="form-group">
                <label style={{ color: "#232526" }}>Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="First and last name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  style={{
                    padding: "0.7rem 1rem",
                    borderRadius: "8px",
                    border: "1.5px solid #ccc",
                    background: "#fff",
                    color: "#232526",
                    fontSize: "1.08rem",
                    outline: "none",
                    transition: "border 0.2s",
                  }}
                />

                {/* Remove mobile field from seller registration */}

                <label style={{ color: "#232526" }}>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={{
                    padding: "0.7rem 1rem",
                    borderRadius: "8px",
                    border: "1.5px solid #ccc",
                    background: "#fff",
                    color: "#232526",
                    fontSize: "1.08rem",
                    outline: "none",
                    transition: "border 0.2s",
                  }}
                />
                <button
                  type="button"
                  onClick={handleSendSellerEmailOTP}
                  disabled={loading || sellerEmailOtpSent}
                  style={{
                    background: sellerEmailOtpSent ? "#888" : "#232526",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "0.7rem 1rem",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    cursor: sellerEmailOtpSent ? "not-allowed" : "pointer",
                    boxShadow: "0 2px 8px #232526",
                    marginTop: "0.5rem",
                  }}
                >
                  {sellerEmailOtpSent ? "OTP Sent" : "Send Email OTP"}
                </button>
                <input
                  type="text"
                  name="emailOtp"
                  placeholder="Enter Email OTP"
                  value={form.emailOtp}
                  onChange={handleChange}
                  required
                  style={{
                    padding: "0.7rem 1rem",
                    borderRadius: "8px",
                    border: "1.5px solid #ccc",
                    background: "#fff",
                    color: "#232526",
                    fontSize: "1.08rem",
                    outline: "none",
                    transition: "border 0.2s",
                  }}
                />

                <label style={{ color: "#232526" }}>Password</label>
                <div className="password-wrapper" style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    style={{
                      padding: "0.7rem 1rem",
                      borderRadius: "8px",
                      border: "1.5px solid #ccc",
                      background: "#fff",
                      color: "#232526",
                      fontSize: "1.08rem",
                      outline: "none",
                      transition: "border 0.2s",
                      width: "100%",
                    }}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="eye-icon"
                    style={{
                      position: "absolute",
                      right: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#232526",
                      cursor: "pointer",
                      fontSize: "1.15rem",
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <label style={{ color: "#232526" }}>Confirm Password</label>
                <div className="password-wrapper" style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    style={{
                      padding: "0.7rem 1rem",
                      borderRadius: "8px",
                      border: "1.5px solid #ccc",
                      background: "#fff",
                      color: "#232526",
                      fontSize: "1.08rem",
                      outline: "none",
                      transition: "border 0.2s",
                      width: "100%",
                    }}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="eye-icon"
                    style={{
                      position: "absolute",
                      right: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#232526",
                      cursor: "pointer",
                      fontSize: "1.15rem",
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading || sellerRegisterSuccess}
                  style={{
                    background: sellerRegisterSuccess ? "#28a745" : "#232526",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "0.7rem 1rem",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    marginTop: "0.5rem",
                    cursor: sellerRegisterSuccess ? "default" : "pointer",
                    boxShadow: "0 2px 8px #232526",
                    transition: "background 0.2s",
                  }}
                >
                  {sellerRegisterSuccess ? "Registered Successfully" : loading ? "Please wait..." : "Register"}
                </button>
                {sellerRegisterSuccess && (
                  <p style={{ color: "#28a745", marginTop: "0.5rem", fontWeight: 600 }}>
                    Now, you can login with your credentials
                  </p>
                )}
                {message && <p style={{ color: sellerEmailOtpSent ? "green" : "red" }}>{message}</p>}
                <p
                  style={{
                    color: "#888",
                    fontSize: "0.95rem",
                    marginTop: "1rem",
                  }}
                >
                  By continuing, you agree to CLOPICK’s Conditions of Use and Privacy
                  Notice.
                </p>
              </div>
            </form>
          )
        )}
      </div>
      <style>
        {`
        @keyframes popup-fade-in {
          from { transform: scale(0.92) translateY(30px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
        `}
      </style>
    </div>
  );
};

export default RegistrationModal;

// Yes, this file contains registration modal logic for both customer and seller.
// It handles three modes: "login", "register" (customer), and "seller-register" (seller).
// The seller registration form is rendered when mode === "seller-register".
