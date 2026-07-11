import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = ({ logo, star, icons, countries, mockupLeft, floatingCube, floatingAi, mockupMain, floatingRing, floatingCursor }) => {
    return (
        <main className="hero-section">
            <div className="hero-main-content">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rating-badge"
                >
                    <img src={logo} alt="brand" className="brand-logo-small" />
                    <div className="rating-visual">
                        <span className="rating-num">4.9</span>
                        <img src={star} alt="stars" className="star-img" />
                    </div>
                    <p className="agency-sub">Leading AI Marketing Agency</p>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="hero-title"
                >
                    <span className="we-text">We</span> <span className="elegant-serif">Elevate</span> <span className="red-hat-text">Brands That</span> <br />
                    <span className="red-hat-text">Soar</span> <img src={icons} alt="icons" className="title-icons" /> <span className="elegant-serif">Like Garuda 🦅</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="country-chip-wrapper"
                >
                    <span className="country-chip-text">
                        In Born in India. Built to Fly Worldwide 🦅
                    </span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="cta-wrapper"
                >
                    <Link href="/contact" className="purple-btn" style={{ textDecoration: 'none' }}>
                        <span className="btn-chat-icon">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 13C24 18.5228 19.5228 23 14 23C12.5 23 9 23 7 25C7 23 7 19.5 7 18.5C4.5 16.5 4 15 4 13C4 7.47715 8.47715 3 14 3C19.5228 3 24 7.47715 24 13Z" fill="white" />
                                <path d="M10 14C10 14 11.5 16.5 14 16.5C16.5 16.5 18 14 18 14" stroke="#7D40FF" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </span>
                        Book a Call
                    </Link>
                </motion.div>
            </div>

            <div className="floating-elements-container left">
                <motion.img
                    src={mockupLeft}
                    alt="mockup left"
                    className="floating-mockup-left"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        y: [0, 15, 0]
                    }}
                    transition={{
                        x: { duration: 0.8, delay: 0.4 },
                        y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                    }}
                    decoding="async"
                />
                <motion.img
                    src={floatingCube}
                    alt="cube"
                    className="floating3d cube-3d"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                />
                <motion.img
                    src={floatingAi}
                    alt="ai"
                    className="floating3d ai-3d"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                />
            </div>

            <div className="floating-elements-container">
                <motion.img
                    src={mockupMain}
                    alt="mockup"
                    className="floating-mockup"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        y: [0, -15, 0]
                    }}
                    transition={{
                        x: { duration: 0.8, delay: 0.4 },
                        y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                    }}
                    decoding="async"
                />
                <motion.img
                    src={floatingRing}
                    alt="ring"
                    className="floating3d ring-3d"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                />
                <motion.img
                    src={floatingCursor}
                    alt="cursor"
                    className="floating3d cursor-3d"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                />
            </div>
        </main>
    );
};

export default React.memo(Hero);
