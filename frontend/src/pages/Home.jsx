import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Water Quality Awareness Tool</h1>
          <p className="hero-subtitle">
            Clean water is the foundation of life. Every person deserves access
            to safe drinking water. Our tool helps you assess your water quality
            instantly and provides actionable health recommendations.
          </p>
          <Link to="/checker" className="btn-primary">
            Check Water Quality
          </Link>
        </div>
        <div className="hero-visual">
          <div className="water-drop">💧</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Water Quality Matters</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🔬</div>
            <h3>Instant Analysis</h3>
            <p>
              Get immediate results by entering key water parameters like pH,
              TDS, turbidity, and temperature.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Health Protection</h3>
            <p>
              Contaminated water causes over 500,000 diarrheal deaths each year.
              Regular monitoring can save lives.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Over Time</h3>
            <p>
              Save your results and track water quality trends with interactive
              charts and history.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>Smart Suggestions</h3>
            <p>
              Receive personalized health recommendations based on your water
              analysis results.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat-item">
          <span className="stat-number">2.2B</span>
          <span className="stat-label">People lack safe water globally</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">80%</span>
          <span className="stat-label">Of diseases linked to unsafe water</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">500K+</span>
          <span className="stat-label">Annual deaths from contaminated water</span>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Start Protecting Your Health Today</h2>
        <p>
          It only takes a minute to check your water quality. Enter your water
          parameters and get instant results with health recommendations.
        </p>
        <div className="cta-buttons">
          <Link to="/checker" className="btn-primary">
            Analyze Your Water
          </Link>
          <Link to="/awareness" className="btn-secondary">
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}
