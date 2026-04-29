import React from 'react';
import './CommunityKitchen.css';

interface Comment {
  user: string;
  text: string;
}

interface CommunityCardProps {
  userName: string;
  timeAgo: string;
  mealName: string;
  tags: string[];
  macros: { p: string; c: string; f: string; k: string };
  comments: Comment[];
}

const CommunityCard: React.FC<CommunityCardProps> = ({ userName, timeAgo, mealName, tags, macros, comments }) => (
  <div className="community-card">
    <div className="card-header">
      <div className="avatar">A</div>
      <div className="user-info">
        <h4>{userName}</h4>
        <span>{timeAgo}</span>
      </div>
    </div>

    <h3 className="community-meal-name">"{mealName}"</h3>
    
    <div className="tag-cloud">
      {tags.map(tag => <span key={tag} className="pill-tag">{tag}</span>)}
    </div>

    <div className="community-macro-row">
      <div className="c-macro"><strong>{macros.p}</strong><span>Protein</span></div>
      <div className="c-macro"><strong>{macros.c}</strong><span>Carbs</span></div>
      <div className="c-macro"><strong>{macros.f}</strong><span>Fats</span></div>
      <div className="c-macro"><strong>{macros.k}</strong><span>Kcal</span></div>
    </div>

    <div className="comments-section">
      {comments.map((c, i) => (
        <p key={i}><strong>{c.user}:</strong> {c.text}</p>
      ))}
    </div>

    <button className="build-similar-btn">BUILD SIMILAR</button>
  </div>
);

const CommunityKitchen: React.FC = () => {
  const dummyCard = {
    userName: "Ashan AK",
    timeAgo: "2 Hours Ago",
    mealName: "Post-Leg-Day Recovery Bowl",
    tags: ["Chicken Thigh", "Spinach", "Sweet Potato", "Grilled"],
    macros: { p: "40g", c: "35g", f: "15g", k: "450" },
    comments: [
      { user: "Dinusha", text: "This is exactly what I needed after squats." },
      { user: "Ravi", text: "Added extra broccoli and it was perfect." }
    ]
  };

  return (
    <section className="community-section">
      <div className="community-intro">
        <p className="lime-label">Community Kitchen</p>
        <h2 className="sakana-font">Meals built by<br/>real people.</h2>
        <p className="community-desc">
          Every meal you build gets a name and a place in our community. 
          Browse what others are eating, comment, get inspired and build your own version.
        </p>
      </div>

      <div className="community-grid">
        <CommunityCard {...dummyCard} />
        <CommunityCard {...dummyCard} />
        <CommunityCard {...dummyCard} />
      </div>

      {/* Bottom CTA Banner */}
      <div className="join-banner">
        <h2>Build your meal. Name it. Get it listed.</h2>
        <button className="join-btn">Join the Community</button>
      </div>
    </section>
  );
};

export default CommunityKitchen;