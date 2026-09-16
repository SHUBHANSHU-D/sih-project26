import { useState } from "react";
import { Link } from "react-router-dom";
import { logisticsDeliveries } from "../data/logisticsDeliveries";
import "./LogisticsDeliveries.css";

function LogisticsDeliveries() {
  const [deliveries, setDeliveries] = useState(
    logisticsDeliveries
  );

  function getNextStatus(status) {
    if (status === "Assigned") {
      return "Accepted";
    }

    if (status === "Accepted") {
      return "Picked Up";
    }

    if (status === "Picked Up") {
      return "In Transit";
    }

    if (status === "In Transit") {
      return "Delivered";
    }

    return null;
  }

  function updateStatus(deliveryId, newStatus) {
    setDeliveries((currentDeliveries) =>
      currentDeliveries.map((delivery) =>
        delivery.id === deliveryId
          ? {
              ...delivery,
              status: newStatus,
            }
          : delivery
      )
    );
  }

  const activeDeliveries = deliveries.filter(
    (delivery) => delivery.status !== "Delivered"
  ).length;

  const completedDeliveries = deliveries.filter(
    (delivery) => delivery.status === "Delivered"
  ).length;

  return (
    <div className="logistics-deliveries-page">

      {/* HEADER */}

      <header className="logistics-deliveries-header">

        <div className="logistics-deliveries-header-content">

          {/* BRAND */}

          <div className="logistics-deliveries-brand">

            <img
              src="/logo.jpeg"
              alt="सीधा-SAUDA Logo"
              className="logistics-deliveries-logo"
            />

            <div>
              <h2>सीधा-SAUDA</h2>
              <span>Logistics Network</span>
            </div>

          </div>

          {/* PAGE TITLE */}

          <div className="logistics-deliveries-title">

            <Link
              to="/logistics-dashboard"
              className="logistics-deliveries-back"
            >
              ← Dashboard
            </Link>

            <p className="logistics-deliveries-eyebrow">
              सीधा-SAUDA LOGISTICS
            </p>

            <h1>Deliveries</h1>

            <p className="logistics-deliveries-subtitle">
              Manage assigned shipments and update delivery status.
            </p>

          </div>

        </div>

      </header>

      {/* SUMMARY */}

      <section className="logistics-delivery-summary">

        <div className="logistics-delivery-summary-card">

          <div className="logistics-delivery-summary-icon">
            <span className="material-symbols-outlined">
              local_shipping
            </span>
          </div>

          <div>
            <small>ACTIVE DELIVERIES</small>
            <strong>{activeDeliveries}</strong>
          </div>

        </div>

        <div className="logistics-delivery-summary-card">

          <div className="logistics-delivery-summary-icon">
            <span className="material-symbols-outlined">
              task_alt
            </span>
          </div>

          <div>
            <small>COMPLETED</small>
            <strong>{completedDeliveries}</strong>
          </div>

        </div>

        <div className="logistics-delivery-summary-card">

          <div className="logistics-delivery-summary-icon">
            <span className="material-symbols-outlined">
              route
            </span>
          </div>

          <div>
            <small>TOTAL DELIVERIES</small>
            <strong>{deliveries.length}</strong>
          </div>

        </div>

      </section>

      {/* DELIVERY LIST */}

      <section className="logistics-deliveries-card">

        <div className="logistics-deliveries-card-header">

          <div>
            <p>ASSIGNED SHIPMENTS</p>
            <h2>Delivery Operations</h2>
          </div>

          <span>
            {deliveries.length} deliveries
          </span>

        </div>

        <div className="logistics-deliveries-list">

          {deliveries.map((delivery) => {

            const nextStatus = getNextStatus(
              delivery.status
            );

            return (
              <div
                className="logistics-delivery-item"
                key={delivery.id}
              >

                {/* MAIN */}

                <div className="logistics-delivery-main">

                  <div className="logistics-delivery-icon">
                    <span className="material-symbols-outlined">
                      local_shipping
                    </span>
                  </div>

                  <div>

                    <div className="logistics-delivery-title">

                      <h3>{delivery.product}</h3>

                      <span
                        className={`logistics-delivery-status ${delivery.status
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                      >
                        {delivery.status}
                      </span>

                    </div>

                    <p className="logistics-delivery-id">
                      {delivery.id} · {delivery.shipmentId}
                    </p>

                    <p className="logistics-delivery-buyer">
                      Buyer:{" "}
                      <strong>{delivery.buyer}</strong>
                    </p>

                  </div>

                </div>

                {/* DETAILS */}

                <div className="logistics-delivery-details">

                  <div>
                    <small>QUANTITY</small>

                    <strong>
                      {delivery.quantity} {delivery.unit}
                    </strong>
                  </div>

                  <div>
                    <small>DESTINATION</small>

                    <strong>
                      {delivery.destination}
                    </strong>
                  </div>

                </div>

                {/* ACTION */}

                {nextStatus && (
                  <div className="logistics-delivery-action">

                    <button
                      onClick={() =>
                        updateStatus(
                          delivery.id,
                          nextStatus
                        )
                      }
                    >

                      {nextStatus === "Accepted"
                        ? "Accept Delivery"
                        : nextStatus === "Picked Up"
                        ? "Mark as Picked Up"
                        : nextStatus === "In Transit"
                        ? "Start Transit"
                        : "Mark as Delivered"}

                      <span className="material-symbols-outlined">
                        arrow_forward
                      </span>

                    </button>

                  </div>
                )}

                {/* COMPLETED */}

                {delivery.status === "Delivered" && (
                  <div className="logistics-delivery-complete">

                    <span className="material-symbols-outlined">
                      check_circle
                    </span>

                    Delivery Completed

                  </div>
                )}

              </div>
            );
          })}

        </div>

      </section>

    </div>
  );
}

export default LogisticsDeliveries;