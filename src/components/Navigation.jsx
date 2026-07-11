"use client";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Navigation = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [mobScrolled, setMobScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    
    // More menu hover states
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const [isHoveredButton, setIsHoveredButton] = useState(false);
    const [isHoveredSheet, setIsHoveredSheet] = useState(false);

    // Services menu hover states
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isServicesHoveredButton, setIsServicesHoveredButton] = useState(false);
    const [isServicesHoveredSheet, setIsServicesHoveredSheet] = useState(false);

    const desktopVideoRef = useRef(null);
    const servicesVideoRef = useRef(null);

    const [isDesktopMuted, setIsDesktopMuted] = useState(true);
    const [isServicesMuted, setIsServicesMuted] = useState(true);

    const toggleDesktopMute = (e) => {
        e.stopPropagation();
        if (desktopVideoRef.current) {
            desktopVideoRef.current.muted = !desktopVideoRef.current.muted;
            setIsDesktopMuted(desktopVideoRef.current.muted);
        }
    };

    const toggleServicesMute = (e) => {
        e.stopPropagation();
        if (servicesVideoRef.current) {
            servicesVideoRef.current.muted = !servicesVideoRef.current.muted;
            setIsServicesMuted(servicesVideoRef.current.muted);
        }
    };

    useEffect(() => {
        if (isHoveredButton || isHoveredSheet) {
            setIsMoreOpen(true);
        } else {
            const timer = setTimeout(() => {
                setIsMoreOpen(false);
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [isHoveredButton, isHoveredSheet]);

    useEffect(() => {
        if (isServicesHoveredButton || isServicesHoveredSheet) {
            setIsServicesOpen(true);
        } else {
            const timer = setTimeout(() => {
                setIsServicesOpen(false);
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [isServicesHoveredButton, isServicesHoveredSheet]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            // Trigger right after section 1 (~1x viewport height)
            const threshold = window.innerHeight * 0.9;
            setScrolled(scrollY > threshold);
            setMobScrolled(scrollY > 50);

            // Active section detection
            const sections = ['projects', 'services', 'pricing', 'contact'];
            const scrollPosition = scrollY + window.innerHeight / 3;
            
            let currentSection = 'home';
            for (const sectionId of sections) {
                const el = document.getElementById(sectionId);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        currentSection = sectionId;
                        break;
                    }
                }
            }
            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll handler to highlight immediately on click
    const handleNavClick = (sectionId) => {
        setActiveSection(sectionId);
        setIsMoreOpen(false);
        setIsServicesOpen(false);
        
        let targetId = sectionId;
        if (sectionId === 'about') targetId = 'why-choose-us';
        if (sectionId === 'team') targetId = 'testimonials';
        if (sectionId === 'career') targetId = 'career';
        
        if (sectionId === 'home') {
            if (pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                router.push('/');
            }
            return;
        }

        if (pathname !== '/') {
            router.push(`/#${targetId}`);
            return;
        }

        const el = document.getElementById(targetId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className="nav-blur-bg"></div>
            <nav className="floating-nav">
                <div className="nav-inner">
                    <a 
                        href="#projects" 
                        className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavClick('projects');
                        }}
                    >
                        Projects
                    </a>
                    <div 
                        className="nav-services-trigger"
                        onMouseEnter={() => setIsServicesHoveredButton(true)}
                        onMouseLeave={() => setIsServicesHoveredButton(false)}
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavClick('services');
                        }}
                    >
                        <span className={`nav-link nav-services-btn-text ${isServicesOpen ? 'active' : ''}`}>
                            Services
                        </span>
                    </div>

                    <Link 
                        href="/contact"
                        className={`nav-cta${scrolled ? ' nav-cta--active' : ''}`}
                    >
                        <span className="cta-icon">
                            <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 13C24 18.5228 19.5228 23 14 23C12.5 23 9 23 7 25C7 23 7 19.5 7 18.5C4.5 16.5 4 15 4 13C4 7.47715 8.47715 3 14 3C19.5228 3 24 7.47715 24 13Z" fill="white" />
                                <path d="M10 14C10 14 11.5 16.5 14 16.5C16.5 16.5 18 14 18 14" stroke="#7D40FF" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </span>
                        Start a Project
                    </Link>

                    <a 
                        href="#pricing" 
                        className={`nav-link ${activeSection === 'pricing' ? 'active' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavClick('pricing');
                        }}
                    >
                        Pricing
                    </a>
                    
                    <div 
                        className="nav-more-trigger"
                        onMouseEnter={() => setIsHoveredButton(true)}
                        onMouseLeave={() => setIsHoveredButton(false)}
                        onClick={(e) => {
                            e.preventDefault();
                            setIsMoreOpen(!isMoreOpen);
                        }}
                    >
                        <span className={`nav-link nav-more-btn-text ${isMoreOpen ? 'active' : ''}`}>
                            More
                        </span>
                    </div>

                    {/* Desktop Services Mega Menu */}
                    <div 
                        className={`desktop-services-mega-menu ${isServicesOpen ? 'open' : ''}`}
                        onMouseEnter={() => setIsServicesHoveredSheet(true)}
                        onMouseLeave={() => setIsServicesHoveredSheet(false)}
                    >
                        <div className="mega-menu-content">
                            {/* Left Section: Services List */}
                            <div className="mega-menu-col-text">
                                <a href="#services" className="mega-menu-nav-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>
                                    <div className="mega-menu-item-left">
                                        <span className="mega-menu-item-title">AI Branding</span>
                                        <span className="mega-menu-item-desc">Creating intelligent brand identities using advanced AI models.</span>
                                    </div>
                                    <span className="mega-menu-item-arrow">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </span>
                                </a>
                                <a href="#services" className="mega-menu-nav-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>
                                    <div className="mega-menu-item-left">
                                        <span className="mega-menu-item-title">Logo Design</span>
                                        <span className="mega-menu-item-desc">Crafting memorable, distinct identities for global brands.</span>
                                    </div>
                                    <span className="mega-menu-item-arrow">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </span>
                                </a>
                                <a href="#services" className="mega-menu-nav-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>
                                    <div className="mega-menu-item-left">
                                        <span className="mega-menu-item-title">Web Design</span>
                                        <span className="mega-menu-item-desc">Building visually stunning & high-performing websites.</span>
                                    </div>
                                    <span className="mega-menu-item-arrow">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </span>
                                </a>
                                <a href="#services" className="mega-menu-nav-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>
                                    <div className="mega-menu-item-left">
                                        <span className="mega-menu-item-title">AI Content</span>
                                        <span className="mega-menu-item-desc">Generating scalable, high-quality copywriting and graphics.</span>
                                    </div>
                                    <span className="mega-menu-item-arrow">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </span>
                                </a>
                                <a href="#services" className="mega-menu-nav-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>
                                    <div className="mega-menu-item-left">
                                        <span className="mega-menu-item-title">Social Media Management</span>
                                        <span className="mega-menu-item-desc">Growing your community and managing campaigns seamlessly.</span>
                                    </div>
                                    <span className="mega-menu-item-arrow">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </span>
                                </a>
                            </div>

                            {/* Right Section: Tablet Video Mockup */}
                            <div className="mega-menu-col-media">
                                <div className="mega-menu-video-card">
                                    {/* Video Frame */}
                                    <div className="mega-menu-video-frame">
                                        <video 
                                            ref={servicesVideoRef}
                                            src="https://assets.mixkit.co/videos/preview/mixkit-web-design-template-on-a-tablet-screen-41718-large.mp4" 
                                            autoPlay 
                                            loop 
                                            muted={isServicesMuted}
                                            playsInline
                                        />
                                    </div>

                                    {/* Bottom Caption and Mute button */}
                                    <div className="mega-menu-video-bottom">
                                        <span className="video-caption-text"></span>
                                        <button 
                                            className="video-mute-btn" 
                                            onClick={toggleServicesMute}
                                            aria-label={isServicesMuted ? "Unmute video" : "Mute video"}
                                        >
                                            {isServicesMuted ? (
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                                                    <line x1="23" y1="9" x2="17" y2="15"/>
                                                    <line x1="17" y1="9" x2="23" y2="15"/>
                                                </svg>
                                            ) : (
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                                                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Premium Mega Menu */}
                    <div 
                        className={`desktop-mega-menu ${isMoreOpen ? 'open' : ''}`}
                        onMouseEnter={() => setIsHoveredSheet(true)}
                        onMouseLeave={() => setIsHoveredSheet(false)}
                    >
                        <div className="mega-menu-content">
                            {/* Left Section: Video Card */}
                            <div className="mega-menu-col-media">
                                <div className="mega-menu-video-card">
                                    {/* Chat Bubbles */}
                                    <div className="chat-bubble bubble-top">
                                        <span className="bubble-text">The design looks okay</span>
                                        <span className="bubble-text-sub">Users aren't converting</span>
                                    </div>
                                    
                                    <div className="chat-bubble bubble-mid">
                                        <span className="bubble-text">Users come in</span>
                                        <span className="bubble-text-sub">They</span>
                                    </div>

                                    {/* Video Frame */}
                                    <div className="mega-menu-video-frame">
                                        <video 
                                            ref={desktopVideoRef}
                                            src="https://assets.mixkit.co/videos/preview/mixkit-woman-working-on-a-creative-office-42171-large.mp4" 
                                            autoPlay 
                                            loop 
                                            muted={isDesktopMuted}
                                            playsInline
                                        />
                                    </div>

                                    {/* Bottom Caption and Mute button */}
                                    <div className="mega-menu-video-bottom">
                                        <span className="video-caption-text">but they don't stick around</span>
                                        <button 
                                            className="video-mute-btn" 
                                            onClick={toggleDesktopMute}
                                            aria-label={isDesktopMuted ? "Unmute video" : "Mute video"}
                                        >
                                            {isDesktopMuted ? (
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                                                    <line x1="23" y1="9" x2="17" y2="15"/>
                                                    <line x1="17" y1="9" x2="23" y2="15"/>
                                                </svg>
                                            ) : (
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                                                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Right Section: Navigation Menu */}
                            <div className="mega-menu-col-text">
                                <Link href="/" className="mega-menu-nav-item" onClick={(e) => {
                                    if (pathname === '/') {
                                        e.preventDefault();
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }
                                    setIsMoreOpen(false);
                                }}>
                                    <div className="mega-menu-item-left">
                                        <span className="mega-menu-item-title">Home</span>
                                        <span className="mega-menu-item-desc">Home is where the monk lives</span>
                                    </div>
                                    <span className="mega-menu-item-arrow">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </span>
                                </Link>
                                <Link href="/about" className="mega-menu-nav-item" onClick={() => setIsMoreOpen(false)}>
                                    <div className="mega-menu-item-left">
                                        <span className="mega-menu-item-title">About us</span>
                                        <span className="mega-menu-item-desc">The journey of Design Monks</span>
                                    </div>
                                    <span className="mega-menu-item-arrow">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </span>
                                </Link>
                                <a href="#" className="mega-menu-nav-item" onClick={(e) => { e.preventDefault(); handleNavClick('team'); }}>
                                    <div className="mega-menu-item-left">
                                        <span className="mega-menu-item-title">Meet the team</span>
                                        <span className="mega-menu-item-desc">An overview of the Monk family</span>
                                    </div>
                                    <span className="mega-menu-item-arrow">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </span>
                                </a>
                                <Link href="/blogs" className="mega-menu-nav-item" onClick={() => setIsMoreOpen(false)}>
                                    <div className="mega-menu-item-left">
                                        <span className="mega-menu-item-title">Blog</span>
                                        <span className="mega-menu-item-desc">Insights, ideas & updates from us</span>
                                    </div>
                                    <span className="mega-menu-item-arrow">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </span>
                                </Link>

                                <a href="#" className="mega-menu-nav-item" onClick={(e) => { e.preventDefault(); handleNavClick('career'); }}>
                                    <div className="mega-menu-item-left">
                                        <span className="mega-menu-item-title">Career</span>
                                        <span className="mega-menu-item-desc">Work with top global brands, grow your skills</span>
                                    </div>
                                    <span className="mega-menu-item-arrow">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </span>
                                </a>
                                <Link href="/contact" className="mega-menu-nav-item" onClick={() => setIsMoreOpen(false)}>
                                    <div className="mega-menu-item-left">
                                        <span className="mega-menu-item-title">Contact us</span>
                                        <span className="mega-menu-item-desc">Start your dream design journey from here</span>
                                    </div>
                                    <span className="mega-menu-item-arrow">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Navigation Bar */}
            <nav className="mobile-bottom-nav">
                <div className="mobile-nav-bg-container">
                    <div className="mobile-nav-bg-left"></div>
                    <div className="mobile-nav-bg-center">
                        <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <path d="M 0 0 C 20 0, 35 32, 50 32 C 65 32, 80 0, 100 0 L 100 60 L 0 60 Z" fill="#0A0A0A" />
                            <path d="M 0 0 C 20 0, 35 32, 50 32 C 65 32, 80 0, 100 0" stroke="rgba(0, 223, 130, 0.25)" strokeWidth="1.5" />
                        </svg>
                    </div>
                    <div className="mobile-nav-bg-right"></div>
                </div>

                <div className="mobile-nav-items">
                    <a 
                        href="#projects" 
                        className={`mobile-nav-item ${activeSection === 'projects' ? 'active' : ''}`}
                        onClick={() => handleNavClick('projects')}
                    >
                        <div className="mobile-nav-icon-wrapper">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                                <path d="M10 14h4" />
                            </svg>
                        </div>
                        <span className="mobile-nav-label">Projects</span>
                    </a>

                    <a 
                        href="#services" 
                        className={`mobile-nav-item ${activeSection === 'services' ? 'active' : ''}`}
                        onClick={() => handleNavClick('services')}
                    >
                        <div className="mobile-nav-icon-wrapper">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                        </div>
                        <span className="mobile-nav-label">Services</span>
                    </a>

                    <div className="mobile-fab-container">
                        <Link 
                            href="/contact" 
                            className={`mobile-fab-btn ${mobScrolled ? 'scrolled' : ''} ${activeSection === 'contact' ? 'active' : ''}`}
                            aria-label="Start a Project"
                        >
                            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 13C24 18.5228 19.5228 23 14 23C12.5 23 9 23 7 25C7 23 7 19.5 7 18.5C4.5 16.5 4 15 4 13C4 7.47715 8.47715 3 14 3C19.5228 3 24 7.47715 24 13Z" fill="white" />
                                <path d="M10 14C10 14 11.5 16.5 14 16.5C16.5 16.5 18 14 18 14" stroke="#7D40FF" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </Link>
                    </div>

                    <a 
                        href="#pricing" 
                        className={`mobile-nav-item ${activeSection === 'pricing' ? 'active' : ''}`}
                        onClick={() => handleNavClick('pricing')}
                    >
                        <div className="mobile-nav-icon-wrapper">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                <line x1="7" y1="7" x2="7.01" y2="7" />
                            </svg>
                        </div>
                        <span className="mobile-nav-label">Pricing</span>
                    </a>

                    <button 
                        className={`mobile-nav-item mobile-more-btn ${isMoreOpen ? 'active' : ''}`}
                        onClick={() => setIsMoreOpen(!isMoreOpen)}
                        onMouseEnter={() => setIsHoveredButton(true)}
                        onMouseLeave={() => setIsHoveredButton(false)}
                    >
                        <div className="mobile-nav-icon-wrapper">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="4" y1="12" x2="20" y2="12" />
                                <line x1="4" y1="6" x2="20" y2="6" />
                                <line x1="4" y1="18" x2="20" y2="18" />
                            </svg>
                        </div>
                        <span className="mobile-nav-label">More</span>
                    </button>
                </div>

                {/* More Drawer / Bottom Sheet */}
                <div 
                    className={`mobile-more-sheet ${isMoreOpen ? 'open' : ''}`}
                    onMouseEnter={() => setIsHoveredSheet(true)}
                    onMouseLeave={() => setIsHoveredSheet(false)}
                >
                    <div className="mobile-sheet-handle"></div>
                    <div className="mobile-more-sheet-body">
                        <Link href="/" className="mobile-more-item" onClick={(e) => {
                            if (pathname === '/') {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                            setIsMoreOpen(false);
                        }}>
                            <span className="more-item-title">Home</span>
                            <span className="more-item-desc">Home is where the monk lives</span>
                        </Link>
                        <Link href="/about" className="mobile-more-item" onClick={() => setIsMoreOpen(false)}>
                            <span className="more-item-title">About us</span>
                            <span className="more-item-desc">The journey of Design Monks</span>
                        </Link>
                        <a href="#" className="mobile-more-item" onClick={(e) => { e.preventDefault(); handleNavClick('team'); }}>
                            <span className="more-item-title">Meet the team</span>
                            <span className="more-item-desc">An overview of the Monk family</span>
                        </a>
                        <Link href="/blogs" className="mobile-more-item" onClick={() => setIsMoreOpen(false)}>
                            <span className="more-item-title">Blog</span>
                            <span className="more-item-desc">Insights, ideas & updates from us</span>
                        </Link>

                        <a href="#" className="mobile-more-item" onClick={(e) => { e.preventDefault(); handleNavClick('career'); }}>
                            <span className="more-item-title">Career</span>
                            <span className="more-item-desc">Work with top global brands, grow your skills</span>
                        </a>
                        <Link href="/contact" className="mobile-more-item" onClick={() => setIsMoreOpen(false)}>
                            <span className="more-item-title">Contact us</span>
                            <span className="more-item-desc">Start your dream design journey from here</span>
                        </Link>
                    </div>
                </div>

                {isMoreOpen && <div className="mobile-more-backdrop" onClick={() => setIsMoreOpen(false)}></div>}
            </nav>
        </>
    );
};

export default React.memo(Navigation);
