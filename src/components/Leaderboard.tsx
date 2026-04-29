import React from 'react';
import './Leaderboard.css';

interface Architect {
  id: string;
  name: string;
  location: string;
  mealCount: number;
  badge: string;
}

const LeaderboardRow: React.FC<{ data: Architect }> = ({ data }) => (
  <div className="leaderboard-row">
    <div className="rank-number">{data.id}</div>
    
    <div className="user-profile">
      <div className="profile-avatar">AK</div>
      <div className="profile-details">
        <h4>{data.name}</h4>
        <span>{data.location}</span>
      </div>
    </div>

    <div className="meal-stats">
      {data.mealCount} Meals
    </div>

    <div className="badge-container">
      <span className={`status-badge ${data.badge.toLowerCase().replace(' ', '-')}`}>
        {data.badge}
      </span>
    </div>
  </div>
);

const Leaderboard: React.FC = () => {
  const architects: Architect[] = [
    { id: '01', name: 'Ashan Karunarathne', location: 'Kandy', mealCount: 34, badge: 'TOP BUILDER' },
    { id: '02', name: 'Ashan Karunarathne', location: 'Kandy', mealCount: 20, badge: 'RISING STAR' },
    { id: '03', name: 'Ashan Karunarathne', location: 'Kandy', mealCount: 14, badge: 'CONSISTENT' },
  ];

  return (
    <section className="leaderboard-section">
      <div className="leaderboard-header">
        <p className="top-tag">Top Builders</p>
        <h2 className="sakana-font">This month's<br />meal architects.</h2>
      </div>

      <div className="leaderboard-container">
        {architects.map((person) => (
          <LeaderboardRow key={person.id} data={person} />
        ))}
      </div>
    </section>
  );
};

export default Leaderboard;