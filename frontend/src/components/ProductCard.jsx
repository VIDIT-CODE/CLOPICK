import React, { useState } from "react";
import "./ProductCard.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

// Helper to render stars based on rating
const StarRating = ({ rating }) => (
  <span className="star-rating">
    {Array.from({ length: 5 }).map((_, i) => {
      const starValue = i + 1;
      if (starValue <= Math.floor(rating)) {
        // Full star
        return (
          <span
            key={i}
            className="pd-star"
            style={{
              color: "#ffd700",
              background: "#fff",
              border: "1.2px solid #232526",
              borderRadius: "3px",
              marginRight: "2px",
              padding: "0 1px",
              fontSize: "1.15rem",
              lineHeight: 1,
              display: "inline-block",
              verticalAlign: "middle",
            }}
          >
            ★
          </span>
        );
      } else if (starValue - 1 < rating && rating < starValue) {
        // Partial star
        const percent = Math.round((rating - (starValue - 1)) * 100);
        return (
          <span
            key={i}
            className="pd-star"
            style={{
              position: "relative",
              display: "inline-block",
              width: "1.15em",
              verticalAlign: "middle",
              background: "#fff",
              border: "1.2px solid #232526",
              borderRadius: "3px",
              marginRight: "2px",
              padding: "0 1px",
              lineHeight: 1,
              overflow: "hidden",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: `${percent}%`,
                height: "100%",
                overflow: "hidden",
                color: "#ffd700",
                whiteSpace: "nowrap",
              }}
            >
              ★
            </span>
            <span
              style={{
                color: "#e0e0e0",
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                whiteSpace: "nowrap",
              }}
            >
              ★
            </span>
          </span>
        );
      } else {
        // Empty star
        return (
          <span
            key={i}
            className="pd-star"
            style={{
              color: "#e0e0e0",
              background: "#fff",
              border: "1.2px solid #232526",
              borderRadius: "3px",
              marginRight: "2px",
              padding: "0 1px",
              fontSize: "1.15rem",
              lineHeight: 1,
              display: "inline-block",
              verticalAlign: "middle",
            }}
          >
            ★
          </span>
        );
      }
    })}
  </span>
);

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  // For demo, assign a random rating between 3.5 and 5
  const rating = product.rating || (Math.random() * 1.5 + 3.5).toFixed(1);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleImageClick = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="product-card attractive-card">
      <div
        className="product-image-container"
        style={{ cursor: "pointer" }}
        onClick={handleImageClick}
      >
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
        <div className="product-badge">Trending</div>
      </div>
      <h3 className="product-title">{product.title}</h3>
      <div style={{ margin: "0.2rem 0 0.5rem 0" }}>
        <StarRating rating={parseFloat(rating)} />
        <span
          style={{
            marginLeft: 6,
            color: "#232526",
            fontWeight: 600,
            fontSize: "0.98rem",
          }}
        >
          {rating}
        </span>
      </div>
      <p className="product-price">₹{product.price}</p>
      <div className="product-buttons">
        <button className="buy-now" onClick={handleBuyNow}>
          Buy Now
        </button>
        <button
          className={`add-to-cart${added ? " added" : ""}`}
          onClick={handleAddToCart}
          disabled={added}
        >
          {added ? "Added to cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;