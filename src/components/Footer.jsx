import React from 'react';
import Link from 'next/link';

const Footer = ({ footerImg }) => {
    return (
        <footer className="main-footer">
            <div className="footer-container">
                <div className="footer-col">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/blogs">Blog</Link></li>
                        <li><Link href="/contact">Contact Us</Link></li>
                        <li><a href="/#career">Career</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h3>Services</h3>
                    <ul>
                        <li><a href="/#services">AI Branding</a></li>
                        <li><a href="/#services">Logo Design</a></li>
                        <li><a href="/#services">Web Design</a></li>
                        <li><a href="/#services">AI Content</a></li>
                        <li><a href="/#services">Social Media Management</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h3>Company</h3>
                    <ul>
                        <li><a href="/#testimonials">Meet the Team</a></li>
                        <li><a href="/#pricing">Pricing</a></li>
                        <li><a href="/#why-choose-us">Why Garuda?</a></li>
                        <li><Link href="/contact">Start a Project</Link></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h3>Contact</h3>
                    <ul>
                        <li><a href="mailto:hello@garuda.design">hello@garuda.design</a></li>
                        <li><a href="https://wa.me/" target="_blank" rel="noopener noreferrer">WhatsApp Us</a></li>
                        <li>
                            <Link href="/contact" className="footer-download-btn">
                                Start a Project
                                <span className="download-icon">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-container">
                    <div className="footer-bottom-left">
                        <a href="#">Terms &amp; Conditions</a>
                    </div>
                    <div className="footer-bottom-center">
                        <p>© 2026, Garuda. All Rights Reserved. Powered by <a href="https://pnscode.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Raju</a></p>
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
