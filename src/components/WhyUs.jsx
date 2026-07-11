import React from 'react';

const WhyUs = () => {
    return (
        <section className="why-us-section">
            <div className="why-us-container">
                <span className="why-us-badge">What Sets Us Apart</span>
                <h2 className="why-us-title">
                    Why Us? Because Your <span className="elegant-serif">Growth Is Our Mission</span>
                </h2>
                <p className="why-us-subtitle">
                    See the difference thoughtful design makes. Our works highlight the dedication <br />
                    we bring to every client partnership.
                </p>
            </div>
        </section>
    );
};

export default React.memo(WhyUs);
