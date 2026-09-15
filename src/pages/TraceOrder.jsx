import { Link } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import "./TraceOrder.css";

function TraceOrder() {
  const { orders } = useOrders();

  // For now, show the most recently placed order.
  // Later the backend will provide the selected order's trace data.
  const order = orders[0];

  const stages = [
    {
      number: 1,
      title: "Farmer / FPO",
      description: "Product harvested and prepared for collection.",
      location: "Farm / FPO",
      status: "Completed",
    },
    {
      number: 2,
      title: "Collection Center",
      description: "Produce collected, weighed and recorded.",
      location: "Collection Center",
      status: "Completed",
    },
    {
      number: 3,
      title: "Processing / Grading",
      description: "Product checked, graded and packed where required.",
      location: "Processing Center",
      status: "Completed",
    },
    {
      number: 4,
      title: "Warehouse / Cold Storage",
      description: "Product stored under suitable conditions.",
      location: "Warehouse",
      status: "Completed",
    },
    {
      number: 5,
      title: "Logistics / Distribution",
      description: "Order dispatched for delivery to the buyer.",
      location: "Distribution Network",
      status: "In Progress",
    },
    {
      number: 6,
      title: "Buyer",
      description: "Order will be delivered to the buyer.",
      location: order
        ? `${order.customer.city}, ${order.customer.state}`
        : "Delivery Address",
      status: "Pending",
    },
  ];

  return (
    <div className="trace-page">

      {/* Header */}
      <header className="trace-header">
        <div>
          <h1>Trace Order</h1>
          <p>
            Follow your product through the agricultural supply chain.
          </p>
        </div>

        <Link to="/orders" className="back-orders-link">
          ← My Orders
        </Link>
      </header>

      {/* Order Information */}
      {order ? (
        <section className="trace-order-info">

          <div>
            <span>Order ID</span>
            <strong>{order.id}</strong>
          </div>

          <div>
            <span>Order Date</span>
            <strong>{order.date}</strong>
          </div>

          <div>
            <span>Status</span>
            <strong className="current-status">
              {order.status}
            </strong>
          </div>

          <div>
            <span>Total</span>
            <strong>₹{order.finalTotal}</strong>
          </div>

        </section>
      ) : (
        <section className="no-order">
          <h2>No order selected</h2>
          <p>
            Place an order first to view its supply-chain journey.
          </p>

          <Link to="/products" className="browse-button">
            Browse Products
          </Link>
        </section>
      )}

      {/* Supply Chain */}
      {order && (
        <section className="trace-section">

          <div className="section-heading">
            <h2>Supply Chain Journey</h2>
            <p>
              See how your product moves from its source to you.
            </p>
          </div>

          <div className="timeline">

            {stages.map((stage, index) => (

              <div
                className="timeline-item"
                key={stage.number}
              >

                {/* Timeline Line */}
                {index < stages.length - 1 && (
                  <div className="timeline-line"></div>
                )}

                {/* Number */}
                <div
                  className={`timeline-number ${
                    stage.status === "Completed"
                      ? "completed"
                      : stage.status === "In Progress"
                      ? "in-progress"
                      : "pending"
                  }`}
                >
                  {stage.status === "Completed"
                    ? "✓"
                    : stage.number}
                </div>

                {/* Content */}
                <div className="timeline-content">

                  <div className="timeline-title">

                    <div>
                      <span className="stage-label">
                        Stage {stage.number}
                      </span>

                      <h3>{stage.title}</h3>
                    </div>

                    <span
                      className={`stage-status ${
                        stage.status
                          .toLowerCase()
                          .replace(" ", "-")
                      }`}
                    >
                      {stage.status}
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
      )}

      {/* Price Transparency */}
      {order && (
        <section className="trace-price-section">

          <div className="section-heading">
            <h2>Price Transparency</h2>
            <p>
              Understand how the final product price is built.
            </p>
          </div>

          <div className="price-box">

            {order.items.map((item) => {

              const farmerPrice = item.farmerPrice || 0;
              const supplyCost = item.supplyCost || 0;
              const logisticsCost = item.logisticsCost || 0;

              return (
                <div
                  className="price-product"
                  key={item.id}
                >

                  <div className="price-product-header">
                    <strong>{item.name}</strong>
                    <span>
                      {item.quantity} kg
                    </span>
                  </div>

                  <div className="price-row">
                    <span>Farmer / FPO</span>
                    <strong>
                      ₹{farmerPrice * item.quantity}
                    </strong>
                  </div>

                  <div className="price-row">
                    <span>Supply-chain services</span>
                    <strong>
                      ₹{supplyCost * item.quantity}
                    </strong>
                  </div>

                  <div className="price-row">
                    <span>Logistics</span>
                    <strong>
                      ₹{logisticsCost * item.quantity}
                    </strong>
                  </div>

                  <div className="price-row final-price">
                    <span>Product price</span>
                    <strong>
                      ₹{item.price * item.quantity}
                    </strong>
                  </div>

                </div>
              );
            })}

          </div>

        </section>
      )}

    </div>
  );
}

export default TraceOrder;