import { useState } from "react";
import { Link } from "react-router-dom";
import { supplyOrders } from "../data/supplyOrders";
import "./SupplyPartnerOrders.css";

function SupplyPartnerOrders() {
  const [orders, setOrders] = useState(supplyOrders);

  function updateStatus(orderId, newStatus) {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
            }
          : order
      )
    );
  }

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const acceptedOrders = orders.filter(
    (order) => order.status === "Accepted"
  ).length;

  return (
    <div className="supply-orders-page">

      {/* HEADER */}

      <header className="orders-header">

        <div>
          <Link
            to="/supply-partner-dashboard"
            className="orders-back"
          >
            ← Dashboard
          </Link>

          <p className="orders-eyebrow">
            SUPPLY PARTNER
          </p>

          <h1>Requests / Orders</h1>

          <p className="orders-subtitle">
            Review buyer requests and manage incoming orders.
          </p>
        </div>

      </header>

      {/* SUMMARY */}

      <section className="orders-summary">

        <div className="order-summary-card">
          <span className="material-symbols-outlined">
            pending_actions
          </span>

          <div>
            <small>PENDING REQUESTS</small>
            <strong>{pendingOrders}</strong>
          </div>
        </div>

        <div className="order-summary-card">
          <span className="material-symbols-outlined">
            check_circle
          </span>

          <div>
            <small>ACCEPTED ORDERS</small>
            <strong>{acceptedOrders}</strong>
          </div>
        </div>

        <div className="order-summary-card">
          <span className="material-symbols-outlined">
            assignment
          </span>

          <div>
            <small>TOTAL REQUESTS</small>
            <strong>{orders.length}</strong>
          </div>
        </div>

      </section>

      {/* ORDERS */}

      <section className="orders-card">

        <div className="orders-card-header">
          <div>
            <p>BUYER REQUESTS</p>
            <h2>Incoming Orders</h2>
          </div>

          <span>
            {orders.length} requests
          </span>
        </div>

        <div className="orders-list">

          {orders.map((order) => (

            <div
              className="supply-order"
              key={order.id}
            >

              {/* ORDER INFO */}

              <div className="order-main">

                <div className="order-icon">
                  <span className="material-symbols-outlined">
                    shopping_basket
                  </span>
                </div>

                <div>

                  <div className="order-title-row">

                    <h3>{order.product}</h3>

                    <span
                      className={`order-status ${order.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {order.status}
                    </span>

                  </div>

                  <p className="order-id">
                    {order.id} · {order.date}
                  </p>

                  <p className="buyer-name">
                    Buyer: <strong>{order.buyer}</strong>
                  </p>

                </div>

              </div>

              {/* ORDER DETAILS */}

              <div className="order-details">

                <div>
                  <small>QUANTITY</small>
                  <strong>
                    {order.quantity} {order.unit}
                  </strong>
                </div>

                <div>
                  <small>ORDER VALUE</small>
                  <strong>
                    ₹{order.amount.toLocaleString("en-IN")}
                  </strong>
                </div>

                <div>
                  <small>DELIVERY LOCATION</small>
                  <strong>{order.location}</strong>
                </div>

              </div>

              {/* ACTIONS */}

              {order.status === "Pending" && (
                <div className="order-actions">

                  <button
                    className="reject-button"
                    onClick={() =>
                      updateStatus(
                        order.id,
                        "Rejected"
                      )
                    }
                  >
                    Reject
                  </button>

                  <button
                    className="accept-button"
                    onClick={() =>
                      updateStatus(
                        order.id,
                        "Accepted"
                      )
                    }
                  >
                    Accept Order
                  </button>

                </div>
              )}

              {order.status === "Accepted" && (
                <div className="order-actions">

                  <button
                    className="processing-button"
                    onClick={() =>
                      updateStatus(
                        order.id,
                        "Processing"
                      )
                    }
                  >
                    Start Processing
                  </button>

                </div>
              )}

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default SupplyPartnerOrders;