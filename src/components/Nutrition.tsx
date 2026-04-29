import React from 'react';
import './Nutrition.css';

interface MacroProps {
  label: string;
  value: string;
  percentage: number;
}

const MacroRow: React.FC<MacroProps> = ({ label, value, percentage }) => (
  <div className="macro-row">
    <span className="macro-label">{label}</span>
    <div className="progress-bg">
      <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
    </div>
    <span className="macro-value">{value}</span>
  </div>
);

const Nutrition: React.FC = () => {
  return (
    <section className="nutrition-section">
      <div className="nutrition-container">
        
        {/* Left Side: The Data Card */}
        <div className="stats-card">
          <p className="card-subtitle">This Week</p>
          
          <div className="macros-list">
            <MacroRow label="Protein" value="248g" percentage={65} />
            <MacroRow label="Carbs" value="310g" percentage={30} />
            <MacroRow label="Fats" value="84g" percentage={20} />
          </div>

          <hr className="divider" />

          <div className="card-footer-stats">
            <div className="footer-item">
              <span className="footer-num highlight">3,567</span>
              <span className="footer-label">Kcal Total</span>
            </div>
            <div className="footer-item">
              <span className="footer-num highlight">7</span>
              <span className="footer-label">Meals Built</span>
            </div>
            <div className="footer-item">
              <span className="footer-num highlight">84%</span>
              <span className="footer-label">Goal Hit</span>
            </div>
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="nutrition-info">
          <p className="section-tag">Nutrition Intelligence</p>
          <h2 className="section-title">Know exactly<br />what you eat.</h2>
          <p className="section-desc">
            Every meal you build is tracked automatically. View your daily, 
            weekly and monthly macro history right from your profile. No 
            guesswork. No hidden ingredients. Just clean data that helps you 
            perform better.
          </p>
          <button className="outline-button">VIEW MY NUTRITION</button>
        </div>

      </div>
    </section>
  );
};

export default Nutrition;