import React from 'react';

const WhyChooseUs = ({ infinityIcon, profileIcon, dollarIcon, diagramIcon, starIcon }) => {
    return (
        <section className="why-choose-us-section" id="why-choose-us">
            <div className="why-choose-us-container">
                <span className="why-choose-us-badge">Why Choose Us</span>
                <h2 className="why-choose-us-title">
                    We <span className="elegant-serif dark">Design</span> for the <span className="elegant-serif dark">Future</span> to <br />
                    Drive Today's <span className="elegant-serif dark">Success</span>
                </h2>

                <div className="why-choose-us-grid">
                    <div className="wcu-card">
                        <div className="wcu-icon-wrapper">
                            <img src={infinityIcon} alt="Unlimited Revisions" loading="lazy" />
                        </div>
                        <h3 className="wcu-card-title">Unlimited Revisions</h3>
                        <p className="wcu-card-desc">
                            We're committed to your satisfaction with unlimited revisions at every step.
                            Our mission is to make your vision come to life exactly as you imagine.
                        </p>
                    </div>

                    <div className="wcu-card">
                        <div className="wcu-icon-wrapper">
                            <img src={profileIcon} alt="Lifetime Support" loading="lazy" />
                        </div>
                        <h3 className="wcu-card-title">Lifetime Support</h3>
                        <p className="wcu-card-desc">
                            With our lifetime support, you're never alone. We'll be there for you at every
                            stage with necessary guidance and assistance whenever you need it.
                        </p>
                    </div>

                    <div className="wcu-card">
                        <div className="wcu-icon-wrapper">
                            <img src={dollarIcon} alt="Personalised Plans" loading="lazy" />
                        </div>
                        <h3 className="wcu-card-title">Personalised Plans</h3>
                        <p className="wcu-card-desc">
                            Get top-quality service without breaking the bank. Our rates are
                            designed to fit your budget so that you can get the best value for your investment.
                        </p>
                    </div>

                    <div className="wcu-card">
                        <div className="wcu-icon-wrapper">
                            <img src={diagramIcon} alt="Custom Design Solutions" loading="lazy" />
                        </div>
                        <h3 className="wcu-card-title">Custom Design Solutions</h3>
                        <p className="wcu-card-desc">
                            Our easy payment options are completely flexible. So, you can invest
                            in your success while staying within your budget.
                        </p>
                    </div>

                    <div className="wcu-card">
                        <div className="wcu-icon-wrapper">
                            <img src={starIcon} alt="24/7 Customer Support" loading="lazy" />
                        </div>
                        <h3 className="wcu-card-title">24/7 Customer Support</h3>
                        <p className="wcu-card-desc">
                            Benefit from the expertise of our carefully chosen resources that are
                            designed to make your journey smooth and effortless with outstanding results.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(WhyChooseUs);
