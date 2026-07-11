import React from 'react';

const WhatWeDo = ({ services }) => {
    return (
        <section className="what-we-do-section" id="services">
            <div className="wwd-content">
                <span className="wwd-badge">What We Do</span>
                <h2 className="wwd-title">
                    We Design <span className="elegant-serif">Brands</span> That <span className="elegant-serif">Speak</span> To Audiences
                </h2>
            </div>

            <div className="wwd-services-container">
                {services.map((service, index) => (
                    <div key={index} className="wwd-service-row">
                        <div className="wwd-text-col">
                            <h3 className="service-title">
                                {service.title.split(' ')[0]} <span className="elegant-serif">{service.title.split(' ').slice(1).join(' ')}</span>
                            </h3>
                            <div className="service-divider"></div>
                            <p className="service-desc">{service.desc}</p>
                            <a href="#" className="service-link">
                                See More
                                <span className="arrow-icon">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.1152 8.99999C18.1185 9 18.1217 9 18.125 9L18.125 9.00006V11.0001H18.0904C14.1661 11.0163 11.625 13.7984 11.625 16.25H9.625C9.625 14.2566 10.6462 12.3552 12.3133 11.0001H1.875V9.00006H12.3134C10.6462 7.64492 9.625 5.74342 9.625 3.75H11.625C11.625 6.20673 14.1768 8.99539 18.1152 8.99999Z" fill="currentColor" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                        <div className="wwd-images-col">
                            <div className="service-image-card main-img">
                                <img src={service.images[0]} alt={service.title} loading="lazy" decoding="async" />
                            </div>
                            <div className="service-image-card side-img">
                                <img src={service.images[1]} alt={service.title} loading="lazy" decoding="async" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="wwd-cta-wrap">
                <a href="#contact" className="wwd-book-btn">
                    Book a Call
                    <span className="wwd-btn-arrow">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.1152 8.99999C18.1185 9 18.1217 9 18.125 9L18.125 9.00006V11.0001H18.0904C14.1661 11.0163 11.625 13.7984 11.625 16.25H9.625C9.625 14.2566 10.6462 12.3552 12.3133 11.0001H1.875V9.00006H12.3134C10.6462 7.64492 9.625 5.74342 9.625 3.75H11.625C11.625 6.20673 14.1768 8.99539 18.1152 8.99999Z" fill="currentColor" />
                        </svg>
                    </span>
                </a>
            </div>
        </section>
    );
};

export default React.memo(WhatWeDo);
