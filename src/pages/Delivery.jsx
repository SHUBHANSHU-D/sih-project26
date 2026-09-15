import { Link } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import "./Delivery.css";

function Delivery() {
  const { orders } = useOrders();

  const latestOrder = orders[0];

  if (!latestOrder) {
    return (
      <div className="delivery-page">
        <header className="delivery-header">
          <div>
            <h1>Delivery</h1>
            <p>Track your order delivery status.</p>
          </div>

          <Link to="/buyer-dashboard" className="back-button">
            ← Dashboard
          </Link>
        </header>

        <div className="delivery-empty">
          <div className="empty-icon">🚚</div>
          <h2>No active delivery</h2>
          <p>
            Once you place an order, its delivery information will appear
            here.
          </p>

          <Link to="/products" className="shop-button">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const deliveryStages = [
    {
      title: "Order Confirmed",
      description: "Your order has been confirmed by the marketplace.",
      location: "FarmConnect Marketplace",
      status: "completed",
    },
    {
      title: "Order Packed",
      description: "Products have been checked and packed for transportation.",
      location: "Supply Partner",
      status: "completed",
    },
    {
      title: "Dispatched",
      description: "Your order has been handed over for transportation.",
      location: "Warehouse",
      status: "completed",
    },
    {
      title: "Distribution Center",
      description: "Your order has reached the local distribution center.",
      location: "Indore Distribution Center",
      status: "completed",
    },
    {
      title: "Out for Delivery",
      description: "Your order is on the way to your delivery address.",
      location: "Indore, Madhya Pradesh",
      status: "current",
    },
    {
      title: "Delivered",
      description: "Your order will be marked delivered after successful delivery.",
      location: "Your Address",
      status: "pending",
    },
  ];

  return (
    <div className="delivery-page">
      <header className="delivery-header">
        <div>
          <h1>Delivery</h1>
          <p>Track your order from dispatch to doorstep.</p>
        </div>

        <Link to="/buyer-dashboard" className="back-button">
          ← Dashboard
        </Link>
      </header>

      {/* Delivery Status */}
      <section className="delivery-status-card">
        <div className="status-main">
          <div className="truck-icon">🚚</div>

          <div>
            <span className="status-label">CURRENT STATUS</span>
            <h2>Out for Delivery</h2>
            <p>Your order is on the way to you.</p>
          </div>
        </div>

        <div className="delivery-date">
          <span>Expected Delivery</span>
          <strong>16 September 2026</strong>
        </div>
      </section>

      {/* Order Information */}
      <section className="delivery-info-grid">
        <div className="info-card">
          <span>ORDER ID</span>
          <strong>{latestOrder.id}</strong>
        </div>

        <div className="info-card">
          <span>ITEMS</span>
          <strong>{latestOrder.items.length} product(s)</strong>
        </div>

        <div className="info-card">
          <span>ORDER TOTAL</span>
          <strong>₹{latestOrder.finalTotal}</strong>
        </div>

        <div className="info-card">
          <span>LOGISTICS PARTNER</span>
          <strong>FarmConnect Logistics</strong>
        </div>
      </section>

      {/* Current Location */}
      <section className="current-location">
        <div className="location-icon">📍</div>

        <div>
          <span>YOUR ORDER IS CURRENTLY AT</span>
          <h3>Indore Distribution Center</h3>
          <p>
            The shipment has left the distribution center and is being
            delivered to your address.
          </p>
        </div>
      </section>

      {/* Delivery Address */}
      <section className="delivery-address-card">
        <div>
          <span>DELIVERING TO</span>
          <h2>{latestOrder.customer.fullName}</h2>

          <p>
            {latestOrder.customer.address}
            <br />
            {latestOrder.customer.city},{" "}
            {latestOrder.customer.state} -{" "}
            {latestOrder.customer.pincode}
          </p>

          <p>📱 {latestOrder.customer.mobile}</p>
        </div>
      </section>

      {/* Delivery Timeline */}
      <section className="timeline-card">
        <div className="section-heading">
          <div>
            <h2>Delivery Progress</h2>
            <p>Follow the movement of your order.</p>
          </div>

          <span className="progress-text">5 of 6 stages</span>
        </div>

        <div className="delivery-timeline">
          {deliveryStages.map((stage, index) => (
            <div
              className={`delivery-stage ${stage.status}`}
              key={stage.title}
            >
              <div className="stage-marker">
                {stage.status === "completed" ? "✓" : index + 1}
              </div>

              {index < deliveryStages.length - 1 && (
                <div className="stage-line"></div>
              )}

              <div className="stage-content">
                <div className="stage-top">
                  <div>
                    <span className="stage-number">
                      STAGE {index + 1}
                    </span>

                    <h3>{stage.title}</h3>
                  </div>

                  <span className={`stage-status ${stage.status}`}>
                    {stage.status === "completed"
                      ? "Completed"
                      : stage.status === "current"
                      ? "In Progress"
                      : "Pending"}
                  </span>
                </div>

                <p>{stage.description}</p>

                <div className="stage-location">
                  📍 {stage.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trace Order */}
      <section className="trace-delivery-card">
        <div>
          <h2>Want to see the complete supply chain?</h2>
          <p>
            See how your product moved from its source through collection,
            processing, storage and logistics.
          </p>
        </div>

        <Link to="/trace-order" className="trace-button">
          View Supply Chain →
        </Link>
      </section>
    </div>
  );
}

export default Delivery;