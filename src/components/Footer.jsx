import React from 'react';

const Footer = ({ footerImg }) => {
    return (
        <footer className="main-footer">
            <div className="footer-container">
                <div className="footer-col">
                    <h3>Important Links</h3>
                    <ul>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Products</a></li>
                        <li><a href="#">Industry</a></li>

                    </ul>
                </div>
                <div className="footer-col">
                    <h3>Services</h3>
                    <ul>
                        <li><a href="#">UI/UX Design</a></li>
                        <li><a href="#">Web Design</a></li>
                        <li><a href="#">Logo & Branding</a></li>
                        <li><a href="#">Webflow Design</a></li>
                        <li><a href="#">Framer Design</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h3>Specialized Industry</h3>
                    <ul>
                        <li><a href="#">Fintech Industry</a></li>
                        <li><a href="#">Healthcare & Fitness Industry</a></li>
                        <li><a href="#">Edtech Industry</a></li>
                        <li><a href="#">Cybersecurity Industry</a></li>
                        <li>
                            <a href="#" className="footer-download-btn">
                                Company Deck
                                <span className="download-icon">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h3>Compare</h3>
                    <ul>
                        <li><a href="#">Vs Agencies</a></li>
                        <li><a href="#">Vs Freelancers</a></li>
                        <li><a href="#">Vs Inhouse</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-container">
                    <div className="footer-bottom-left">
                        <a href="#">Terms & Conditions</a>
                    </div>
                    <div className="footer-bottom-center">
                        <p>© 2026, Garuda, All Rights Reserved. Power by <a href="https://pnscode.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Raju</a></p>
                    </div>
                    <div className="footer-bottom-right">
                        <a href="#">Privacy Policy</a>
                    </div>
                </div>
            </div>

            <div className="footer-extra-image">
                <img src={footerImg} alt="Decorative Footer" loading="lazy" decoding="async" />
            </div>
        </footer>
    );
};

export default React.memo(Footer);
