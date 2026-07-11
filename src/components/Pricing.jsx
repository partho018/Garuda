import React from 'react';
import Link from 'next/link';

const Pricing = () => {
    return (
        <section className="pricing-plans-section" id="pricing">
            <div className="pricing-container">
                <span className="pricing-badge">Pricing plans</span>
                <h2 className="pricing-title">
                    <span className="elegant-serif">Unbeatable</span> Value <br />
                    Unmatched <span className="elegant-serif">Quality</span>
                </h2>

                <div className="pricing-grid">
                    <div className="pricing-card">
                        <div className="price-top">
                            <h3 className="plan-price">₹1,50,00</h3>
                            <p className="plan-subtitle">Ideal for Startup Owners, MVP Builders</p>
                            <h4 className="plan-name">Website Design</h4>
                            <div className="plan-divider"></div>
                        </div>
                        <ul className="plan-features">
                            <li><span className="check-icon">✓</span> Design Style Guide</li>
                            <li><span className="check-icon">✓</span> Responsive across all devices</li>
                            <li><span className="check-icon">✓</span> Unlimited Revisions</li>
                            <li><span className="check-icon">✓</span> Developer Handoff</li>
                        </ul>
                        <Link href="/contact" className="pricing-cta" style={{ textDecoration: 'none' }}>
                            Explore More <span className="cta-arrow-right">→</span>
                        </Link>
                    </div>

                    <div className="pricing-card highlighted">
                        <div className="price-top">
                            <h3 className="plan-price">₹29,000</h3>
                            <p className="plan-subtitle">For SaaS & fast MVP launches.</p>
                            <h4 className="plan-name">Web/Mobile App Design</h4>
                            <div className="plan-divider"></div>
                        </div>
                        <ul className="plan-features">
                            <li><span className="check-icon">✓</span> UX Research</li>
                            <li><span className="check-icon">✓</span> Design System with token</li>
                            <li><span className="check-icon">✓</span> Unlimited Revisions</li>
                            <li><span className="check-icon">✓</span> Developer handoff</li>
                            <li><span className="check-icon">✓</span> Transparent communication</li>
                            <li><span className="check-icon">✓</span> Responsive across all devices</li>
                        </ul>
                        <Link href="/contact" className="pricing-cta pink" style={{ textDecoration: 'none' }}>
                            Explore More <span className="cta-arrow-right">→</span>
                        </Link>
                    </div>

                    <div className="pricing-card">
                        <div className="price-top">
                            <h3 className="plan-price">₹31,500+</h3>
                            <p className="plan-subtitle">Ideal for Startup or MVP</p>
                            <h4 className="plan-name">Monthly Subscription</h4>
                            <div className="plan-divider"></div>
                        </div>
                        <ul className="plan-features">
                            <li><span className="check-icon">✓</span> Monthly dedicated designers</li>
                            <li><span className="check-icon">✓</span> Adhoc design support</li>
                            <li><span className="check-icon">✓</span> Right designer for right product</li>
                            <li><span className="check-icon">✓</span> Transparent communication</li>
                        </ul>
                        <Link href="/contact" className="pricing-cta" style={{ textDecoration: 'none' }}>
                            Explore More <span className="cta-arrow-right">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Pricing);
