import React from 'react';
import './FinalCTA.css';
import { Link } from 'react-router-dom';

const FinalCTA: React.FC = () => {
  return (
    <section className="final-cta-section">
      <div className="cta-container">
        <h2 className="cta-heading">
          Stop Guessing.<br />
          Start Thriving.
        </h2>

        <p className="cta-subtext">
          <p className="cta-link">Your perfect meal is three clicks away.</p>
        </p>
        <Link to="/build">
          <button className="cta-black-btn">Build Your Meal</button>
        </Link>
      </div>
    </section>
  );
};

export default FinalCTA;