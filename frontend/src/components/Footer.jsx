import React from "react";

const Footer = () => (
  <footer
    style={{
      width: "100%",
      background: "linear-gradient(90deg, #18191a 0%, #232526 100%)",
      color: "#fff",
      padding: "2.5rem 0 1.2rem 0",
      marginTop: "2rem",
      boxShadow: "0 -2px 24px rgba(44,62,80,0.13)",
      borderTopLeftRadius: "18px",
      borderTopRightRadius: "18px",
      fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
      borderTop: "2px solid #00fff7",
      position: "relative",
      overflow: "hidden"
    }}
  >
    {/* Neon glow effect */}
    <div
      style={{
        position: "absolute",
        top: 0, left: 0, right: 0, height: "8px",
        background: "linear-gradient(90deg, #00fff7 0%, #232526 100%)",
        filter: "blur(8px)",
        opacity: 0.5,
        zIndex: 1
      }}
    />
    <div
      style={{
        maxWidth: "1300px",
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "0 2vw",
        gap: "2.5rem",
        position: "relative",
        zIndex: 2
      }}
    >
      <div style={{ flex: 1, minWidth: "220px" }}>
        <h2 style={{
          margin: 0,
          fontWeight: 900,
          fontSize: "2.1rem",
          letterSpacing: "2px",
          color: "#00fff7",
          textShadow: "0 2px 12px #00fff7, 0 2px 8px #232526"
        }}>
          CLOPICK
        </h2>
        <p style={{
          margin: "0.7rem 0 0 0",
          color: "#e0e7ef",
          fontSize: "1.08rem",
          lineHeight: 1.6
        }}>
          Your destination for the latest and trendiest men's fashion. <br />
          <span style={{ color: "#a5b4fc" }}>Style. Comfort. Confidence.</span>
        </p>
      </div>
      <div style={{
        flex: 1,
        minWidth: "180px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <h4 style={{
          margin: "0 0 0.7rem 0",
          fontWeight: 700,
          color: "#00fff7",
          letterSpacing: "1px"
        }}>Quick Links</h4>
        <div style={{ display: "flex", gap: "1.2rem" }}>
          <a href="/" style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "1.08rem",
            transition: "color 0.2s"
          }}>Home</a>
          <a href="/cart" style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "1.08rem",
            transition: "color 0.2s"
          }}>Cart</a>
          <a href="/seller-auth" style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "1.08rem",
            transition: "color 0.2s"
          }}>Sell</a>
        </div>
      </div>
      <div style={{
        flex: 1,
        minWidth: "220px",
        textAlign: "right",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end"
      }}>
        <h4 style={{
          margin: "0 0 0.7rem 0",
          fontWeight: 700,
          color: "#00fff7",
          letterSpacing: "1px"
        }}>Contact</h4>
        <p style={{
          margin: 0,
          color: "#e0e7ef",
          fontSize: "1.08rem",
          lineHeight: 1.6
        }}>
          support@clopick.com<br />
          +91 98765 43210
        </p>
        <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" style={{
              width: 28,
              filter: "invert(1) drop-shadow(0 0 8px #00fff7)",
              transition: "transform 0.2s"
            }} />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook" style={{
              width: 28,
              filter: "invert(1) drop-shadow(0 0 8px #00fff7)",
              transition: "transform 0.2s"
            }} />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg" alt="Twitter" style={{
              width: 28,
              filter: "invert(1) drop-shadow(0 0 8px #00fff7)",
              transition: "transform 0.2s"
            }} />
          </a>
        </div>
      </div>
    </div>
    <div
      style={{
        textAlign: "center",
        color: "#00fff7",
        fontSize: "1.05rem",
        marginTop: "2.5rem",
        letterSpacing: "0.5px",
        borderTop: "1px solid #374151",
        paddingTop: "1.2rem",
        zIndex: 2,
        position: "relative",
        background: "rgba(24,25,26,0.85)"
      }}
    >
      &copy; {new Date().getFullYear()} <span style={{ color: "#00fff7", fontWeight: 700 }}>CLOPICK</span>. All rights reserved.
    </div>
  </footer>
);

export default Footer;
