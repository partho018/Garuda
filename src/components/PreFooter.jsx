import React from 'react';

const PreFooter = ({ fortyPlus }) => {
    return (
        <>
            <section className="trust-banner-section">
                <div className="trust-banner-container">
                    <div className="trust-pill">
                        {fortyPlus && (
                            <div className="trust-pill-avatars">
                                <img src={fortyPlus} alt="40+ Trusted" loading="lazy" />
                            </div>
                        )}
                        <div className="trust-marquee-wrapper">
                            <div className="trust-marquee-content">
                                <div className="trust-pill-text">
                                    Why Risk It With The <span className="elegant-serif">Wrong Partner?</span> Get 100% Value And Guarantee. Don't Miss Out — Secure Your <span className="elegant-serif">Brand's Future</span> Today.&nbsp;&nbsp;
                                </div>
                                <div className="trust-pill-text">
                                    Why Risk It With The <span className="elegant-serif">Wrong Partner?</span> Get 100% Value And Guarantee. Don't Miss Out — Secure Your <span className="elegant-serif">Brand's Future</span> Today.&nbsp;&nbsp;
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pre-footer-section">
                <div className="pre-footer-container">
                    <p className="pre-footer-text">
                        Say goodbye to outdated enterprise software and welcome the smoother one.
                        We lead you from design to product innovation to shape your path from idea to success
                    </p>

                    <div className="social-links-row">
                        <a href="#" className="social-box dribbble">
                            <span className="tooltip">Dribbble</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path></svg>
                        </a>
                        {/* More social boxes... I'll keep them as they are in App.jsx but in this component */}
                        <a href="#" className="social-box behance">
                            <span className="tooltip">Behance</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 7.15c0-1.8-1.2-1.93-2.1-1.93h-1.8v1.8h1.8v.02c.74 0 .74.79.74.83v2.53H14.12V3.74h2.52v-.02c0-.74.79-.74.83-.74h3.6V.34h-3.6c-1.8 0-3.34 1.54-3.34 3.34V10.4h-3.23V7.17c0-1.8-1.2-1.93-2.1-1.93H7.01v1.8h1.79v.02c.74 0 .74.79.74.83v2.53H2.88V7.17c0-1.8-1.2-1.93-2.1-1.93H0v16.92h22V7.15zM2.88 20.61V12.1h6.66v8.51H2.88zm11.24 0V12.1h6.66v8.51h-6.66z"></path></svg>
                        </a>
                        <a href="#" className="social-box instagram">
                            <span className="tooltip">Instagram</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.486.275 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                            </svg>
                        </a>
                        <a href="#" className="social-box linkedin">
                            <span className="tooltip">LinkedIn</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </a>
                        <a href="#" className="social-box facebook">
                            <span className="tooltip">Facebook</span>
                            <svg viewBox="0 0 320 512" width="16" height="20" fill="currentColor"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg>
                        </a>
                        <a href="#" className="social-box twitter">
                            <span className="tooltip">Twitter</span>
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 48 48"><path d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429" /></svg>
                        </a>
                        <a href="#" className="social-box telegram">
                            <span className="tooltip">Telegram</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </a>
                    </div>

                    <div className="subscribe-form-container">
                        <div className="subscribe-input-wrapper">
                            <span className="mail-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </span>
                            <input type="email" placeholder="Your email here" />
                        </div>
                        <button className="subscribe-submit-btn">
                            Subscribe
                            <span className="arrow-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </span>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default React.memo(PreFooter);
