import React from 'react';
import boxerImage from '../assets/boxer-girl.png';
import './Hero.css';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <div className="hero-image-block">
                    <img src={boxerImage} alt="Focused athlete" />
                </div>
                <div className="hero-text-block">
                    <h1>You design.<br />We cook.<br />All win.</h1>
                    <p>
                        Build your perfect meal from scratch. Choose every ingredient,
                        every gram, every cook style. We make it. We deliver it.
                        Your macros, your rules.
                    </p>
                    <Link to="/build" className="build-btn-link">
                        <button className="cta-button">Build My Meal</button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;