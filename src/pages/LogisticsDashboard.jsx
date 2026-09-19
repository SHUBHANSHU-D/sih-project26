import { Link } from "react-router-dom";
import { logisticsPartner } from "../data/logisticsPartner";
import "./LogisticsDashboard.css";

function LogisticsDashboard() {
  const partner = logisticsPartner;

  const partnerInitials = partner.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="logistics-dashboard">


      <aside className="logistics-sidebar">

        <div className="logistics-brand">

          <img
            src="/logo.jpeg"
            alt="सीधा-SAUDA Logo"
            className="logistics-brand-logo"
          />

          <div>
            <h2>सीधा-SAUDA</h2>
            <span>Logistics Network</span>
          </div>

        </div>

        <nav className="logistics-menu">

          <Link
            to="/logistics-dashboard"
            className="logistics-menu-item active"
          >
            <span className="material-symbols-outlined">
              home
            </span>
            Home
          </Link>

          <Link
            to="/logistics-deliveries"
            className="logistics-menu-item"
          >
            <span className="material-symbols-outlined">
              local_shipping
            </span>
            Deliveries
          </Link>

          <Link
            to="/alerts"
            className="logistics-menu-item"
          >
            <span className="material-symbols-outlined">
              notifications
            </span>
            Alerts
          </Link>

        </nav>

        <div className="logistics-sidebar-bottom">

          <Link
            to="/logistics-profile"
            className="logistics-menu-item"
          >
            <span className="material-symbols-outlined">
              person
            </span>
            Profile
          </Link>

          <Link
            to="/"
            className="logistics-menu-item"
          >
            <span className="material-symbols-outlined">
              logout
            </span>
            Logout
          </Link>

        </div>

      </aside>
      <main className="logistics-main">


        <header className="logistics-top-bar">

          <div className="logistics-mobile-brand">

            <img
              src="/logo.jpeg"
              alt="सीधा-SAUDA Logo"
              className="logistics-mobile-logo"
            />

            <span>सीधा-SAUDA</span>

          </div>

          <div className="logistics-search">

            <span className="material-symbols-outlined">
              search
            </span>

            <input
              type="text"
              placeholder="Search deliveries..."
            />

          </div>

          <div className="logistics-top-actions">

            <Link
              to="/alerts"
              className="logistics-notification"
            >
              <span className="material-symbols-outlined">
                notifications
              </span>

              <span className="logistics-notification-dot"></span>
            </Link>

            <Link
              to="/logistics-profile"
              className="logistics-user"
            >

              <div className="logistics-avatar">
                {partnerInitials}
              </div>

              <div>
                <strong>{partner.name}</strong>
                <small>Logistics Partner</small>
              </div>

            </Link>

          </div>

        </header>


        <div className="logistics-content">


          <section className="logistics-welcome">

            <div>

              <p className="logistics-eyebrow">
                सीधा-SAUDA LOGISTICS PORTAL
              </p>

              <h1>
                Welcome back,
                <br />
                {partner.contactPerson}.
              </h1>

              <p className="logistics-welcome-text">
                Manage assigned shipments and deliver
                agricultural products efficiently.
              </p>

              <div className="logistics-location">

                <span className="material-symbols-outlined">
                  location_on
                </span>

                {partner.location}

              </div>

            </div>

            <div className="logistics-illustration">

              <div className="logistics-circle">
                <span className="material-symbols-outlined">
                  local_shipping
                </span>
              </div>

              <span className="logistics-leaf leaf-one">
                <span className="material-symbols-outlined">
                  eco
                </span>
              </span>

              <span className="logistics-leaf leaf-two">
                <span className="material-symbols-outlined">
                  spa
                </span>
              </span>

            </div>

          </section>


          <section className="logistics-section">

            <div className="logistics-section-heading">

              <div>
                <p>OVERVIEW</p>
                <h2>Delivery Operations</h2>
              </div>

            </div>

            <div className="logistics-stats">


              <div className="logistics-stat-card">

                <div className="logistics-stat-icon">
                  <span className="material-symbols-outlined">
                    pending_actions
                  </span>
                </div>

                <div>
                  <span>PENDING REQUESTS</span>

                  <strong>
                    {partner.stats.pendingRequests}
                  </strong>

                  <p>Awaiting action</p>
                </div>

              </div>


              <div className="logistics-stat-card">

                <div className="logistics-stat-icon">
                  <span className="material-symbols-outlined">
                    local_shipping
                  </span>
                </div>

                <div>
                  <span>ACTIVE DELIVERIES</span>

                  <strong>
                    {partner.stats.activeDeliveries}
                  </strong>

                  <p>Currently in transit</p>
                </div>

              </div>


              <div className="logistics-stat-card">

                <div className="logistics-stat-icon">
                  <span className="material-symbols-outlined">
                    task_alt
                  </span>
                </div>

                <div>
                  <span>COMPLETED</span>

                  <strong>
                    {partner.stats.completedDeliveries}
                  </strong>

                  <p>Successfully delivered</p>
                </div>

              </div>


              <div className="logistics-stat-card">

                <div className="logistics-stat-icon">
                  <span className="material-symbols-outlined">
                    assignment
                  </span>
                </div>

                <div>
                  <span>ASSIGNED SHIPMENTS</span>

                  <strong>
                    {partner.stats.assignedShipments}
                  </strong>

                  <p>Assigned to you</p>
                </div>

              </div>

            </div>

          </section>


          <section className="logistics-section">

            <div className="logistics-section-heading">

              <div>
                <p>QUICK ACTION</p>
                <h2>Manage Deliveries</h2>
              </div>

            </div>

            <Link
              to="/logistics-deliveries"
              className="logistics-action-card"
            >

              <div className="logistics-action-icon">
                <span className="material-symbols-outlined">
                  local_shipping
                </span>
              </div>

              <div>

                <h3>
                  View Assigned Deliveries
                </h3>

                <p>
                  View shipments, destinations and
                  update delivery status.
                </p>

              </div>

              <span className="logistics-arrow">
                →
              </span>

            </Link>

          </section>

        </div>

      </main>

    </div>
  );
}

export default LogisticsDashboard;