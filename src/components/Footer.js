import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import "./Footer.css"; // ⬅️ We'll add this next

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Column 1: Branding */}
        <div className="footer-column">
          <h2 className="footer-logo">Clopick</h2>
          <p>Your go-to destination for trendy men's fashion delivered fast.</p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Shop</Link></li>
            <li><Link to="/seller-auth">Sell With Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div className="footer-column">
          <h3>Categories</h3>
          <ul>
            <li>Shirts</li>
            <li>T-Shirts</li>
            <li>Jeans</li>
            <li>Footwear</li>
          </ul>
        </div>

        {/* Column 4: Contact & Social */}
        <div className="footer-column">
          <h3>Connect</h3>
          <div className="footer-social">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaFacebookF /></a>
          </div>
          <p>Email: support@clopick.com</p>
          <p>Phone: +91-9876543210</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Clopick. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
