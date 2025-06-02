import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SellerAuthModal = ({ onClose, onSellerLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    businessName: "",
    email: "",
    password: "",
    emailOtp: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [sellerInfo, setSellerInfo] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      const res = await axios.post("/api/seller/login", {
        email: form.email,
        password: form.password,
      });
      setLoginSuccess(true);
      setMessage("");
      setSellerInfo(res.data.seller);
      setTimeout(() => {
        if (onSellerLogin) onSellerLogin();
        onClose(); // Close the modal after successful login
        // Use replace:true to avoid back navigation to modal
        navigate("/seller/dashboard", { state: { seller: res.data.seller }, replace: true });
      }, 1200);
    } catch (err) {
      setLoginSuccess(false);
      setMessage(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmailOTP = async () => {
    if (!form.businessName || !form.email) {
      return setMessage("Please fill business name and email first.");
    }
    try {
      setLoading(true);
      setMessage("");
      // Debug: log what is being sent
      console.log("Sending to backend:", {
        name: form.businessName,
        email: form.email,
      });
      const res = await axios.post(
        "http://localhost:3000/api/seller/send-otp",
        {
          name: form.businessName,
          email: form.email,
        }
      );
      if (
        res.data &&
        res.data.message &&
        res.data.message.toLowerCase().includes("otp sent")
      ) {
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

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }
    try {
      setLoading(true);
      setRegisterSuccess(false);
      // Only send required fields for backend
      const res = await axios.post("http://localhost:3000/api/seller/register", {
        name: form.businessName,
        email: form.email,
        password: form.password,
        emailOtp: form.emailOtp
      });
      setRegisterSuccess(true);
      setMessage("");
      setTimeout(() => {
        setShowRegister(false);
      }, 1200);
    } catch (err) {
      setRegisterSuccess(false);
      // Show backend error message if available
      setMessage(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setSellerInfo(null);
    setLoginSuccess(false);
    setRegisterSuccess(false);
    setShowRegister(false);
    setForm({
      businessName: "",
      email: "",
      password: "",
      emailOtp: "",
    });
    if (onSellerLogin) onSellerLogin(false);
  };

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
        {!showRegister ? (
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
              Seller Login
            </h2>
            <div className="form-group">
              <label style={{ color: "#232526" }}>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="example@seller.com"
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
                {loginSuccess
                  ? "Login Successful"
                  : loading
                  ? "Please wait..."
                  : "Login"}
              </button>
              {message && <p style={{ color: "red" }}>{message}</p>}
              <p
                style={{
                  color: "#888",
                  fontSize: "0.95rem",
                  marginTop: "1rem",
                }}
              >
                New to CLOPICK Seller?{" "}
                <span
                  style={{
                    color: "#00b894",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                  onClick={() => setShowRegister(true)}
                >
                  Register here
                </span>
              </p>
            </div>
          </form>
        ) : (
          <form
            className="registration-form"
            onSubmit={handleRegister}
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
              <label style={{ color: "#232526" }}>Business Name</label>
              <input
                type="text"
                name="businessName"
                placeholder="Business Name"
                value={form.businessName}
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
              <label style={{ color: "#232526" }}>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="example@seller.com"
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
                  marginTop: "0.5rem",
                }}
              >
                {emailOtpSent ? "OTP Sent" : "Send Email OTP"}
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
                  placeholder="Create a password"
                  minLength={6}
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
                {registerSuccess
                  ? "Registered Successfully"
                  : loading
                  ? "Please wait..."
                  : "Register"}
              </button>
              {registerSuccess && (
                <p
                  style={{
                    color: "#28a745",
                    marginTop: "0.5rem",
                    fontWeight: 600,
                  }}
                >
                  Now, you can login with your credentials
                </p>
              )}
              {message && (
                <p style={{ color: emailOtpSent ? "green" : "red" }}>
                  {message}
                </p>
              )}
              <p
                style={{
                  color: "#888",
                  fontSize: "0.95rem",
                  marginTop: "1rem",
                }}
              >
                Already a seller?{" "}
                <span
                  style={{
                    color: "#00b894",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                  onClick={() => setShowRegister(false)}
                >
                  Login here
                </span>
              </p>
            </div>
          </form>
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

export default SellerAuthModal;
