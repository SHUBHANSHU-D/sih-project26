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
      : alerts.filter((alert) => alert.type === filter);

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
      {/* Header */}

      <header className="alerts-header">
        <div>
          <span className="alerts-label">
            FARMCONNECT NOTIFICATIONS
          </span>

          <h1>Alerts</h1>

          <p>
            Important updates about your products, orders,
            deliveries and market conditions.
          </p>
        </div>

        <Link
          to="/buyer-dashboard"
          className="alerts-back-button"
        >
          ← Dashboard
        </Link>
      </header>

      {/* Summary */}

      <section className="alerts-summary">
        <div className="alerts-summary-icon">
          🔔
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

      {/* Filters */}

      <section className="alerts-controls">
        <div>
          <h2>Your Alerts</h2>
          <p>Filter notifications by type.</p>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Alerts</option>
          <option value="price">Price</option>
          <option value="delivery">Delivery</option>
          <option value="market">Market</option>
          <option value="stock">Availability</option>
        </select>
      </section>

      {/* Alert List */}

      <section className="alerts-list">
        {filteredAlerts.length === 0 ? (
          <div className="no-alerts">
            <div>🔕</div>
            <h3>No alerts found</h3>
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
              onClick={() => markAsRead(alert.id)}
            >
              <div className="alert-icon">
                {alert.icon}
              </div>

              <div className="alert-content">
                <div className="alert-title-row">
                  <h3>{alert.title}</h3>

                  {!alert.read && (
                    <span className="unread-dot"></span>
                  )}
                </div>

                <p>{alert.message}</p>

                <span className="alert-time">
                  {alert.time}
                </span>
              </div>

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