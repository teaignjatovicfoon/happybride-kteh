import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      <section className="hero">
        <div className="hero-content">
          <h1>Your perfect wedding is waiting for you</h1>
          <p>
            Everything you need in one place – vendors, plan and inspo.
          </p>

          <div className="hero-buttons">
            <button onClick={() => navigate("/vendors")}>
              Vendors
            </button>
            <button onClick={() => navigate("/inspo")}>
              Inspo
            </button>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Everything you can do</h2>

        <div className="grid">
          <div className="card"> Vendors</div>
          <div className="card"> Plan</div>
          <div className="card"> Inspo</div>
        </div>
      </section>

      <section className="preview">
        <h2>Most popular</h2>

        <div className="preview-cards">
          <div className="mini-card">Dress inspo</div>
          <div className="mini-card">Fun catering</div>
          <div className="mini-card">Wedding band inspo</div>
        </div>
      </section>

      <section className="cta">
        <h2>Start planing today</h2>
        <button onClick={() => navigate("/plan")}>
          Open planner
        </button>
      </section>

    </div>
  );
}

export default Home;