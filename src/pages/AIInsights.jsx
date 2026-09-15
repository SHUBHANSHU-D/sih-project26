import { Link } from "react-router-dom";
import { aiInsights } from "../data/aiInsights";
import "./AIInsights.css";

function AIInsights() {
  return (
    <div className="ai-insights-page">
      <header className="ai-insights-header">
        <div>
          <span className="ai-label">FARMCONNECT AI</span>

          <h1>AI Insights</h1>

          <p>
            Use data-driven insights to make better agricultural
            purchasing decisions.
          </p>
        </div>

        <Link to="/buyer-dashboard" className="ai-back-button">
          ← Dashboard
        </Link>
      </header>

      {/* Introduction */}

      <section className="ai-intro-card">
        <div className="ai-intro-icon">🤖</div>

        <div>
          <span>SMART MARKETPLACE</span>

          <h2>Make informed buying decisions</h2>

          <p>
            FarmConnect AI can analyze product prices, demand,
            availability and market information to provide useful
            insights.
          </p>
        </div>
      </section>

      {/* Insight Options */}

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
                {insight.icon}
              </div>

              <div className="insight-card-content">
                <div className="insight-title-row">
                  <h3>{insight.title}</h3>

                  <span className="insight-status">
                    {insight.status}
                  </span>
                </div>

                <p>{insight.description}</p>

                <button
                  className="insight-button"
                  type="button"
                >
                  View Insight →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Future AI */}

      <section className="ai-future-card">
        <div className="future-icon">🌱</div>

        <div>
          <h3>AI will become more powerful with real data</h3>

          <p>
            These insights currently use marketplace data and
            mock values. Later, the backend AI system can provide
            real predictions using product, demand, price and
            supply-chain data.
          </p>
        </div>
      </section>
    </div>
  );
}

export default AIInsights;