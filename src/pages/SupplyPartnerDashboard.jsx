import { Link } from "react-router-dom";
import { supplyPartner } from "../data/supplyPartner";
import "./SupplyPartnerDashboard.css";

function SupplyPartnerDashboard() {
  const partner = supplyPartner;

  return (
    <div className="supply-dashboard">

      {/* ================= SIDEBAR ================= */}

      <aside className="supply-sidebar">

        <div className="supply-brand">

          <div className="supply-brand-mark">
            <span className="material-symbols-outlined">
              agriculture
            </span>
          </div>

          <div>
            <h2>FarmConnect</h2>
            <span>Supply Network</span>
          </div>

        </div>


        <nav className="supply-menu">

          <Link
            to="/supply-partner-dashboard"
            className="supply-menu-item active"
          >
            <span className="material-symbols-outlined">
              home
            </span>
            Home
          </Link>


          <Link
            to="/supply-partner-inventory"
            className="supply-menu-item"
          >
            <span className="material-symbols-outlined">
              inventory_2
            </span>
            Inventory
          </Link>


          <Link
            to="/supply-partner-orders"
            className="supply-menu-item"
          >
            <span className="material-symbols-outlined">
              assignment
            </span>
            Requests / Orders
          </Link>


          <Link
            to="/supply-partner-shipments"
            className="supply-menu-item"
          >
            <span className="material-symbols-outlined">
              local_shipping
            </span>
            Shipments
          </Link>


          <Link
            to="/supply-partner-performance"
            className="supply-menu-item"
          >
            <span className="material-symbols-outlined">
              analytics
            </span>
            Performance
          </Link>


          <Link
            to="/ai-insights"
            className="supply-menu-item"
          >
            <span className="material-symbols-outlined">
              auto_awesome
            </span>
            AI Insights
          </Link>


          <Link
            to="/alerts"
            className="supply-menu-item"
          >
            <span className="material-symbols-outlined">
              notifications
            </span>
            Alerts
          </Link>

        </nav>


        {/* ================= SIDEBAR BOTTOM ================= */}

        <div className="supply-sidebar-bottom">

          <Link
            to="/supply-partner-profile"
            className="supply-menu-item"
          >
            <span className="material-symbols-outlined">
              person
            </span>
            Profile
          </Link>


          <Link
            to="/"
            className="supply-menu-item"
          >
            <span className="material-symbols-outlined">
              logout
            </span>
            Logout
          </Link>

        </div>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="supply-main">


        {/* ================= TOP BAR ================= */}

        <header className="supply-top-bar">

          <div className="supply-mobile-brand">
            FarmConnect
          </div>


          <div className="supply-search">

            <span className="material-symbols-outlined">
              search
            </span>

            <input
              type="text"
              placeholder="Search products, orders..."
            />

          </div>


          <div className="supply-top-actions">

            {/* Notification */}

            <Link
              to="/alerts"
              className="supply-notification"
            >

              <span className="material-symbols-outlined">
                notifications
              </span>

              <span className="supply-notification-dot"></span>

            </Link>


            {/* Partner Profile */}

            <Link
              to="/supply-partner-profile"
              className="supply-user-profile"
            >

              <div className="supply-avatar">

                {partner.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}

              </div>


              <div>

                <strong>
                  {partner.name}
                </strong>

                <small>
                  {partner.role}
                </small>

              </div>

            </Link>

          </div>

        </header>


        {/* ================= PAGE CONTENT ================= */}

        <div className="supply-page-content">


          {/* ================= WELCOME ================= */}

          <section className="supply-welcome">

            <div>

              <p className="supply-eyebrow">
                SUPPLY PARTNER PORTAL
              </p>


              <h1>
                Welcome back,
                <br />
                {partner.contactPerson}.
              </h1>


              <p className="supply-welcome-text">
                Manage your agricultural supply operations,
                products, requests and shipments from one place.
              </p>


              <div className="supply-welcome-info">

                <span>
                  PARTNER TYPE
                </span>

                <strong>
                  {partner.role}
                </strong>

              </div>

            </div>


            <div className="supply-welcome-illustration">

              <div className="supply-farm-circle">
                🌾
              </div>

              <span className="supply-leaf supply-leaf-one">
                🌿
              </span>

              <span className="supply-leaf supply-leaf-two">
                🍃
              </span>

            </div>

          </section>


          {/* ================= OVERVIEW ================= */}

          <section className="supply-section">

            <div className="supply-section-heading">

              <div>
                <p>OVERVIEW</p>
                <h2>Supply Operations</h2>
              </div>

            </div>


            <div className="supply-stats">


              {/* ACTIVE PRODUCTS */}

              <div className="supply-stat-card">

                <div className="supply-stat-icon">

                  <span className="material-symbols-outlined">
                    inventory_2
                  </span>

                </div>


                <div>

                  <span>
                    ACTIVE PRODUCTS
                  </span>

                  <strong>
                    {partner.stats.activeProducts}
                  </strong>

                  <p>
                    Products currently listed
                  </p>

                </div>

              </div>


              {/* PENDING REQUESTS */}

              <div className="supply-stat-card">

                <div className="supply-stat-icon">

                  <span className="material-symbols-outlined">
                    pending_actions
                  </span>

                </div>


                <div>

                  <span>
                    PENDING REQUESTS
                  </span>

                  <strong>
                    {partner.stats.pendingRequests}
                  </strong>

                  <p>
                    Requests awaiting action
                  </p>

                </div>

              </div>


              {/* ACTIVE SHIPMENTS */}

              <div className="supply-stat-card">

                <div className="supply-stat-icon">

                  <span className="material-symbols-outlined">
                    local_shipping
                  </span>

                </div>


                <div>

                  <span>
                    ACTIVE SHIPMENTS
                  </span>

                  <strong>
                    {partner.stats.activeShipments}
                  </strong>

                  <p>
                    Shipments in progress
                  </p>

                </div>

              </div>


              {/* COMPLETED ORDERS */}

              <div className="supply-stat-card">

                <div className="supply-stat-icon">

                  <span className="material-symbols-outlined">
                    task_alt
                  </span>

                </div>


                <div>

                  <span>
                    COMPLETED ORDERS
                  </span>

                  <strong>
                    {partner.stats.completedOrders}
                  </strong>

                  <p>
                    Successfully completed
                  </p>

                </div>

              </div>

            </div>

          </section>


          {/* ================= QUICK ACTIONS ================= */}

          <section className="supply-section">

            <div className="supply-section-heading">

              <div>
                <p>QUICK ACTIONS</p>
                <h2>Manage Your Operations</h2>
              </div>

            </div>


            <div className="supply-actions">


              {/* INVENTORY */}

              <Link
                to="/supply-partner-inventory"
                className="supply-action-card"
              >

                <div className="supply-action-icon">

                  <span className="material-symbols-outlined">
                    inventory_2
                  </span>

                </div>


                <div>

                  <h3>
                    Manage Inventory
                  </h3>

                  <p>
                    Add, update and manage your
                    agricultural products.
                  </p>

                </div>


                <span>→</span>

              </Link>


              {/* REQUESTS */}

              <Link
                to="/supply-partner-orders"
                className="supply-action-card"
              >

                <div className="supply-action-icon">

                  <span className="material-symbols-outlined">
                    assignment
                  </span>

                </div>


                <div>

                  <h3>
                    View Requests
                  </h3>

                  <p>
                    Review buyer requests and
                    manage incoming orders.
                  </p>

                </div>


                <span>→</span>

              </Link>


              {/* SHIPMENTS */}

              <Link
                to="/supply-partner-shipments"
                className="supply-action-card"
              >

                <div className="supply-action-icon">

                  <span className="material-symbols-outlined">
                    local_shipping
                  </span>

                </div>


                <div>

                  <h3>
                    Manage Shipments
                  </h3>

                  <p>
                    Track products moving through
                    the supply chain.
                  </p>

                </div>


                <span>→</span>

              </Link>

            </div>

          </section>


          {/* ================= PARTNER INFORMATION ================= */}

          <section className="supply-section">

            <div className="supply-info-card">


              <div className="supply-info-icon">

                <span className="material-symbols-outlined">
                  location_on
                </span>

              </div>


              <div>

                <span>
                  OPERATING LOCATION
                </span>

                <h3>
                  {partner.location}
                </h3>

                <p>
                  Your registered supply-chain
                  operating location.
                </p>

              </div>


              <Link
                to="/supply-partner-profile"
                className="supply-info-link"
              >
                View Profile →
              </Link>

            </div>

          </section>


        </div>

      </main>

    </div>
  );
}

export default SupplyPartnerDashboard;