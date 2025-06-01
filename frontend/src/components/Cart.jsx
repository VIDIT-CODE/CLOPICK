import React from "react";
import { useCart } from "../context/CartContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!cart || cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty.</h2>
        <span role="img" aria-label="empty-cart" style={{ fontSize: "3rem" }}>
          🛒
        </span>
      </div>
    );
  }

  // Remove item from cart by filtering out the item with the given id
  const handleRemove = (id) => {
    // If your context's removeFromCart is not working, try this:
    // updateQuantity(id, 0);
    removeFromCart(id);
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout", { state: { cartItems: cart } });
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Cart</h2>
      <div className="cart-items-list">
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <img
              src={item.image}
              alt={item.title}
              className="cart-item-img"
            />
            <div className="cart-item-info">
              <div className="cart-item-title">{item.title}</div>
              <div className="cart-item-price">₹{item.price}</div>
              <div className="cart-item-qty">
                <button
                  style={{
                    border: "none",
                    background: "#e0e7ef",
                    borderRadius: "50%",
                    width: "28px",
                    height: "28px",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    marginRight: "8px",
                  }}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label="Decrease quantity"
                >-</button>
                {item.quantity}
                <button
                  style={{
                    border: "none",
                    background: "#e0e7ef",
                    borderRadius: "50%",
                    width: "28px",
                    height: "28px",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    marginLeft: "8px",
                  }}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label="Increase quantity"
                >+</button>
              </div>
            </div>
            <button
              className="cart-item-remove"
              onClick={() => handleRemove(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="cart-summary-title">Order Summary</div>
        <div className="cart-summary-total">Total: ₹{total}</div>
        <button
          className="cart-checkout-btn"
          onClick={handleProceedToCheckout}
          disabled={cart.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
