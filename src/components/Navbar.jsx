import React, { useState, useEffect } from "react";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "./CLOPICK-logo.png";
import "./Navbar.css";
import RegistrationModal from "./RegistrationModal";
import SellerAuthModal from "./SellerAuthModal"; // ADD THIS LINE

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("register");
  const [showSellerModal, setShowSellerModal] = useState(false); // ADD THIS LINE
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Lock background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showModal || showSellerModal ? "hidden" : "auto";
  }, [showModal, showSellerModal]);

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <>
      <nav
        style={{
          width: "100%",
          background: "linear-gradient(90deg, #232526 0%, #414345 100%)",
          color: "#fff",
          padding: "0.7rem 0",
          boxShadow: "0 2px 16px rgba(44,62,80,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
          position: "sticky",
          top: 0,
          zIndex: 100,
          borderBottom: "2px solid #fff",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1800px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 2vw",
            gap: "2.5rem",
          }}
        >
          {/* Logo on extreme left */}
          <div style={{ flexShrink: 0 }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                marginLeft: 0,
              }}
            >
              <img
                src={logo}
                alt="CLOPICK Logo"
                className="logo"
                style={{
                  height: "42px",
                  width: "auto",
                  display: "block",
                  background: "#fff",
                  borderRadius: "8px",
                  padding: "4px 8px",
                  filter: "none",
                }}
              />
            </Link>
          </div>
          {/* Sections - always in one line, centered */}
          <div
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
              minWidth: 0,
              whiteSpace: "nowrap",
              flexWrap: "nowrap",
            }}
          >
            <Link
              to="/"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "1.08rem",
                whiteSpace: "nowrap",
              }}
            >
              Home
            </Link>
            <Link
              to="/category/shirts"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "1.08rem",
                whiteSpace: "nowrap",
              }}
            >
              Shirts
            </Link>
            <Link
              to="/category/tshirts"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "1.08rem",
                whiteSpace: "nowrap",
              }}
            >
              T-Shirts
            </Link>
            <Link
              to="/category/jeans"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "1.08rem",
                whiteSpace: "nowrap",
              }}
            >
              Jeans
            </Link>
            <Link
              to="/category/jackets"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "1.08rem",
                whiteSpace: "nowrap",
              }}
            >
              Jackets
            </Link>
            <Link
              to="/category/hoodies"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "1.08rem",
                whiteSpace: "nowrap",
              }}
            >
              Hoodies
            </Link>
            <Link
              to="/category/cargos"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "1.08rem",
                whiteSpace: "nowrap",
              }}
            >
              Cargos
            </Link>
            <Link
              to="/category/ethnic"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "1.08rem",
                whiteSpace: "nowrap",
              }}
            >
              Ethnic Wear
            </Link>
            <Link
              to="/category/footwear"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "1.08rem",
                whiteSpace: "nowrap",
              }}
            >
              Footwear
            </Link>
          </div>
          {/* Right side: Cart, Register, Login, Sell */}
          <div
            style={{
              display: "flex",
              gap: "2.5rem",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <Link
              to="/cart"
              style={{
                color: "#111",
                background: "#00fff7",
                borderRadius: "6px",
                padding: "0.4rem 1.1rem",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "1.08rem",
                boxShadow: "0 2px 8px #00fff7, 0 2px 8px rgba(96,165,250,0.10)",
                textShadow: "0 0 8px #fff",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                role="img"
                aria-label="cart"
                style={{ marginRight: "0.3rem" }}
              >
                🛒
              </span>
              Cart
            </Link>
            {/* Register and Login buttons */}
            <button
              onClick={() => {
                setModalMode("register");
                setShowModal(true);
              }}
              style={{
                color: "#111",
                background: "#00fff7",
                borderRadius: "6px",
                padding: "0.4rem 1.1rem",
                fontWeight: 700,
                fontSize: "1.08rem",
                cursor: "pointer",
                marginRight: "0.5rem",
                border: "none",
                boxShadow: "0 2px 8px #00fff7, 0 2px 8px rgba(96,165,250,0.10)",
                textShadow: "0 0 8px #fff",
              }}
            >
              Register
            </button>
            <button
              onClick={() => {
                setModalMode("login");
                setShowModal(true);
              }}
              style={{
                color: "#111",
                background: "#00fff7",
                borderRadius: "6px",
                padding: "0.4rem 1.1rem",
                fontWeight: 700,
                fontSize: "1.08rem",
                cursor: "pointer",
                boxShadow: "0 2px 8px #00fff7, 0 2px 8px rgba(96,165,250,0.10)",
                textShadow: "0 0 8px #fff",
                border: "none",
              }}
            >
              Login
            </button>
            <button
              onClick={() => {
                setShowSellerModal(true);
              }}
              style={{
                color: "#111",
                background: "#00fff7",
                borderRadius: "6px",
                padding: "0.4rem 1.1rem",
                fontWeight: 700,
                fontSize: "1.08rem",
                cursor: "pointer",
                boxShadow: "0 2px 8px #00fff7, 0 2px 8px rgba(96,165,250,0.10)",
                textShadow: "0 0 8px #fff",
                border: "none",
              }}
            >
              Sell
            </button>
          </div>
        </div>
      </nav>
      {showModal && (
        <RegistrationModal
          onClose={() => setShowModal(false)}
          mode={modalMode}
        />
      )}
      {showSellerModal && (
        <SellerAuthModal
          onClose={() => setShowSellerModal(false)}
        />
      )}
    </>
  );
};

export default Navbar;
