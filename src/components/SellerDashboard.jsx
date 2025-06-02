import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Seller Dashboard Component (full page, replaces homepage content)
const SellerDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Try to get seller info from route state, fallback to localStorage if available
  const seller =
    location.state?.seller ||
    (() => {
      try {
        const stored = localStorage.getItem("clopick_seller");
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    })();

  React.useEffect(() => {
    // If seller info is present in location.state, persist it for reloads
    if (location.state?.seller) {
      localStorage.setItem("clopick_seller", JSON.stringify(location.state.seller));
    }
    // If no seller info anywhere, redirect to home
    if (!seller) {
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line
  }, [location.state, seller, navigate]);

  if (!seller) {
    // Show nothing while redirecting
    return null;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f7fb",
        padding: "0",
        margin: "0",
        width: "100vw",
      }}
    >
      {/* Amazon Seller Central Style Navbar */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#232526",
          color: "#fff",
          padding: "0.7rem 2.5rem",
          borderBottom: "2px solid #e0e0e0",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
          {/* Use your logo */}
          <img
            src={process.env.PUBLIC_URL + "/CLOPICK-logo.png"}
            alt="CLOPICK Logo"
            style={{
              height: "40px",
              width: "auto",
              objectFit: "contain",
              marginRight: "1.2rem",
              verticalAlign: "middle",
              display: "block",
              background: "#fff", // Ensures logo background is white
              borderRadius: "8px", // Optional: rounded corners for logo
              padding: "4px" // Optional: some padding for better appearance
            }}
          />
          {/* Remove the text if you only want the logo */}
          {/* <span style={{ fontWeight: 900, fontSize: "2rem", letterSpacing: "1px" }}>
            CLOPICK Seller Central
          </span> */}
          <span style={{ fontWeight: 700, fontSize: "1.1rem", cursor: "pointer" }}>Home</span>
          <span style={{ fontWeight: 700, fontSize: "1.1rem", cursor: "pointer" }}>Orders</span>
          <span style={{ fontWeight: 700, fontSize: "1.1rem", cursor: "pointer" }}>Inventory</span>
          <span style={{ fontWeight: 700, fontSize: "1.1rem", cursor: "pointer" }}>Payments</span>
          <span style={{ fontWeight: 700, fontSize: "1.1rem", cursor: "pointer" }}>Performance</span>
          <span style={{ fontWeight: 700, fontSize: "1.1rem", cursor: "pointer" }}>Advertising</span>
          <span style={{ fontWeight: 700, fontSize: "1.1rem", cursor: "pointer" }}>Messages</span>
          <span style={{ fontWeight: 700, fontSize: "1.1rem", cursor: "pointer" }}>Reports</span>
          <span style={{ fontWeight: 700, fontSize: "1.1rem", cursor: "pointer" }}>Support</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <span style={{ color: "#fff", fontWeight: 600, fontSize: "1.1rem" }}>
            {seller.businessName || seller.name || seller.email || "Seller"}
          </span>
          <button
            onClick={() => {
              localStorage.removeItem("clopick_seller");
              navigate("/", { replace: true });
            }}
            style={{
              background: "#fff",
              color: "#232526",
              border: "none",
              borderRadius: "8px",
              padding: "0.5rem 1.2rem",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </nav>
      <main style={{ padding: "2.5rem", maxWidth: "1400px", margin: "0 auto" }}>
        {/* Professional Seller Metrics */}
        <section
          style={{
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
            marginBottom: "2.5rem",
          }}
        >
          {/* Sales Overview */}
          <div
            style={{
              flex: "1 1 320px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 1px 6px #23252611",
              padding: "2rem",
              minWidth: "320px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <h2 style={{ color: "#232526", fontWeight: 800, marginBottom: "1.2rem" }}>
              Sales Overview
            </h2>
            <div style={{ fontSize: "1.1rem", color: "#232526", marginBottom: "0.7rem" }}>
              <b>Today's Sales:</b> ₹{seller.todaysSales ?? "12,500"}
            </div>
            <div style={{ fontSize: "1.1rem", color: "#232526", marginBottom: "0.7rem" }}>
              <b>This Month:</b> ₹{seller.monthSales ?? "2,10,000"}
            </div>
            <div style={{ fontSize: "1.1rem", color: "#232526", marginBottom: "0.7rem" }}>
              <b>Pending Orders:</b> {seller.pendingOrders ?? 8}
            </div>
            <div style={{ fontSize: "1.1rem", color: "#232526" }}>
              <b>Returns:</b> {seller.returns ?? 1}
            </div>
          </div>
          {/* Account Health */}
          <div
            style={{
              flex: "1 1 320px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 1px 6px #23252611",
              padding: "2rem",
              minWidth: "320px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <h2 style={{ color: "#232526", fontWeight: 800, marginBottom: "1.2rem" }}>
              Account Health
            </h2>
            <div style={{ fontSize: "1.1rem", color: "#232526", marginBottom: "0.7rem" }}>
              <b>Order Defect Rate:</b> {seller.orderDefectRate ?? "0.2%"}
            </div>
            <div style={{ fontSize: "1.1rem", color: "#232526", marginBottom: "0.7rem" }}>
              <b>Late Shipment Rate:</b> {seller.lateShipmentRate ?? "0%"}
            </div>
            <div style={{ fontSize: "1.1rem", color: "#232526", marginBottom: "0.7rem" }}>
              <b>Cancellation Rate:</b> {seller.cancellationRate ?? "0.1%"}
            </div>
            <div style={{ fontSize: "1.1rem", color: "#232526" }}>
              <b>Performance Notifications:</b> {seller.performanceNotifications ?? 0}
            </div>
          </div>
          {/* Seller Rating */}
          <div
            style={{
              flex: "1 1 320px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 1px 6px #23252611",
              padding: "2rem",
              minWidth: "320px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <h2 style={{ color: "#232526", fontWeight: 800, marginBottom: "1.2rem" }}>
              Seller Rating
            </h2>
            <div style={{ fontSize: "1.1rem", color: "#232526", marginBottom: "0.7rem" }}>
              <b>Feedback Score:</b> {seller.feedbackScore ?? "4.8/5.0"}
            </div>
            <div style={{ fontSize: "1.1rem", color: "#232526", marginBottom: "0.7rem" }}>
              <b>Positive Feedback:</b> {seller.positiveFeedback ?? "98%"}
            </div>
            <div style={{ fontSize: "1.1rem", color: "#232526", marginBottom: "0.7rem" }}>
              <b>Messages:</b> {seller.newMessages ?? 2} new
            </div>
            <div style={{ fontSize: "1.1rem", color: "#232526" }}>
              <b>Reviews:</b> {seller.newReviews ?? 5} new
            </div>
          </div>
        </section>
        {/* Announcements */}
        <section
          style={{
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 1px 6px #23252611",
            padding: "2rem",
            marginBottom: "2.5rem",
          }}
        >
          <h2 style={{ color: "#232526", fontWeight: 800, marginBottom: "1.2rem" }}>
            Announcements
          </h2>
          <ul style={{ color: "#555", fontSize: "1.08rem", paddingLeft: "1.2rem" }}>
            <li>Welcome to CLOPICK Seller Central! Start listing your products to reach more customers.</li>
            <li>Check your performance dashboard for new analytics and insights.</li>
            <li>Need help? Visit the Support section or contact our team.</li>
          </ul>
        </section>
        {/* Quick Actions */}
        <section
          style={{
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 1px 6px #23252611",
            padding: "2rem",
            marginBottom: "2.5rem",
          }}
        >
          <h2 style={{ color: "#232526", fontWeight: 800, marginBottom: "1.2rem" }}>
            Quick Actions
          </h2>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            <button
              style={{
                background: "#232526",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "1rem 2rem",
                fontWeight: 700,
                fontSize: "1.1rem",
                cursor: "pointer",
              }}
            >
              Add Product
            </button>
            <button
              style={{
                background: "#232526",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "1rem 2rem",
                fontWeight: 700,
                fontSize: "1.1rem",
                cursor: "pointer",
              }}
            >
              View Orders
            </button>
            <button
              style={{
                background: "#232526",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "1rem 2rem",
                fontWeight: 700,
                fontSize: "1.1rem",
                cursor: "pointer",
              }}
            >
              Payments
            </button>
            <button
              style={{
                background: "#232526",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "1rem 2rem",
                fontWeight: 700,
                fontSize: "1.1rem",
                cursor: "pointer",
              }}
            >
              Analytics
            </button>
          </div>
        </section>
        {/* Recent Orders Table */}
        <section
          style={{
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 1px 6px #23252611",
            padding: "2rem",
          }}
        >
          <h2 style={{ color: "#232526", fontWeight: 800, marginBottom: "1.2rem" }}>
            Recent Orders
          </h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "1.05rem",
            }}
          >
            <thead>
              <tr style={{ background: "#f6f7fb" }}>
                <th style={{ padding: "0.7rem", borderBottom: "1px solid #eee", textAlign: "left" }}>Order ID</th>
                <th style={{ padding: "0.7rem", borderBottom: "1px solid #eee", textAlign: "left" }}>Product</th>
                <th style={{ padding: "0.7rem", borderBottom: "1px solid #eee", textAlign: "left" }}>Date</th>
                <th style={{ padding: "0.7rem", borderBottom: "1px solid #eee", textAlign: "left" }}>Status</th>
                <th style={{ padding: "0.7rem", borderBottom: "1px solid #eee", textAlign: "left" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>#1001</td>
                <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>Sample Product</td>
                <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>2024-05-01</td>
                <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>Pending</td>
                <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>₹2,500</td>
              </tr>
              <tr>
                <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>#1000</td>
                <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>Sample Product 2</td>
                <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>2024-04-28</td>
                <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>Shipped</td>
                <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>₹1,200</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
      <footer
        style={{
          background: "#232526",
          color: "#fff",
          textAlign: "center",
          padding: "1.2rem",
          marginTop: "2rem",
        }}
      >
        &copy; {new Date().getFullYear()} CLOPICK Seller Central. All rights reserved.
      </footer>
    </div>
  );
};

export default SellerDashboard;
