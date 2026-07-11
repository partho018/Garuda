"use client";
import React, { useEffect, useState, useRef } from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import Loader from '../../components/Loader';
import BackToTop from '../../components/BackToTop';
import Link from 'next/link';
import { motion } from 'framer-motion';
import footerImg from '../../../img/foo.webp';
import contactGlobeImg from '../../assets/1 (2).avif';
import contactCubeImg from '../../assets/1 (1).avif';
import './contact.css';

// FAQ, PreFooter, and asset imports
import FAQ from '../../components/FAQ';
import PreFooter from '../../components/PreFooter';
import fortyPlus from '../../../img/40+.avif';
import uiPhotoImg from '../../assets/6734f70094aa7b62e8c08b04_UI Photo.avif';
import asdsgsImg from '../../assets/asdsgs.avif';
import companyDeckImg from '../../assets/imageye___-_imgi_128_6759de04206e2b9503a8c111_Photo (23)-p-500.png';

// Brand Logo imports
import logoOstad from '../../../img/Connect Now/6885f14fe135439678c205c4_Logo_ostad_mono.svg';
import logoOter from '../../../img/Connect Now/6885f15d6e8226dcdd42841f_Logo_oter_mono.svg';
import logoSift from '../../../img/Connect Now/6885f18ddddd13f9898fa4a1_Logo_Sift_mono.svg';
import logoSkillophy from '../../../img/Connect Now/6885f19c8b03c8659ce41c98_Logo_skillophy_mono.svg';
import logoTempo from '../../../img/Connect Now/6885f1b6efcab4b193f09f5c_Logo_tempo_mono.svg';
import logoTriply from '../../../img/Connect Now/6885f1c594a1ec8ca506cd37_Logo_triply_mono.svg';
import logoWays from '../../../img/Connect Now/6885f1e4306e3894a1466064_Logo_ways_mono.svg';
import logoCpg from '../../../img/Connect Now/6885ef3df74b709059457346_Logo_cpg_mono.svg';
import logoCompaies from '../../../img/Connect Now/6885ef283a1bcb89be6747e7_Logo_compaies_mono.svg';
import logoDocuseal from '../../../img/Connect Now/6885efa747ec9f1d1564f668_Logo_docuseal_mono.svg';
import logoFarasha from '../../../img/Connect Now/6885efcf7840077b72111115_Logo_farasha_mono.svg';
import logoFitmate from '../../../img/Connect Now/6885efde40d2b35d3d22dea0_Logo_fitmate_mono.svg';
import logoGainsty from '../../../img/Connect Now/6885effb87ea8f930b980cad_Logo_Gainsty_mono.svg';
import logoGrow from '../../../img/Connect Now/6885f01211f8986a34f542d8_Logo_grow_mono.svg';
import logoHeyluna from '../../../img/Connect Now/6885f045523f0b94ba432e42_Logo_heyluna_mono.svg';
import logoMedease from '../../../img/Connect Now/6885ee08f5f493b2bb9e7f1e_Logo_medease_mono.svg';
import logo3asafeer from '../../../img/Connect Now/6885ee4528e1e50ce73cec96_Logo_3asafeer_mono.svg';
import logoAffine from '../../../img/Connect Now/6885ee66114ee66a929deac9_Logo_affine_mono.svg';
import logoAkijship from '../../../img/Connect Now/6885ee8c69e8f4233a577999_Logo_akijship_mono.svg';
import logoAlpine from '../../../img/Connect Now/6885eeb809370b706fb8e60d_Logo_alpine_mono.svg';
import logoAxiata from '../../../img/Connect Now/6885eece6aa97547b732fdf2_Logo_axiata_mono.svg';
import logoBizphix from '../../../img/Connect Now/6885eee107ee412b3af204cf_Logo_Bizphix_mono.svg';
import logoButtercup from '../../../img/Connect Now/6885eef1a76e2babd6efc174_Logo_Buttercup_mono.svg';
import logoCarbobon from '../../../img/Connect Now/6885ef0413f8918ac5356de1_Logo_carbobon_mono.svg';
import logoCarnesia from '../../../img/Connect Now/6885ef13617c539ba8a284f4_Logo_carnesia_mono.svg';

// Firebase imports
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Framer Motion animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.8
        }
    }
};

// ─── Service Tabs Data ───────────────────────────────────────────────────────
const SERVICE_TABS = [
    {
        id: "ai-branding",
        label: "AI Branding",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80&fit=crop",
        personName: "Partho Samadder",
        personRole: "Brand Strategist @ Garuda",
        personAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
        brand: "Garuda Studio",
        testimonial: "Our AI Branding service builds intelligent, data-driven brand identities. We combine cutting-edge AI tools with human creativity to craft visual systems and brand voices that connect emotionally and stand the test of time.",
        cta: "Book a Call",
    },
    {
        id: "logo-design",
        label: "Logo Design",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80&fit=crop",
        personName: "Raju Das",
        personRole: "Lead Designer @ Garuda",
        personAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
        brand: "Garuda Studio",
        testimonial: "We craft timeless, versatile logos that work across every medium — from app icons to billboards. Each mark is built to communicate your brand's essence at a single glance.",
        cta: "Book a Call",
    },
    {
        id: "web-design",
        label: "Web Design",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80&fit=crop",
        personName: "Arif Hossain",
        personRole: "Web Design Lead @ Garuda",
        personAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
        brand: "Garuda Studio",
        testimonial: "We design high-performance websites focused on conversion. Every pixel is intentional — blending stunning aesthetics with proven UX patterns that turn visitors into loyal clients.",
        cta: "Book a Call",
    },
    {
        id: "ai-content",
        label: "AI Content",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80&fit=crop",
        personName: "Nadia Islam",
        personRole: "Content Strategist @ Garuda",
        personAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
        brand: "Garuda Studio",
        testimonial: "We harness AI to produce consistent, brand-aligned content at scale — without sacrificing quality. From SEO blogs to product copy, we deliver more content, faster, with better results.",
        cta: "Book a Call",
    },
    {
        id: "social-media",
        label: "Social Media Management",
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80&fit=crop",
        personName: "Tania Begum",
        personRole: "Social Media Manager @ Garuda",
        personAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
        brand: "Garuda Studio",
        testimonial: "We manage your social media end-to-end — strategy, content creation, scheduling, and analytics. Your brand stays consistent, relevant, and engaging across all platforms.",
        cta: "Book a Call",
    },
];

// ─── ServiceTabs Component ────────────────────────────────────────────────────
function ServiceTabs() {
    const [activeTab, setActiveTab] = useState("ai-branding");
    const active = SERVICE_TABS.find((t) => t.id === activeTab);

    return (
        <div className="svc-tabs-wrapper">
            {/* Section Header */}
            <div className="svc-section-header">
                <span className="svc-section-badge">Client Stories</span>
                <h2 className="svc-section-title">Success Stories That <span className="elegant-serif">Inspire Us</span></h2>
            </div>

            {/* Tab Bar — plain text links like reference */}
            <nav className="svc-tab-bar">
                {SERVICE_TABS.map((tab, idx) => (
                    <React.Fragment key={tab.id}>
                        <button
                            className={`svc-tab-btn${activeTab === tab.id ? " active" : ""}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                        {idx < SERVICE_TABS.length - 1 && (
                            <span className="svc-tab-sep" aria-hidden="true" />
                        )}
                    </React.Fragment>
                ))}
            </nav>

            {/* Full-width image panel with overlay card */}
            <div className="svc-panel" key={activeTab}>
                {/* Background image */}
                <img
                    src={active.image}
                    alt={active.label}
                    className="svc-panel-img"
                    draggable={false}
                />
                {/* Dark gradient overlay */}
                <div className="svc-panel-overlay" />

                {/* Right-side blur backdrop */}
                <div className="svc-panel-blur-right" />

                {/* Floating white card — right side */}
                <div className="svc-info-card">
                    {/* Person row */}
                    <div className="svc-card-person">
                        <img
                            src={active.personAvatar}
                            alt={active.personName}
                            className="svc-card-avatar"
                        />
                        <div>
                            <p className="svc-card-name">{active.personName}</p>
                            <p className="svc-card-role">{active.personRole}</p>
                        </div>
                    </div>

                    {/* Testimonial text */}
                    <p className="svc-card-text">{active.testimonial}</p>

                    {/* Footer: brand + CTA */}
                    <div className="svc-card-footer">
                        <div className="svc-card-brand">
                            <span className="svc-brand-dot">📍</span>
                            <span className="svc-brand-name">{active.brand}</span>
                        </div>
                        <Link href="/contact" className="svc-card-cta">
                            {active.cta}
                            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                                <path d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default function ContactUsPage() {
    const getSrc = (img) => (img && img.src ? img.src : img);


    const faqs = [
        { id: 1, question: "How do you approach a new design project?", answer: "We start with discovery and strategy to understand your business goals, target audience, and market landscape. From there, we move to user journey mapping, wireframing, and finally high-fidelity UI design." },
        { id: 2, question: "What industries do you specialize in?", answer: "While we have extensive experience in Fintech, Healthcare, and SaaS, our design-first methodology allows us to tackle complex problems in any industry, from Edtech to Cybersecurity." },
        { id: 3, question: "Do you offer post-launch support and optimization?", answer: "Absolutely. We view our client relationships as long-term partnerships. We offer flexible maintenance and optimization retainers to ensure your product continues to evolve and perform." },
        { id: 4, question: "How long does a typical design project take?", answer: "Most projects range from 4 to 12 weeks, depending on the scope and complexity. We emphasize quality and thoroughness, while maintaining an agile pace to meet your business timelines." },
        { id: 5, question: "Will you help with the actual development of the design?", answer: "Yes, we have a dedicated development team specializing in React, Next.js, and Webflow, ensuring your designs are implemented with pixel-perfect precision and high performance." }
    ];

    // Video states
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    // Connect section logo arrays
    const connectRow1 = [
        logoOstad, logoOter, logoSift, logoSkillophy, logoTempo, logoTriply, 
        logoWays, logoMedease, logo3asafeer, logoAffine, logoAkijship, logoAlpine
    ];

    const connectRow2 = [
        logoAxiata, logoBizphix, logoButtercup, logoCarbobon, logoCarnesia, 
        logoCpg, logoCompaies, logoDocuseal, logoFarasha, logoFitmate, 
        logoGainsty, logoGrow, logoHeyluna
    ];

    const toggleMute = (e) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    // Form states
    const [selectedBudget, setSelectedBudget] = useState("");
    const [formStatus, setFormStatus] = useState({ submitting: false, success: false, error: null });
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        whatsapp: '',
        details: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormStatus({ submitting: true, success: false, error: null });

        const dataToSend = {
            ...formData,
            budget: selectedBudget,
            _subject: `New Project Inquiry from ${formData.fullName}`,
            _template: 'table',
            _captcha: 'false'
        };

        try {
            // 1. Send Email via FormSubmit
            const emailPromise = fetch("https://formsubmit.co/ajax/Parthosamadder00@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            // 2. Save to Firebase Firestore for Dashboard
            const firestorePromise = new Promise(async (resolve, reject) => {
                const timeoutId = setTimeout(() => resolve({ timeout: true }), 10000); // 10s timeout
                try {
                    await addDoc(collection(db, 'contact_submissions'), {
                        fullName: formData.fullName,
                        email: formData.email,
                        whatsapp: formData.whatsapp,
                        budget: selectedBudget,
                        details: formData.details,
                        active: true,
                        createdAt: serverTimestamp()
                    });
                    clearTimeout(timeoutId);
                    resolve({ success: true });
                } catch (err) {
                    clearTimeout(timeoutId);
                    console.error("Firebase error (possibly unconfigured):", err);
                    resolve({ error: err }); // Resolve anyway to not block the email flow
                }
            });

            const [emailResponse] = await Promise.all([emailPromise, firestorePromise]);

            if (emailResponse.ok) {
                setFormStatus({ submitting: false, success: true, error: null });
                setFormData({ fullName: '', email: '', whatsapp: '', details: '' });
                setSelectedBudget("");
                
                // Reset success message after 5 seconds
                setTimeout(() => {
                    setFormStatus(prev => ({ ...prev, success: false }));
                }, 5000);
            } else {
                setFormStatus({ submitting: false, success: false, error: "Submission failed (Email service). Please try again." });
            }
        } catch (err) {
            console.error("Submission error:", err);
            setFormStatus({ submitting: false, success: false, error: "Something went wrong. Please try again." });
        }
    };

    useEffect(() => {
        let requestRef;
        const updateScroll = () => {
            const scrollY = window.scrollY;
            document.documentElement.style.setProperty('--scroll-y', scrollY);
            requestRef = requestAnimationFrame(updateScroll);
        };
        requestRef = requestAnimationFrame(updateScroll);
        return () => {
            cancelAnimationFrame(requestRef);
            document.documentElement.style.removeProperty('--scroll-y');
        };
    }, []);

    return (
        <div className="contact-page-wrapper">
            <Loader />

            {/* Cinematic Hero Header */}
            <section className="contact-hero-section">
                {/* Glow & Gradient Background Elements */}
                <div className="contact-hero-glow"></div>
                <div className="contact-hero-gradient-overlay"></div>

                {/* Floating 3D Globe (Top-Right) */}
                <div className="contact-globe-container">
                    <img
                        src={getSrc(contactGlobeImg)}
                        alt="3D Globe"
                        className="contact-globe"
                        draggable={false}
                    />
                </div>

                {/* Floating 3D Cube (Bottom-Left of Hero Section) */}
                <div className="contact-cube-container">
                    <img
                        src={getSrc(contactCubeImg)}
                        alt="3D Cube"
                        className="contact-cube"
                        draggable={false}
                    />
                </div>

                {/* Center Content */}
                <div className="contact-hero-content">
                    {/* Website Logo */}
                    <div className="contact-header-logo-container">
                        <Link href="/" className="contact-logo-link">
                            <span className="contact-logo-text">Garuda</span>
                        </Link>
                    </div>

                    {/* Breadcrumb pill */}
                    <div className="contact-breadcrumb-pill">
                        <Link href="/" className="contact-breadcrumb-link">Home</Link>
                        <span className="contact-breadcrumb-sep">›</span>
                        <span className="contact-breadcrumb-active">Contact us</span>
                    </div>

                    {/* Typography */}
                    <h1 className="contact-hero-title">Have A Question Or</h1>
                    <h2 className="contact-hero-subtitle">Just Want To Chat?</h2>
                </div>
            </section>

            {/* Contact Body Section (White background) */}
            <section className="contact-body-section">
                {/* Contact Form Card Section */}
                <div className="contact-card-section">


                    <div className="contact-card-container">
                        <div className="contact-card-grid">
                            {/* Left Side: Info & Video */}
                            <div className="contact-card-info">
                                <h2 className="contact-card-title">
                                    Tell Us Your <br />
                                    Amazing <br />
                                    <span className="elegant-serif">Project Here</span>
                                </h2>
                                
                                <ul className="contact-card-features">
                                    <li>
                                        <span className="check-icon">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </span>
                                        Expect a response from us within 24 hours
                                    </li>
                                    <li>
                                        <span className="check-icon">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </span>
                                        We're happy to sign an NDA upon request.
                                    </li>
                                    <li>
                                        <span className="check-icon">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </span>
                                        Get access to a team of dedicated product specialists.
                                    </li>
                                </ul>

                                {/* Video Player Card */}
                                <div className="contact-video-wrapper">
                                    <div className="mega-menu-video-card" style={{ height: 'auto', maxWidth: '427px', width: '100%' }}>
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
                                        <div className="mega-menu-video-frame" style={{ width: '100%', maxWidth: '100%', height: 'auto', aspectRatio: '16/9', position: 'relative' }}>
                                            <video 
                                                ref={videoRef}
                                                src="https://assets.mixkit.co/videos/preview/mixkit-woman-working-on-a-creative-office-42171-large.mp4" 
                                                autoPlay 
                                                loop 
                                                muted={isMuted}
                                                playsInline
                                            />
                                        </div>

                                        {/* Bottom Caption and Mute button */}
                                        <div className="mega-menu-video-bottom">
                                            <span className="video-caption-text">but they don't stick around</span>
                                            <button 
                                                className="video-mute-btn" 
                                                onClick={toggleMute}
                                                aria-label={isMuted ? "Unmute video" : "Mute video"}
                                            >
                                                {isMuted ? (
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

                            {/* Right Side: Form */}
                            <div className="contact-form-wrapper">
                                <form className="contact-form" onSubmit={handleFormSubmit}>
                                    <div className="contact-form-group">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            placeholder="John Doe"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="contact-form-row">
                                        <div className="contact-form-group">
                                            <label>Your Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="yourmail@gmail.com"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="contact-form-group">
                                            <label>Whatsapp Number</label>
                                            <div className="whatsapp-input-wrapper" style={{ position: 'relative' }}>
                                                <span className="whatsapp-prefix-icon" style={{
                                                    position: 'absolute',
                                                    left: '14px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    color: '#555555',
                                                    fontSize: '14px',
                                                    borderRight: '1px solid #E5E5EA',
                                                    paddingRight: '10px',
                                                    pointerEvents: 'none'
                                                }}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <circle cx="12" cy="12" r="10"/>
                                                        <line x1="2" y1="12" x2="22" y2="12"/>
                                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                                                    </svg>
                                                    <span>+</span>
                                                </span>
                                                <input
                                                    type="text"
                                                    name="whatsapp"
                                                    placeholder="123 456 7890"
                                                    value={formData.whatsapp}
                                                    onChange={handleInputChange}
                                                    required
                                                    style={{ paddingLeft: '65px' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contact-form-group">
                                        <label>Project Budget</label>
                                        <div className="contact-budget-options">
                                            {["Less than $5K", "$5K - $10K", "$10K - $20K", "$20K - $50K", "More than $50K"].map((budget) => (
                                                <button
                                                    key={budget}
                                                    type="button"
                                                    className={`contact-budget-btn ${budget === selectedBudget ? 'active' : ''}`}
                                                    onClick={() => setSelectedBudget(budget)}
                                                >
                                                    {budget}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="contact-form-group">
                                        <label>Project Details</label>
                                        <textarea
                                            name="details"
                                            placeholder="I want to redesign my website.."
                                            value={formData.details}
                                            onChange={handleInputChange}
                                            required
                                            rows="4"
                                        ></textarea>
                                    </div>

                                    {formStatus.success && (
                                        <div className="form-success-toast" style={{
                                            backgroundColor: 'rgba(74, 222, 128, 0.2)',
                                            color: '#4ade80',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            marginBottom: '15px',
                                            fontSize: '14px',
                                            border: '1px solid rgba(74, 222, 128, 0.4)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px'
                                        }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            <span>Thank you! Sent successfully.</span>
                                        </div>
                                    )}

                                    {formStatus.error && <p style={{ color: '#ff4d4d', fontSize: '14px', marginBottom: '10px' }}>{formStatus.error}</p>}
                                    
                                    <button type="submit" className="contact-submit-btn" disabled={formStatus.submitting}>
                                        <span>{formStatus.submitting ? 'Sending...' : "Let's Connect"}</span>
                                        {!formStatus.submitting && (
                                            <span className="rocket-icon">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    <polyline points="12 5 19 12 12 19"></polyline>
                                                </svg>
                                            </span>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* New Contact Connect / Opportunities Section */}
            <motion.section 
                className="contact-connect-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={containerVariants}
            >
                <div className="contact-connect-container">
                    {/* Logos Area */}
                    {/* Autoplay Marquee Logos Area */}
                    <motion.div className="contact-connect-logos" variants={itemVariants}>
                        <div className="connect-marquee-row row-left">
                            <div className="connect-marquee-track">
                                {connectRow1.map((logo, idx) => (
                                    <div className="connect-logo-item" key={`r1-${idx}`}>
                                        <img src={getSrc(logo)} alt="Brand Logo" draggable={false} />
                                    </div>
                                ))}
                                {connectRow1.map((logo, idx) => (
                                    <div className="connect-logo-item" key={`r1-dup-${idx}`}>
                                        <img src={getSrc(logo)} alt="Brand Logo" draggable={false} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="connect-marquee-row row-right">
                            <div className="connect-marquee-track">
                                {connectRow2.map((logo, idx) => (
                                    <div className="connect-logo-item" key={`r2-${idx}`}>
                                        <img src={getSrc(logo)} alt="Brand Logo" draggable={false} />
                                    </div>
                                ))}
                                {connectRow2.map((logo, idx) => (
                                    <div className="connect-logo-item" key={`r2-dup-${idx}`}>
                                        <img src={getSrc(logo)} alt="Brand Logo" draggable={false} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Badge */}
                    <motion.div className="contact-connect-badge-wrapper" variants={itemVariants}>
                        <span className="contact-connect-badge">Connect Now</span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h2 className="contact-connect-title" variants={itemVariants}>
                        Get In Touch Now For Business Or <br />
                        <span className="elegant-serif">Career Opportunities!</span>
                    </motion.h2>

                    {/* Email Columns */}
                    <motion.div className="contact-connect-emails" variants={itemVariants}>
                        <div className="email-col">
                            <span className="email-label">Project Inquiries? Let's Team Up</span>
                            <a href="mailto:hello@Garuda.com" className="email-link">hello@Garuda.com</a>
                        </div>
                        <div className="email-col">
                            <span className="email-label">Be a Garuda! Be a Part of the Leading Team!</span>
                            <a href="mailto:career@Garuda.com" className="email-link">career@Garuda.com</a>
                        </div>
                    </motion.div>

                    {/* Connect Footer Image */}
                    <motion.div className="contact-connect-image-wrapper" variants={itemVariants}>
                        <img 
                            src={getSrc(asdsgsImg)} 
                            alt="Connect Opportunities Illustration" 
                            className="contact-connect-image"
                            draggable={false}
                        />
                    </motion.div>

                    {/* Company Deck Banner Section */}
                    <motion.div className="company-deck-banner" variants={itemVariants}>
                        <div className="company-deck-image-col">
                            <img 
                                src={getSrc(companyDeckImg)} 
                                alt="Company Deck Illustration" 
                                className="company-deck-image"
                                draggable={false}
                            />
                        </div>
                        <div className="company-deck-content-col">
                            <span className="company-deck-badge">Company Deck</span>
                            <h2 className="company-deck-title">
                                Details For The <br />
                                <span className="elegant-serif">Startups</span>
                            </h2>
                            <p className="company-deck-description">
                                Interested in learning more about us? Our company deck provides an in-depth look into our agency, the projects we've tackled, the solutions we offer, and the culture we cultivate.
                            </p>
                            <Link href="/" className="company-deck-btn">
                                Check Company Deck
                                <span className="btn-arrow" style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '4px' }}>
                                        <path d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Why Work With Us Section */}
            <motion.section
                className="contact-why-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={containerVariants}
            >
                <div className="contact-why-container">
                    {/* Service Tabs */}
                    <ServiceTabs />

                </div>
            </motion.section>

            <FAQ faqs={faqs} />

            {/* Consultation Banner Section */}
            <motion.section
                className="about-consult-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={containerVariants}
            >
                <div className="about-consult-container">
                    <motion.div className="about-consult-banner" variants={itemVariants}>
                        {/* Glow Container */}
                        <div className="about-consult-glow-container">
                            <div className="about-consult-glow-left"></div>
                            <div className="about-consult-glow-right"></div>
                        </div>

                        {/* Content Column */}
                        <div className="about-consult-content">
                            <span className="about-consult-badge">Claim a ₹799 Consultation, on Us!</span>
                            <h2 className="about-consult-title">
                                Your Brand Deserves <br />
                                the <span className="elegant-serif">Next Level!</span>
                            </h2>
                            <p className="about-consult-subtitle">
                                Get expert advice and a custom strategy session worth ₹799 at no cost
                            </p>
                            <div className="about-consult-cta-group">
                                <div className="about-consult-avatars">
                                    <img src={getSrc(fortyPlus)} alt="40+ Happy Clients" />
                                </div>
                                <Link href="/contact" className="about-consult-btn">
                                    Let's Talk
                                    <span className="btn-arrow">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </Link>
                            </div>
                        </div>

                        {/* Image Column */}
                        <div className="about-consult-image-wrapper">
                            <img
                                src={getSrc(uiPhotoImg)}
                                className="about-consult-image"
                                alt="Garuda UI mockup"
                                draggable={false}
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            <PreFooter />

            <Navigation />
            <Footer footerImg={getSrc(footerImg)} />
            <BackToTop />
        </div>
    );
}
