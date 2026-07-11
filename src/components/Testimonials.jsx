import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Testimonials = ({ clientStories }) => {
    const [currentClientIndex, setCurrentClientIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const [hoveredVideoIndex, setHoveredVideoIndex] = useState(null);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setTransitionEnabled(true);
            setCurrentClientIndex((prev) => prev + 1);
        }, 3500);
        return () => clearInterval(timer);
    }, [isPaused, clientStories.length]);

    useEffect(() => {
        if (currentClientIndex === clientStories.length) {
            const timer = setTimeout(() => {
                setTransitionEnabled(false);
                setCurrentClientIndex(0);
            }, 700);
            return () => clearTimeout(timer);
        }
    }, [currentClientIndex, clientStories.length]);

    return (
        <section className="client-stories-section" id="testimonials">
            <div className="client-stories-content">
                <span className="client-stories-badge">Client Stories</span>
                <h2 className="client-stories-title">
                    Success Stories <br />
                    <span className="elegant-serif dark">That Inspire Us</span>
                </h2>
            </div>

            <div
                className="client-carousel-container"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <motion.div
                    className="client-carousel-track"
                    animate={{
                        x: `-${currentClientIndex * 396}px`
                    }}
                    transition={transitionEnabled ? {
                        duration: 1.2,
                        ease: [0.65, 0, 0.35, 1]
                    } : { duration: 0 }}
                >
                    {[...clientStories, ...clientStories.slice(0, 4)].map((story, index) => (
                        <div
                            key={index}
                            className="client-card"
                            onMouseEnter={() => {
                                setHoveredVideoIndex(index);
                                setIsPaused(true);
                            }}
                            onMouseLeave={() => {
                                setHoveredVideoIndex(null);
                                setIsPaused(false);
                            }}
                        >
                            <div className="client-card-inner" style={{ backgroundColor: story.cardBg }}>
                                {hoveredVideoIndex === index ? (
                                    <div className="client-video-wrapper">
                                        <iframe
                                            className="client-video-iframe"
                                            src="https://www.youtube.com/embed/oa1qKT-VJvo?autoplay=1&mute=1&controls=0&loop=1&playlist=oa1qKT-VJvo&modestbranding=1&rel=0&iv_load_policy=3"
                                            title="Client Story Video"
                                            frameBorder="0"
                                            allow="autoplay; encrypted-media"
                                            loading="lazy"
                                        ></iframe>
                                    </div>
                                ) : (
                                    <img src={story.image} alt={story.name} className="client-image" loading="lazy" decoding="async" />
                                )}
                                <div className="client-play-btn" style={{ opacity: hoveredVideoIndex === index ? 0 : 1 }}>
                                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                        <circle cx="30" cy="30" r="30" fill="white" fillOpacity="0.3" />
                                        <path d="M38 30L26 37V23L38 30Z" fill="white" />
                                    </svg>
                                </div>
                                <div className="client-card-overlay" style={{ opacity: hoveredVideoIndex === index ? 0 : 1, transition: 'opacity 0.3s ease' }}>
                                    <div className="client-brand">
                                        {story.brand}
                                    </div>
                                    <p className="client-testimonial">"{story.testimonial}"</p>
                                    <div className="client-info">
                                        <h4 className="client-name">{story.name}</h4>
                                        <p className="client-role">{story.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default React.memo(Testimonials);
