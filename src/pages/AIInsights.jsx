import { Link } from "react-router-dom";
import { aiInsights } from "../data/aiInsights";
import "./AIInsights.css";

function AIInsights() {
  return (
    <div className="ai-insights-page">

      {/* =========================
          HEADER
          ========================= */}

      <header className="ai-insights-header">

        <div className="ai-header-content">

          {/* BRAND */}

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


          {/* PAGE TITLE */}

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


      {/* =========================
          INTRODUCTION
          ========================= */}

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


      {/* =========================
          INSIGHT OPTIONS
          ========================= */}

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

              {/* Insight icon */}

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


      {/* =========================
          FUTURE AI
          ========================= */}

      <section className="ai-future-card">

        <div className="future-logo">

          <img
            src="/logo.jpeg"
            alt="सीधा-SAUDA"
          />

        </div>

        <div>

          <h3>
            AI will become more powerful with real data
          </h3>

          <p>
            These insights currently use marketplace data
            and mock values. Later, the backend AI system
            can provide real predictions using product,
            demand, price and supply-chain data.
          </p>

        </div>

      </section>

    </div>
  );
}

export default AIInsights;