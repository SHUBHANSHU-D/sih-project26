import { Link } from "react-router-dom";
import { aiInsights } from "../data/aiInsights";
import { predictDemand, optimizeRoute } from "../services/api";
import { useState } from "react";
import "./AIInsights.css";

function AIInsights() {
  const [demandResult, setDemandResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const [routeResult, setRouteResult] = useState(null);
const [routeLoading, setRouteLoading] = useState(false);
const [routeError, setRouteError] = useState("");

  async function handleRouteOptimization() {
  setRouteLoading(true);
  setRouteError("");

  try {
    const result = await optimizeRoute(
      {
        name: "Bhopal Farm Hub",
        latitude: 23.2599,
        longitude: 77.4126
      },
      [
        {
          name: "Bhopal Warehouse",
          latitude: 23.2599,
          longitude: 77.4326
        },
        {
          name: "Bhopal Market",
          latitude: 23.2500,
          longitude: 77.4000
        },
        {
          name: "LNCT Campus",
          latitude: 23.3068,
          longitude: 77.3600
        }
      ]
    );

    setRouteResult(result);
  } catch (err) {
    setRouteError(err.message);
  } finally {
    setRouteLoading(false);
  }
}

  async function handleDemandPrediction() {
    setLoading(true);
    setError("");

    try {
      const result = await predictDemand(
        "Tomato",
        [420, 450, 470, 510, 550, 590, 620],
        7
      );

      setDemandResult(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ai-insights-page">

      <header className="ai-insights-header">

        <div className="ai-header-content">


          <div className="ai-brand">

            <img
              src="/logo.jpeg"
              alt="सीधा-SAUDA Logo"
              className="ai-brand-logo"
            />

            <div>
              <h1>सीधा-SAUDA</h1>

              <p className="ai-brand-tagline">
                किसान से सीधे बाजार तक
              </p>
            </div>

          </div>


          <div className="ai-page-title">

            <span className="ai-label">
              सीधा-SAUDA AI
            </span>

            <h2>AI Insights</h2>

            <p>
              Use data-driven insights to make better
              agricultural purchasing decisions.
            </p>

          </div>

        </div>


        <Link
          to="/buyer-dashboard"
          className="ai-back-button"
        >
          ← Dashboard
        </Link>

      </header>

      <section className="ai-intro-card">

        <div className="ai-intro-logo">

          <img
            src="/logo.jpeg"
            alt="सीधा-SAUDA"
          />

        </div>

        <div>

          <span>SMART MARKETPLACE</span>

          <h2>
            Make informed buying decisions
          </h2>

          <p>
            सीधा-SAUDA AI can analyze product prices,
            demand, availability and market information
            to provide useful insights.
          </p>

        </div>

      </section>

      <section className="insights-section">

        <div className="insights-heading">

          <div>

            <h2>Available Insights</h2>

            <p>
              Select an insight to explore.
            </p>

          </div>

          <span className="insight-count">
            {aiInsights.length} Insights
          </span>

        </div>


        <div className="insights-grid">

          {aiInsights.map((insight) => (

            <article
              className="insight-card"
              key={insight.id}
            >
              <div className="insight-icon">
                <span className="material-symbols-outlined">
                  auto_awesome
                </span>
              </div>


              <div className="insight-card-content">

                <div className="insight-title-row">

                  <h3>
                    {insight.title}
                  </h3>

                  <span className="insight-status">
                    {insight.status}
                  </span>

                </div>


                <p>
                  {insight.description}
                </p>


                {insight.type === "forecast" && (
                  <button
                    className="insight-button"
                    type="button"
                    onClick={handleDemandPrediction}
                  >
                    View Demand Forecast →
                  </button>
                )}

                {insight.type === "route" && (
                  <>
                    <button
                      className="insight-button"
                      type="button"
                      onClick={handleRouteOptimization}
                    >
                      Optimize Route →
                    </button>

                    {routeLoading && (
                      <p>Optimizing delivery route...</p>
                    )}

                    {routeError && (
                      <p>{routeError}</p>
                    )}

                    {routeResult && (
                      <div className="ai-result">
                        <h3>Optimized Delivery Route</h3>

                        <p>
                          <strong>Total Stops:</strong>{" "}
                          {routeResult.total_stops}
                        </p>

                        <p>
                          <strong>Estimated Distance:</strong>{" "}
                          {routeResult.estimated_distance_km} km
                        </p>

                        <h4>Route</h4>

                        <ol>
                          {routeResult.route.map((stop, index) => (
                            <li key={index}>{stop}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </>
                )}

                {insight.type !== "forecast" &&
                insight.type !== "route" && (
                  <button
                    className="insight-button"
                    type="button"
                  >
                    View Insight →
                  </button>
                )}

              </div>

            </article>

          ))}

        </div>

      </section>

      {loading && (
        <section className="ai-intro-card">
          <div>
            <h2>Generating AI prediction...</h2>
            <p>Please wait while the backend analyzes the demand data.</p>
          </div>
        </section>
      )}

      {error && (
        <section className="ai-intro-card">
          <div>
            <h2>AI prediction failed</h2>
            <p>{error}</p>
          </div>
        </section>
      )}
{demandResult && (
  <section className="ai-intro-card">
    <div>
      <span>AI DEMAND FORECAST</span>

      <h2>{demandResult.product_name}</h2>

      <p>
        Predicted demand: <strong>{demandResult.predicted_demand}</strong>
      </p>

      <p>
        Forecast period: <strong>{demandResult.forecast_days} days</strong>
      </p>

      <p>
        Market trend: <strong>{demandResult.trend}</strong>
      </p>

      <p>
        Recommendation: <strong>{demandResult.recommendation}</strong>
      </p>
    </div>
  </section>
)}

<section className="ai-future-card">

  <div className="future-logo">

    <img
      src="/logo.jpeg"
      alt="सीधा-SAUDA"
    />

  </div>

  <div>

    

    

  </div>

</section>

</div>
);
}

export default AIInsights;