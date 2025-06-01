import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TrendingProducts from "./components/TrendingProducts";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import SellerDashboard from "./components/SellerDashboard";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<TrendingProducts />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;