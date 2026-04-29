import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer-section">
            <div className="brand-column">
                <div className="footer-logo">THRIVE</div>
                <p className="brand-tagline">Precision Fuel for Performance</p>
            </div>
            <div className="footer-top">
                <div className="links-grid">
                    <div className="link-group">
                        <h5>PRODUCT LINKS</h5>
                        <ul>
                            <li><a href="#">Digital Kitchen</a></li>
                            <li><a href="#">How It Works</a></li>
                            <li><a href="#">Pricing / Meals</a></li>
                            <li><a href="#">Scheduling</a></li>
                        </ul>
                    </div>

                    <div className="link-group">
                        <h5>COMPANY</h5>
                        <ul>
                            <li><a href="#">About THRYV</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">Press / Media</a></li>
                        </ul>
                    </div>

                    <div className="link-group">
                        <h5>SUPPORT</h5>
                        <ul>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">FAQs</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div className="link-group">
                        <h5>SOCIAL</h5>
                        <ul>
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">TikTok</a></li>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">YouTube</a></li>
                        </ul>
                    </div>
                </div>

                <div className="newsletter-column">
                    <h5>Stay in control of your nutrition.</h5>
                    <div className="input-wrapper">
                        <input type="email" placeholder="Email" />
                        <button className="join-thryv-btn">Join THRYV</button>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bg-text">Build your meals. Track your nutrition. Own your lifestyle.</div>
                <p className="copyright">© 2026 THRYV. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;