import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CategorySection from "./components/CategorySection"; // ✅ Add this
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import TrendingProducts from "./components/TrendingProducts";
import ProductDetail from "./components/ProductDetail";
import SellerAuthForm from "./components/SellerAuthForm";
import Footer from "./components/Footer"; // ✅ Import Footer
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";
import ClothingSlideshow from "./components/ClothingSlideshow";
import SellerDashboard from "./components/SellerDashboard";
import CheckoutPage from "./components/CheckoutPage";
import OrderConfirmation from "./components/OrderConfirmation";

// Fallback UI for Suspense
const Loading = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
          <h2>Something went wrong.</h2>
          <pre>{this.state.error && this.state.error.toString()}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <CartProvider>
      <Router>
        <div
          className="App"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Only show Navbar on non-dashboard routes */}
          <Routes>
            <Route
              path="/seller/dashboard"
              element={
                <Suspense fallback={<Loading />}>
                  <SellerDashboard />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <ErrorBoundary>
                      <Suspense fallback={<Loading />}>
                        <Routes>
                          <Route
                            path="/"
                            element={
                              <div
                                style={{
                                  width: "100%",
                                  maxWidth: "98vw",
                                  margin: "2rem auto",
                                  background: "rgba(255,255,255,0.95)",
                                  borderRadius: "18px",
                                  boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                                  padding: "2.5rem 1vw",
                                  position: "relative",
                                }}
                              >
                                {/* Add horizontal padding for the banner */}
                                <div style={{ padding: "0 2vw" }}>
                                  <Banner />
                                </div>
                                <div style={{ margin: "2rem 0" }}>
                                  <h1
                                    style={{
                                      textAlign: "center",
                                      fontSize: "2.5rem",
                                      fontWeight: 700,
                                      color: "#2d3748",
                                      letterSpacing: "1px",
                                      marginBottom: "0.5rem",
                                    }}
                                  >
                                    Discover the Latest in Men's Fashion
                                  </h1>
                                  <p
                                    style={{
                                      textAlign: "center",
                                      color: "#4b5563",
                                      fontSize: "1.2rem",
                                      marginBottom: "2rem",
                                    }}
                                  >
                                    Shop trending styles, exclusive deals, and elevate your
                                    wardrobe with our curated collection.
                                  </p>
                                </div>
                                {/* Make TrendingProducts and CategorySection wider with minimal side space */}
                                <div style={{ width: "100%", maxWidth: "96vw", margin: "0 auto" }}>
                                  <TrendingProducts />
                                </div>
                                <div style={{ width: "100%", maxWidth: "96vw", margin: "0 auto" }}>
                                  <ClothingSlideshow />
                                </div>
                                <div style={{ width: "100%", maxWidth: "96vw", margin: "0 auto" }}>
                                  <CategorySection />
                                </div>
                              </div>
                            }
                          />
                          <Route path="/product/:id" element={<ProductDetail />} />
                          <Route path="/seller-auth" element={<SellerAuthForm />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/checkout" element={<CheckoutPage />} />
                          <Route path="/order-confirmation" element={<OrderConfirmation />} />
                        </Routes>
                      </Suspense>
                    </ErrorBoundary>
                  </div>
                </>
              }
            />
          </Routes>
          {/* ✅ Footer will always stay at the bottom */}
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
