import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./BuyerDashboard.css";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { alerts } from "../data/alerts";

function BuyerDashboard() {
  const [buyerProfile, setBuyerProfile] = useState(null);

  const { totalItems } = useCart();
const { orders } = useOrders();

useEffect(() => {
  const savedProfile = localStorage.getItem("buyerProfile");

  if (savedProfile) {
    setBuyerProfile(JSON.parse(savedProfile));
  }
  }, []);
  const buyerName = buyerProfile?.name || "Buyer";

  const buyerInitials = buyerName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

    const unreadAlerts = alerts.filter(
      (alert) => !alert.read
    ).length;
  return (
    <div className="buyer-dashboard">

      {/* Sidebar */}
      <aside className="buyer-sidebar">

        <div className="brand">
          <div className="brand-mark">F</div>
          <div>
            <h2>FarmConnect</h2>
            <span>Farm to Market</span>
          </div>
        </div>

        <nav className="sidebar-menu">

          <Link to="/buyer-dashboard" className="menu-item active">
            <span>⌂</span>
            Home
          </Link>

          <Link to="/products" className="menu-item">
            <span>▣</span>
            Products
          </Link>

          <Link to="/categories" className="menu-item">
            <span>◈</span>
            Categories
          </Link>

          <Link to="/orders" className="menu-item">
            <span>□</span>
            Orders
          </Link>

          <Link to="/cart" className="menu-item">
            <span>🛒</span>
            Cart
          </Link>

          <Link to="/delivery" className="menu-item">
            <span>↗</span>
            Delivery
          </Link>

          <Link to="/trace-order" className="menu-item">
            <span>⌖</span>
            Trace Order
          </Link>

          <Link to="/ai-insights" className="menu-item">
            <span>✦</span>
            AI Insights
          </Link>

          <Link to="/alerts" className="menu-item">
            <span>◉</span>
            Alerts
          </Link>


        </nav>

        <div className="sidebar-bottom">
          <Link to="/profile" className="menu-item">
            <span>○</span>
            Profile
          </Link>
        </div>

      </aside>


      {/* Main Area */}
      <main className="buyer-main">

        {/* Top Bar */}
        <header className="top-bar">

          <div className="mobile-brand">
            FarmConnect
          </div>

          <div className="top-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search products, farmers, categories..."
            />
          </div>

          <div className="top-actions">

            <Link to="/alerts" className="notification-icon">
              <span className="material-symbols-outlined">
                notifications
              </span>

              <span className="notification-dot"></span>
              
            </Link>

            <Link to="/profile" className="user-profile">
              <div className="avatar">
                {buyerInitials}
              </div>

              <div>
                <strong>{buyerName}</strong>
                <small>My Account</small>
              </div>
            </Link>

          </div>

        </header>


        {/* Page Content */}
        <div className="page-content">

          {/* Welcome */}
          <section className="welcome-section">

            <div>
              <p className="eyebrow">WELCOME BACK</p>

              <h1>
                Welcome, {buyerName}.
                <br />
                Fresh products await.
              </h1>

              <p className="welcome-text">
                Discover quality agricultural products directly
                from farmers, FPOs and trusted sellers.
              </p>

              <div className="welcome-buttons">
                <Link to="/products" className="primary-button">
                  Browse Products
                </Link>

                <Link to="/categories" className="secondary-button">
                  Explore Categories
                </Link>
              </div>
            </div>

            <div className="welcome-illustration">
              <div className="farm-circle">
                🌾
              </div>

              <div className="small-leaf leaf-one">🌿</div>
              <div className="small-leaf leaf-two">🍃</div>
            </div>

          </section>

          {/* ================= QUICK OVERVIEW ================= */}

          <section className="dashboard-overview">

            <div className="overview-card">

              <div className="overview-icon cart-overview-icon">
                🛒
              </div>

              <div>
                <span>SHOPPING CART</span>

                <strong>{totalItems}</strong>

                <p>
                  {totalItems === 1
                    ? "item in your cart"
                    : "items in your cart"}
                </p>
              </div>

              <Link to="/cart" className="overview-link">
                View →
              </Link>

            </div>


            <div className="overview-card">

              <div className="overview-icon order-overview-icon">
                📦
              </div>

              <div>
                <span>ORDERS</span>

                <strong>{orders.length}</strong>

                <p>
                  {orders.length === 1
                    ? "order placed"
                    : "orders placed"}
                </p>
              </div>

              <Link to="/orders" className="overview-link">
                View →
              </Link>

            </div>


            <div className="overview-card">

              <div className="overview-icon alert-overview-icon">
                <span className="material-symbols-outlined">
                  notifications
                </span>
              </div>

              <div>
                <span>ALERTS</span>

                <strong>{unreadAlerts}</strong>

                <p>
                  {unreadAlerts === 1
                    ? "unread alert"
                    : "unread alerts"}
                </p>
              </div>

              <Link to="/alerts" className="overview-link">
                View →
              </Link>

            </div>

          </section>

          {/* Categories */}
          <section className="section">

            <div className="section-heading">
              <div>
                <span className="section-label">EXPLORE</span>
                <h2>Shop by category</h2>
              </div>

              <Link to="/categories" className="view-link">
                View all →
              </Link>
            </div>


            <div className="category-list">

              <Link to="/categories/vegetables" className="category-item">
                <div className="category-icon vegetable">
                  🥬
                </div>
                <div>
                  <strong>Vegetables</strong>
                  <span>Fresh & seasonal</span>
                </div>
              </Link>


              <Link to="/categories/fruits" className="category-item">
                <div className="category-icon fruit">
                  🍎
                </div>
                <div>
                  <strong>Fruits</strong>
                  <span>Farm fresh</span>
                </div>
              </Link>


              <Link to="/categories/grains" className="category-item">
                <div className="category-icon grain">
                  🌾
                </div>
                <div>
                  <strong>Grains</strong>
                  <span>Quality grains</span>
                </div>
              </Link>


              <Link to="/categories/pulses" className="category-item">
                <div className="category-icon pulses">
                  🫘
                </div>
                <div>
                  <strong>Pulses</strong>
                  <span>Nutritious & fresh</span>
                </div>
              </Link>

            </div>

          </section>


          {/* Recommended Products */}
          <section className="section">

            <div className="section-heading">
              <div>
                <span className="section-label">FROM OUR FARMERS</span>
                <h2>Recommended for you</h2>
              </div>

              <Link to="/products" className="view-link">
                View all →
              </Link>
            </div>


            <div className="product-list">

              <div className="market-product">

                <div className="product-photo potato">
                  🥔
                </div>

                <div className="product-info">
                  <span className="product-category">
                    Vegetables
                  </span>

                  <h3>Fresh Potatoes</h3>

                  <p>Direct from local farmer</p>

                  <div className="product-bottom">
                    <strong>₹30 <small>/ kg</small></strong>
                    <button>Add</button>
                  </div>
                </div>

              </div>


              <div className="market-product">

                <div className="product-photo tomato">
                  🍅
                </div>

                <div className="product-info">
                  <span className="product-category">
                    Vegetables
                  </span>

                  <h3>Fresh Tomatoes</h3>

                  <p>Farm fresh tomatoes</p>

                  <div className="product-bottom">
                    <strong>₹40 <small>/ kg</small></strong>
                    <button>Add</button>
                  </div>
                </div>

              </div>


              <div className="market-product">

                <div className="product-photo wheat">
                  🌾
                </div>

                <div className="product-info">
                  <span className="product-category">
                    Grains
                  </span>

                  <h3>Premium Wheat</h3>

                  <p>Quality farm wheat</p>

                  <div className="product-bottom">
                    <strong>₹35 <small>/ kg</small></strong>
                    <button>Add</button>
                  </div>
                </div>

              </div>

            </div>

          </section>


          {/* Bottom Information */}
          <section className="dashboard-info">

            <div className="info-block">

              <div className="info-icon">
                ✦
              </div>

              <div>
                <span>AI MARKET INSIGHT</span>
                <h3>Plan your purchases smarter</h3>
                <p>
                  Get AI-powered predictions about demand,
                  availability and market trends.
                </p>
              </div>

              <Link to="/ai-prediction">
                Explore →
              </Link>

            </div>


            <div className="info-block tracking-block">

              <div className="info-icon">
                ⌖
              </div>

              <div>
                <span>ORDER TRACKING</span>
                <h3>Know where your order is</h3>
                <p>
                  Track your order from seller to your doorstep.
                </p>
              </div>

              <Link to="/trace-order">
                Track →
              </Link>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default BuyerDashboard;