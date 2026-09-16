import { useState } from "react";
import { Link } from "react-router-dom";
import { alerts as initialAlerts } from "../data/alerts";
import "./Alerts.css";

function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [filter, setFilter] = useState("all");

  const unreadCount = alerts.filter(
    (alert) => !alert.read
  ).length;

  const filteredAlerts =
    filter === "all"
      ? alerts
      : alerts.filter(
          (alert) => alert.type === filter
        );

  function markAsRead(id) {
    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) =>
        alert.id === id
          ? { ...alert, read: true }
          : alert
      )
    );
  }

  function markAllAsRead() {
    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) => ({
        ...alert,
        read: true,
      }))
    );
  }

  return (
    <div className="alerts-page">

      {/* =========================
          HEADER
          ========================= */}

      <header className="alerts-header">

        <div className="alerts-header-content">

          {/* BRAND */}

          <div className="alerts-brand">

            <img
              src="/logo.jpeg"
              alt="सीधा-SAUDA Logo"
              className="alerts-brand-logo"
            />

            <div>

              <h1>सीधा-SAUDA</h1>

              <p className="alerts-brand-tagline">
                किसान से सीधे बाजार तक
              </p>

            </div>

          </div>


          {/* PAGE TITLE */}

          <div className="alerts-page-title">

            <span className="alerts-label">
              सीधा-SAUDA NOTIFICATIONS
            </span>

            <h2>Alerts</h2>

            <p>
              Important updates about your products,
              orders, deliveries and market conditions.
            </p>

          </div>

        </div>


        <Link
          to="/buyer-dashboard"
          className="alerts-back-button"
        >
          ← Dashboard
        </Link>

      </header>


      {/* =========================
          SUMMARY
          ========================= */}

      <section className="alerts-summary">

        <div className="alerts-summary-icon">

          <span className="material-symbols-outlined">
            notifications
          </span>

        </div>


        <div>

          <span>NOTIFICATIONS</span>

          <h2>
            {unreadCount} unread alert
            {unreadCount !== 1 ? "s" : ""}
          </h2>

          <p>
            Stay updated with important marketplace events.
          </p>

        </div>


        {unreadCount > 0 && (

          <button
            className="mark-all-button"
            onClick={markAllAsRead}
          >
            Mark All as Read
          </button>

        )}

      </section>


      {/* =========================
          FILTERS
          ========================= */}

      <section className="alerts-controls">

        <div>

          <h2>Your Alerts</h2>

          <p>
            Filter notifications by type.
          </p>

        </div>


        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
        >

          <option value="all">
            All Alerts
          </option>

          <option value="price">
            Price
          </option>

          <option value="delivery">
            Delivery
          </option>

          <option value="market">
            Market
          </option>

          <option value="stock">
            Availability
          </option>

        </select>

      </section>


      {/* =========================
          ALERT LIST
          ========================= */}

      <section className="alerts-list">

        {filteredAlerts.length === 0 ? (

          <div className="no-alerts">

            <div className="no-alerts-icon">

              <span className="material-symbols-outlined">
                notifications_off
              </span>

            </div>

            <h3>
              No alerts found
            </h3>

            <p>
              There are no alerts in this category.
            </p>

          </div>

        ) : (

          filteredAlerts.map((alert) => (

            <article
              className={`alert-card ${
                alert.read ? "read" : "unread"
              }`}
              key={alert.id}
              onClick={() =>
                markAsRead(alert.id)
              }
            >

              {/* ALERT ICON */}

              <div className="alert-icon">

                <span className="material-symbols-outlined">
                  {alert.type === "price"
                    ? "trending_down"
                    : alert.type === "delivery"
                    ? "local_shipping"
                    : alert.type === "market"
                    ? "monitoring"
                    : "inventory_2"}
                </span>

              </div>


              {/* ALERT CONTENT */}

              <div className="alert-content">

                <div className="alert-title-row">

                  <h3>
                    {alert.title}
                  </h3>

                  {!alert.read && (
                    <span className="unread-dot"></span>
                  )}

                </div>


                <p>
                  {alert.message}
                </p>


                <span className="alert-time">
                  {alert.time}
                </span>

              </div>


              {/* PRIORITY */}

              <span
                className={`priority-badge ${alert.priority}`}
              >
                {alert.priority}
              </span>

            </article>

          ))

        )}

      </section>

    </div>
  );
}

export default Alerts;