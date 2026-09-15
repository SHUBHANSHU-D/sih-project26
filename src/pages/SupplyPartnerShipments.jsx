import { useState } from "react";
import { Link } from "react-router-dom";
import { supplyShipments } from "../data/supplyShipments";
import "./SupplyPartnerShipments.css";

function SupplyPartnerShipments() {
  const [shipments, setShipments] = useState(
    supplyShipments
  );

  function updateStatus(shipmentId, newStatus) {
    setShipments((currentShipments) =>
      currentShipments.map((shipment) =>
        shipment.id === shipmentId
          ? {
              ...shipment,
              status: newStatus,
            }
          : shipment
      )
    );
  }

  function getNextStatus(status) {
    if (status === "Processing") {
      return "Shipped";
    }

    if (status === "Shipped") {
      return "Out for Delivery";
    }

    if (status === "Out for Delivery") {
      return "Delivered";
    }

    return null;
  }

  const activeShipments = shipments.filter(
    (shipment) => shipment.status !== "Delivered"
  ).length;

  const deliveredShipments = shipments.filter(
    (shipment) => shipment.status === "Delivered"
  ).length;

  return (
    <div className="supply-shipments-page">

      {/* HEADER */}

      <header className="shipments-header">

        <div>
          <Link
            to="/supply-partner-dashboard"
            className="shipments-back"
          >
            ← Dashboard
          </Link>

          <p className="shipments-eyebrow">
            SUPPLY PARTNER
          </p>

          <h1>Shipments</h1>

          <p className="shipments-subtitle">
            Track products moving through the supply chain.
          </p>
        </div>

      </header>

      {/* SUMMARY */}

      <section className="shipments-summary">

        <div className="shipment-summary-card">
          <div className="shipment-summary-icon">
            <span className="material-symbols-outlined">
              local_shipping
            </span>
          </div>

          <div>
            <small>ACTIVE SHIPMENTS</small>
            <strong>{activeShipments}</strong>
          </div>
        </div>

        <div className="shipment-summary-card">
          <div className="shipment-summary-icon">
            <span className="material-symbols-outlined">
              task_alt
            </span>
          </div>

          <div>
            <small>DELIVERED</small>
            <strong>{deliveredShipments}</strong>
          </div>
        </div>

        <div className="shipment-summary-card">
          <div className="shipment-summary-icon">
            <span className="material-symbols-outlined">
              route
            </span>
          </div>

          <div>
            <small>TOTAL SHIPMENTS</small>
            <strong>{shipments.length}</strong>
          </div>
        </div>

      </section>

      {/* SHIPMENTS */}

      <section className="shipments-card">

        <div className="shipments-card-header">
          <div>
            <p>SUPPLY CHAIN</p>
            <h2>Active Shipments</h2>
          </div>

          <span>
            {shipments.length} shipments
          </span>
        </div>

        <div className="shipments-list">

          {shipments.map((shipment) => {

            const nextStatus = getNextStatus(
              shipment.status
            );

            return (
              <div
                className="shipment-item"
                key={shipment.id}
              >

                {/* MAIN INFO */}

                <div className="shipment-main">

                  <div className="shipment-icon">
                    <span className="material-symbols-outlined">
                      local_shipping
                    </span>
                  </div>

                  <div>

                    <div className="shipment-title-row">

                      <h3>{shipment.product}</h3>

                      <span
                        className={`shipment-status ${shipment.status
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                      >
                        {shipment.status}
                      </span>

                    </div>

                    <p className="shipment-id">
                      {shipment.id} · Order{" "}
                      {shipment.orderId}
                    </p>

                    <p className="shipment-buyer">
                      Buyer:{" "}
                      <strong>
                        {shipment.buyer}
                      </strong>
                    </p>

                  </div>

                </div>

                {/* DETAILS */}

                <div className="shipment-details">

                  <div>
                    <small>QUANTITY</small>
                    <strong>
                      {shipment.quantity}{" "}
                      {shipment.unit}
                    </strong>
                  </div>

                  <div>
                    <small>DESTINATION</small>
                    <strong>
                      {shipment.destination}
                    </strong>
                  </div>

                </div>

                {/* ACTION */}

                {nextStatus && (
                  <div className="shipment-action">

                    <button
                      onClick={() =>
                        updateStatus(
                          shipment.id,
                          nextStatus
                        )
                      }
                    >
                      {nextStatus === "Shipped"
                        ? "Mark as Shipped"
                        : nextStatus ===
                          "Out for Delivery"
                        ? "Out for Delivery"
                        : "Mark as Delivered"}

                      <span className="material-symbols-outlined">
                        arrow_forward
                      </span>
                    </button>

                  </div>
                )}

                {shipment.status === "Delivered" && (
                  <div className="shipment-delivered">

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

export default SupplyPartnerShipments;