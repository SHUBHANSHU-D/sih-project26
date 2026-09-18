import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTracking } from "../services/api";
import "./TraceOrder.css";

function TraceOrder() {
  const [tracking, setTracking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const orderId = localStorage.getItem("lastOrderId");

  useEffect(() => {
    async function loadTracking() {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        const data = await getTracking(orderId);
        setTracking(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadTracking();
  }, [orderId]);

  const stageDefinitions = [
    {
      title: "Farmer / FPO",
      description:
        "Product has been received from the farmer or FPO.",
      location: "Farm / FPO",
    },
    {
      title: "Collection Center",
      description:
        "Produce is collected, weighed and recorded.",
      location: "Collection Center",
    },
    {
      title: "Processing / Grading",
      description:
        "Product is checked, graded and prepared for distribution.",
      location: "Processing / Grading Center",
    },
    {
      title: "Warehouse / Cold Storage",
      description:
        "Product is stored under suitable conditions.",
      location: "Warehouse",
    },
    {
      title: "Logistics / Distribution",
      description:
        "Product is handed over to the logistics partner.",
      location: "Distribution Hub",
    },
    {
      title: "Out for Delivery",
      description:
        "Product is on its way to the buyer.",
      location: "Local Delivery Network",
    },
    {
      title: "Buyer",
      description:
        "Product is delivered to the buyer.",
      location: "Buyer Location",
    },
  ];

  const stages = stageDefinitions.map((stage, index) => {
    const event = tracking[index];

    let status = "Pending";

    if (event) {
      if (index < tracking.length - 1) {
        status = "Completed";
      } else {
        status = "In Progress";
      }
    }

    return {
      number: index + 1,
      title: stage.title,
      description: event?.description || stage.description,
      location: event?.location || stage.location,
      status,
    };
  });

  const currentStage =
    tracking.length > 0
      ? Math.min(tracking.length, stageDefinitions.length)
      : 0;

  return (
    <div className="trace-page">
      <header className="trace-header">
        <div>
          <h1>Trace Order</h1>

          <p>
            Follow your product through the agricultural supply chain.
          </p>
        </div>

        <Link
          to="/orders"
          className="back-orders-link"
        >
          ← My Orders
        </Link>
      </header>

      {!orderId && (
        <section className="no-order">
          <h2>No order selected</h2>

          <p>
            Place an order first to view its supply-chain journey.
          </p>

          <Link
            to="/products"
            className="browse-button"
          >
            Browse Products
          </Link>
        </section>
      )}

      {loading && orderId && (
        <section className="no-order">
          <h2>Loading order tracking...</h2>
        </section>
      )}

      {error && (
        <section className="no-order">
          <h2>Unable to load tracking</h2>

          <p>{error}</p>
        </section>
      )}

      {!loading && !error && orderId && (
        <>
          <section className="trace-order-info">
            <div>
              <span>ORDER ID</span>
              <strong>#{orderId}</strong>
            </div>

            <div>
              <span>CURRENT STAGE</span>
              <strong>
                {currentStage > 0
                  ? `${currentStage} of ${stageDefinitions.length}`
                  : "Not Started"}
              </strong>
            </div>

            <div>
              <span>TRACKING EVENTS</span>
              <strong>{tracking.length}</strong>
            </div>

            <div>
              <span>STATUS</span>
              <strong className="current-status">
                {tracking.length > 0
                  ? tracking[tracking.length - 1].status
                      .replaceAll("_", " ")
                  : "Pending"}
              </strong>
            </div>
          </section>

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
                  {index < stages.length - 1 && (
                    <div className="timeline-line"></div>
                  )}

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
                      {stage.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default TraceOrder;