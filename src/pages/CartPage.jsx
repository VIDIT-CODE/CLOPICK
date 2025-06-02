import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    // Pass all cart items to checkout page
    navigate("/checkout", { state: { cartItems: cart } });
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        cart.map((item, idx) => (
          <div key={idx} className="cart-item">
            <img src={item.imageUrl} alt={item.title} width={50} />
            <div>
              <h4>{item.title}</h4>
              <p>₹{item.price}</p>
            </div>
          </div>
        ))
      )}
      {cart.length > 0 && (
        <button onClick={handleProceedToCheckout}>
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default CartPage;