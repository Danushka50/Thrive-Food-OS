import React from 'react';
import './Process.css';

interface Step {
  id: string;
  title: string;
  text: string;
}

const Process: React.FC = () => {
  const steps: Step[] = [
    { id: '01', title: 'Enter the kitchen', text: 'Browse 200+ fresh ingredients across meat, seafood, vegetables, dairy and more.' },
    { id: '02', title: 'Build Your Plate', text: 'Drag ingredients to your plate. Set exact grams and choose your cook style — grilled, boiled, fried, steamed.' },
    { id: '03', title: 'Track Your Macros', text: 'Watch protein, carbs, fats and calories update live as you build. Hit your exact daily goals.' },
    { id: '04', title: 'We Deliver It', text: 'Name your meal, place your order. Your custom creation arrives fresh to your door in 45 minutes.' },
  ];

  return (
    <section className="process">
      <div className="bg-text-watermark">THRIVE</div>
      <div className="process-content">
        <div className="process-intro">
          <p className="process-label">The Process</p>
          <h2>Four steps.<br />Zero compromise</h2>
        </div>
        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.id} className="step-card">
              <div className="step-number">{step.id}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-text">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;