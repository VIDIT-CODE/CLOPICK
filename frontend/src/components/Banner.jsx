import React from "react";
import "./Banner.css";

const Banner = () => (
  <div
    style={{
      width: "100%",
      height: "320px",
      position: "relative",
      borderRadius: "16px",
      overflow: "hidden",
      marginBottom: "2rem",
      boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
    }}
  >
    <img
      src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80"
      alt="Men's Fashion Banner"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        filter: "brightness(0.7)",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(90deg, rgba(34,34,34,0.7) 0%, rgba(0,0,0,0.1) 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "2rem 3rem",
      }}
    >
      <h1
        style={{
          color: "#fff",
          fontSize: "2.8rem",
          fontWeight: 800,
          margin: 0,
          letterSpacing: "2px",
          textShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        Elevate Your Style
      </h1>
      <p
        style={{
          color: "#f3f4f6",
          fontSize: "1.3rem",
          marginTop: "1rem",
          maxWidth: "500px",
        }}
      >
        Explore the best in men's clothing, from casual to formal, and find your
        perfect look for every occasion.
      </p>
    </div>
  </div>
);

export default Banner;
