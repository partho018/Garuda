import React from 'react';

const ScrollingReferrals = ({ client1, client2, client3, client4, client5, client6, client7, client8 }) => {
    return (
        <section className="referral-section">
            <div className="referral-container">
                <span className="referral-badge">Referral From People</span>
                <h2 className="referral-title">
                    Trusted by People <br />
                    <span className="elegant-serif">Chosen By Brands</span>
                </h2>
            </div>
            <div className="scrolling-container">
                <div className="marquee-wrapper">
                    <div className="marquee-track track-left">
                        {[client1, client2, client3, client4, client1, client2, client3, client4].map((img, i) => (
                            <div className="scrolling-card" key={`r1-${i}`}>
                                <p className="scrolling-text">
                                    "Working with Garuda was a great experience. They were responsible, communicative, and delivered excellent design work. Their team really understood our vision and translated it into a product that exceeded our expectations in every way possible."
                                </p>
                                <div className="scrolling-author">
                                    <img src={img} alt="Client" className="author-img" loading="lazy" decoding="async" />
                                    <div className="author-info">
                                        <span className="author-name">{i % 4 === 0 ? "Sofia Gouveia" : i % 4 === 1 ? "Austin" : i % 4 === 2 ? "Moshiur Rahman" : "Jahnobi"}</span>
                                        <span className="author-role">{i % 4 === 0 ? "Marketing Manager @ Voc AI" : "CEO @ TechFlow"}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="marquee-wrapper">
                    <div className="marquee-track track-right">
                        {[client5, client6, client7, client8, client5, client6, client7, client8].map((img, i) => (
                            <div className="scrolling-card" key={`r2-${i}`}>
                                <p className="scrolling-text">
                                    "Garuda is a professional, reliable partner for end-to-end product builds. From clean, modern designs to seamless systems, they handled everything with total professionalism. I couldn't be happier with our collaboration on this complex project."
                                </p>
                                <div className="scrolling-author">
                                    <img src={img} alt="Client" className="author-img" loading="lazy" decoding="async" />
                                    <div className="author-info">
                                        <span className="author-name">{i % 4 === 0 ? "Dilicio" : i % 4 === 1 ? "Armen Avagyan" : i % 4 === 2 ? "Anika" : "Tanmee"}</span>
                                        <span className="author-role">{i % 4 === 1 ? "CEO & Co Founder @ Fraus" : "Founder @ Coinpulse"}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="marquee-wrapper">
                    <div className="marquee-track track-left">
                        {[client3, client5, client1, client7, client3, client5, client1, client7].map((img, i) => (
                            <div className="scrolling-card" key={`r3-${i}`}>
                                <p className="scrolling-text">
                                    "They translated our business goals into clean, aesthetic designs with total transparency. The team is patient, committed, and a highly recommended design partner for any company looking to elevate their digital presence significantly."
                                </p>
                                <div className="scrolling-author">
                                    <img src={img} alt="Client" className="author-img" loading="lazy" decoding="async" />
                                    <div className="author-info">
                                        <span className="author-name">{i % 4 === 0 ? "Moshiur" : i % 4 === 1 ? "Dilicio" : i % 4 === 2 ? "Sofia" : "Anika"}</span>
                                        <span className="author-role">Product Lead @ Innovate</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(ScrollingReferrals);
