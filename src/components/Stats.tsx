import React from 'react';
import './Stats.css';

const Stats: React.FC = () => {
  return (
    <section className="stats">
      <div className="stat-item">
        <div className="stat-number">200+</div>
        <div className="stat-label">Ingredients</div>
      </div>
      <div className="stat-item">
        <div className="stat-number">45 Min</div>
        <div className="stat-label">Average Delivery</div>
      </div>
      <div className="stat-item">
        <div className="stat-number">100%</div>
        <div className="stat-label">Your Recipe</div>
      </div>
    </section>
  );
};

export default Stats;