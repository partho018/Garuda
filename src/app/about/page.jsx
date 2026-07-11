"use client";
import React, { useEffect } from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import Loader from '../../components/Loader';
import BackToTop from '../../components/BackToTop';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FAQ from '../../components/FAQ';
import PreFooter from '../../components/PreFooter';

// Asset Imports
import cubeImg from '../../assets/cube.avif';
import footerImg from '../../../public/blog-hero-bg.webp';
import mockupImg from '../../assets/right-side-mockup.avif';
import coFoundersImg from '../../assets/co_founders_photo.png';
import careerImg from '../../assets/67a2138f9f2e22f26587c4c0_Product Design Vs UX Design 3 3.avif';
import fortyPlus from '../../../img/40+.avif';
import uiPhotoImg from '../../assets/6734f70094aa7b62e8c08b04_UI Photo.avif';

// Brand Logo Imports
import logoGoldmanSachs from '../../../img/Trusted by/68a091feeaa832d6e633b930_Logo_Goldman Sachs_mono.svg';
import logoClarity from '../../../img/Trusted by/68db9056e42ba9fd6c172833_Logo_Clarity_mono.svg';
import logoEsdiac from '../../../img/Trusted by/68dcdfc38248b93d8a3fe1ed_Logo_Esdiac_mono.svg';
import logoLearndojo from '../../../img/Trusted by/68dcdff13a553e58f8303e64_Logo_Learndojo_mono.svg';
import logoVocai from '../../../img/Trusted by/68dce04f1cc66d075bc201c7_Logo_Vocai_mono.svg';
import logoPlentypay from '../../../img/Trusted by/68dce06d6d2fe778ba755c28_Logo_Plentypay_mono.svg';
import logoAike from '../../../img/Trusted by/68deba780a85b7d26245ce16_Logo_Aike_mono.svg';
import logoFraus from '../../../img/Trusted by/69720678ee0f40386f6b4992_Logo_Fraus_mono.svg';
import logoCoinpulse from '../../../img/Trusted by/697b6e3416493b65e726d165_Logo_Coinpulse_ mono.svg';
import logoMedease from '../../../img/Trusted by/6885ee08f5f493b2bb9e7f1e_Logo_medease_mono.svg';
import logo3asafeer from '../../../img/Trusted by/6885ee4528e1e50ce73cec96_Logo_3asafeer_mono.svg';
import logoAffine from '../../../img/Trusted by/6885ee66114ee66a929deac9_Logo_affine_mono.svg';
import logoAkijship from '../../../img/Trusted by/6885ee8c69e8f4233a577999_Logo_akijship_mono.svg';
import logoAkij from '../../../img/Trusted by/6885ee9e7ebe3a3c0e3a331c_Logo_akij_mono.svg';
import logoAlpine from '../../../img/Trusted by/6885eeb809370b706fb8e60d_Logo_alpine_mono.svg';
import logoAxiata from '../../../img/Trusted by/6885eece6aa97547b732fdf2_Logo_axiata_mono.svg';
import logoBizphix from '../../../img/Trusted by/6885eee107ee412b3af204cf_Logo_Bizphix_mono.svg';
import logoKhanit from '../../../img/Trusted by/6885f06558e5a5df0fbefdde_Logo_khanit_mono.svg';
import logoKlasio from '../../../img/Trusted by/6885f07d9c093fad609a26bb_Logo_klasio_mono.svg';
import logoLeklub from '../../../img/Trusted by/6885f091d389d8df99129c17_Logo_leklub_mono.svg';
import logoLendiview from '../../../img/Trusted by/6885f0a19297eaa439b36a54_Logo_lendiview_mono.svg';
import logoLiberatelabs from '../../../img/Trusted by/6885f0c4d6d77ef939024a24_Logo_liberatelabs_mono.svg';
import logoLikely from '../../../img/Trusted by/6885f0d458e5a5df0fbf1790_Logo_likely_mono.svg';
import logoMemorybox from '../../../img/Trusted by/6885f0e8feb06d3d996d79c3_Logo_Memorybox_mono.svg';
import logoOnethread from '../../../img/Trusted by/6885f10530ade15b8f215893_Logo_onethread_mono.svg';
import logoRabfy from '../../../img/Trusted by/6885f12d87ea8f930b98389b_Logo_rabfy_mono.svg';
import logoOntik from '../../../img/Trusted by/6885f13ec2ad5470f81a0156_Logo_ontik_mono.svg';
import logoOstad from '../../../img/Trusted by/6885f14fe135439678c205c4_Logo_ostad_mono.svg';
import logoOter from '../../../img/Trusted by/6885f15d6e8226dcdd42841f_Logo_oter_mono.svg';
import logoPepsi from '../../../img/Trusted by/6885f16d40ff0915c93957cd_Logo_pepsi_mono.svg';
import logoPf from '../../../img/Trusted by/6885f17caf72390465b4e033_Logo_PF_mono.svg';
import logoSift from '../../../img/Trusted by/6885f18ddddd13f9898fa4a1_Logo_Sift_mono.svg';
import logoSkillophy from '../../../img/Trusted by/6885f19c8b03c8659ce41c98_Logo_skillophy_mono.svg';
import logoTelenor from '../../../img/Trusted by/6885f1aadb3edb2617313123_Logo_telenor_mono.svg';

// Row 2 & Row 4 SVG Imports
import logoButtercup from '../../../img/Trusted by/6885eef1a76e2babd6efc174_Logo_Buttercup_mono.svg';
import logoCarbobon from '../../../img/Trusted by/6885ef0413f8918ac5356de1_Logo_carbobon_mono.svg';
import logoCarnesia from '../../../img/Trusted by/6885ef13617c539ba8a284f4_Logo_carnesia_mono.svg';
import logoCompaies from '../../../img/Trusted by/6885ef283a1bcb89be6747e7_Logo_compaies_mono.svg';
import logoCpg from '../../../img/Trusted by/6885ef3df74b709059457346_Logo_cpg_mono.svg';
import logoCrantech from '../../../img/Trusted by/6885ef50dfdca9f9140b8bf1_Logo_crantech_mono.svg';
import logoCreGuard from '../../../img/Trusted by/6885ef82c4a168e60b47911d_Logo_CRE Guard_mono.svg';
import logoDlicio from '../../../img/Trusted by/6885ef94ab9e4ca1123be230_Logo_Dlicio_mono.svg';
import logoDocuseal from '../../../img/Trusted by/6885efa747ec9f1d1564f668_Logo_docuseal_mono.svg';
import logoEdvive from '../../../img/Trusted by/6885efb8de6485b41ef30512_Logo_edvive_mono.svg';
import logoFarasha from '../../../img/Trusted by/6885efcf7840077b72111115_Logo_farasha_mono.svg';
import logoFitmate from '../../../img/Trusted by/6885efde40d2b35d3d22dea0_Logo_fitmate_mono.svg';
import logoGainsty from '../../../img/Trusted by/6885effb87ea8f930b980cad_Logo_Gainsty_mono.svg';
import logoGrow from '../../../img/Trusted by/6885f01211f8986a34f542d8_Logo_grow_mono.svg';
import logoGuardian from '../../../img/Trusted by/6885f03409370b706fb922c8_Logo_Guardian_mono.svg';
import logoHeyluna from '../../../img/Trusted by/6885f045523f0b94ba432e42_Logo_heyluna_mono.svg';
import logoIpdc from '../../../img/Trusted by/6885f0546756b58458d71b9b_Logo_IPDC_mono.svg';
import logoTempo from '../../../img/Trusted by/6885f1b6efcab4b193f09f5c_Logo_tempo_mono.svg';
import logoTriply from '../../../img/Trusted by/6885f1c594a1ec8ca506cd37_Logo_triply_mono.svg';
import logoViber from '../../../img/Trusted by/6885f1d2a43bb3fbe72ee40c_Logo_viber_mono.svg';
import logoWays from '../../../img/Trusted by/6885f1e4306e3894a1466064_Logo_ways_mono.svg';
import logoYcombinator from '../../../img/Trusted by/6885f1f680fdbf02fa0eae57_Logo_Y Combinator_mono.svg';
import logoYenex from '../../../img/Trusted by/6885f2004933c2b4d513d932_Logo_yenex_mono.svg';
import logoAddisoft from '../../../img/Trusted by/6886538a81d84aaf47e5386d_Logo_Addisoft_mono.svg';
import logoBanglashikhi from '../../../img/Trusted by/6886539e25b283ac0614549d_Logo_Banglashikhi_mono.svg';
import logoHomerun from '../../../img/Trusted by/688653afacecba76738e739f_Logo_Homerun_mono.svg';
import logoSitewise from '../../../img/Trusted by/688653bf4f47ca91cf09762b_Logo_Sitewise_mono.svg';
import logoRelaxy from '../../../img/Trusted by/688656b4cb56ce5a1e817819_Logo_Relaxy_mono.svg';
import logoZantrik from '../../../img/Trusted by/68a091859ea0add1f56a3a99_Logo_zantrik_mono.svg';
import logoBackpack from '../../../img/Trusted by/68a091c01ddc2dc9b5c6004d_Logo_Backpack_mono.svg';
import logoWefi from '../../../img/Trusted by/699edc572d2132bc29e673b6_Logo_Wefi_ mono.svg';
import logoFms from '../../../img/Trusted by/699edc87359d20b3995f03cc_Logo_FMS_ mono.svg';
import logoSalesgo from '../../../img/Trusted by/69e8da7044354a424b483801_Logo_Salesgo_ mono.svg';
import logoExternalit from '../../../img/Trusted by/6a2a85c1739fe7aab067997f_Logo_Externalit_ mono.svg';
import logoGoodgenes from '../../../img/Trusted by/6a2a85e71b1908e75d278368_Logo_Goodgenes_ mono.svg';

import './about.css';

const row1Logos = [
    logoCoinpulse, logoWefi, logoFms, logoSalesgo, logoExternalit, logoSitewise, logoHomerun,
    logoCoinpulse, logoWefi, logoFms, logoSalesgo, logoExternalit, logoSitewise, logoHomerun,
    logoCoinpulse, logoWefi, logoFms, logoSalesgo, logoExternalit, logoSitewise, logoHomerun,
    logoCoinpulse, logoWefi, logoFms, logoSalesgo, logoExternalit, logoSitewise, logoHomerun
];

const row2Logos = [
    logoCarbobon, logoCarnesia, logoCompaies, logoCpg, logoDlicio, logoDocuseal, logoFarasha,
    logoCarbobon, logoCarnesia, logoCompaies, logoCpg, logoDlicio, logoDocuseal, logoFarasha,
    logoCarbobon, logoCarnesia, logoCompaies, logoCpg, logoDlicio, logoDocuseal, logoFarasha,
    logoCarbobon, logoCarnesia, logoCompaies, logoCpg, logoDlicio, logoDocuseal, logoFarasha
];

// Framer Motion animation variants for the partners section
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

export default function AboutUsPage() {
    const getSrc = (img) => (img && img.src ? img.src : img);

    const faqs = [
        { id: 1, question: "How do you approach a new design project?", answer: "We start with deep discovery and strategy to understand your business goals, target audience, and market landscape. From there, we move to user journey mapping, wireframing, and finally high-fidelity UI design." },
        { id: 2, question: "What industries do you specialize in?", answer: "While we have extensive experience in Fintech, Healthcare, and SaaS, our design-first methodology allows us to tackle complex problems in any industry, from Edtech to Cybersecurity." },
        { id: 3, question: "Do you offer post-launch support and optimization?", answer: "Absolutely. We view our client relationships as long-term partnerships. We offer flexible maintenance and optimization retainers to ensure your product continues to evolve and perform." },
        { id: 4, question: "How long does a typical design project take?", answer: "Most projects range from 4 to 12 weeks, depending on the scope and complexity. We emphasize quality and thoroughness, while maintaining an agile pace to meet your business timelines." },
        { id: 5, question: "Will you help with the actual development of the design?", answer: "Yes, we have a dedicated development team specializing in React, Next.js, and Webflow, ensuring your designs are implemented with pixel-perfect precision and high performance." }
    ];

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

    // List of premium team gallery images matching the screenshot description (12 items)
    const galleryItems = [
        // Row 1
        {
            id: 1,
            title: "Foosball Chill Session",
            url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=400",
            flex: "310"
        },
        {
            id: 2,
            title: "#MONKSCAPE Chill & Beyond 2025",
            url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
            flex: "640"
        },
        {
            id: 3,
            title: "Team Aerial Circle",
            url: "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?auto=format&fit=crop&q=80&w=500",
            flex: "310"
        },
        {
            id: 4,
            title: "Team Meeting and Dinner",
            url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600",
            flex: "505"
        },
        {
            id: 5,
            title: "Buffet Catering Party",
            url: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=400",
            flex: "310"
        },
        {
            id: 6,
            title: "Colleagues Outdoor Session",
            url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=500",
            flex: "505"
        },
        // Row 2
        {
            id: 7,
            title: "Soccer Team Outdoors",
            url: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=600",
            flex: "505"
        },
        {
            id: 8,
            title: "Grocery Shopping Chill",
            url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400",
            flex: "310"
        },
        {
            id: 9,
            title: "Design Monk Designing",
            url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=500",
            flex: "310"
        },
        {
            id: 10,
            title: "Pool Swimming Fun",
            url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=600",
            flex: "640"
        },
        {
            id: 11,
            title: "Developer Setup Focus",
            url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=500",
            flex: "505"
        },
        {
            id: 12,
            title: "Soccer Play Action",
            url: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=400",
            flex: "310"
        }
    ];

    const teamMembers = [
        {
            name: "Adnan Adib",
            role: "Project Manager",
            src: "https://cdn.prod.website-files.com/674703d2af36853f65da67e0/6a3b614483860cccc5192229_Adnan%20Adib.png"
        },
        {
            name: "Abu Bakar Siddik Nizum",
            role: "UI Designer",
            src: "https://cdn.prod.website-files.com/674703d2af36853f65da67e0/6a3b5e04a0aaedcf4d48548e_Abu%20Bakar%20Siddik%20Nizum%20(2).png"
        },
        {
            name: "Fazle Rabbi Sarkar",
            role: "Visualizer",
            src: "https://cdn.prod.website-files.com/674703d2af36853f65da67e0/6a3a8325c7620d5007058d9d_Fazle%20Rabbi%20Sarkar.png"
        },
        {
            name: "Hridoy Ahmed",
            role: "Senior UI Designer",
            src: "https://cdn.prod.website-files.com/674703d2af36853f65da67e0/6a3a82ae4d24f3f665e6d44f_Hridoy%20Ahmed%20(1).png"
        },
        {
            name: "Umme Kulsum(Taazriyan)",
            role: "Product Designer",
            src: "https://cdn.prod.website-files.com/674703d2af36853f65da67e0/6a3a8161ede0dfd9adbc97d3_Shakila%20Yesmin.png"
        },
        {
            name: "Alif Al Haider",
            role: "Business Development Manager",
            src: "https://cdn.prod.website-files.com/674703d2af36853f65da67e0/6a3a80cc2c06abb7cc2b7d59_Alif%20Al%20Haide.png"
        }
    ];

    return (
        <div className="about-page-wrapper">
            <Loader />

            {/* Cinematic Hero Header */}
            <section className="about-hero-section">
                {/* Glow & Gradient Background Elements */}
                <div className="about-hero-glow"></div>
                <div className="about-hero-gradient-overlay"></div>

                {/* Floating 3D Prism Cube */}
                <div className="about-prism-cube-container">
                    <img
                        src={getSrc(cubeImg)}
                        alt="3D Glass Cube"
                        className="about-prism-cube"
                    />
                </div>

                {/* Center Content */}
                <div className="about-hero-content">
                    {/* Website Logo */}
                    <div className="about-header-logo-container">
                        <Link href="/" className="about-logo-link">
                            <span className="about-logo-text">Garuda</span>
                        </Link>
                    </div>

                    {/* Breadcrumb Pill */}
                    <div className="about-breadcrumb-pill">
                        <Link href="/" className="about-breadcrumb-link">Home</Link>
                        <span className="about-breadcrumb-sep">›</span>
                        <span className="about-breadcrumb-active">About us</span>
                    </div>

                    {/* Main Headings */}
                    <h1 className="about-hero-title">
                        Behind The Scene: <br className="about-mobile-br" />
                        Team
                    </h1>
                    <h2 className="about-hero-subtitle">Garuda</h2>
                </div>
            </section>

            {/* Creative Team Gallery Section */}
            <section className="about-gallery-section">
                <div className="about-gallery-container">
                    {/* Row 1: 6 Images */}
                    <div className="about-gallery-row row-1">
                        {galleryItems.slice(0, 6).map((item) => (
                            <div
                                key={item.id}
                                className="about-gallery-card"
                                style={{ '--card-width': `${item.flex}px` }}
                            >
                                <div className="about-gallery-image-wrapper">
                                    <img
                                        src={item.url}
                                        alt={item.title}
                                        className="about-gallery-image"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Row 2: 6 Images */}
                    <div className="about-gallery-row row-2">
                        {galleryItems.slice(6, 12).map((item) => (
                            <div
                                key={item.id}
                                className="about-gallery-card"
                                style={{ '--card-width': `${item.flex}px` }}
                            >
                                <div className="about-gallery-image-wrapper">
                                    <img
                                        src={item.url}
                                        alt={item.title}
                                        className="about-gallery-image"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who We Are Intro Section */}
            <section className="about-intro-section">
                <div className="about-intro-container">
                    <div className="about-intro-content">
                        <span className="about-intro-badge">Who We Are</span>
                        <h2 className="about-intro-title">
                            Your Go-To Partner For Impactful Designs To Create <span className="elegant-serif">Apps & Websites</span> For Business Success!
                        </h2>
                        <a href="/contact" target="_blank" rel="noopener noreferrer" className="about-intro-btn">
                            Book a Call
                            <span className="btn-arrow">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </a>
                    </div>
                    <div className="about-intro-image-wrapper">
                        <img
                            src={getSrc(mockupImg)}
                            alt="Apps & Websites Mockup"
                            className="about-intro-image"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            {/* Visionary Partnerships / Stats Section */}
            <section className="about-stats-section">
                {/* Glow Background Elements */}
                <div className="about-stats-glow-left"></div>
                <div className="about-stats-glow-right"></div>

                <div className="about-stats-container">
                    {/* Badge */}
                    <div className="about-stats-badge-container">
                        <span className="about-stats-badge">Visionary Partnerships</span>
                    </div>

                    {/* Heading */}
                    <h2 className="about-stats-title">
                        <span className="elegant-serif">Pioneering</span> Impactful Change With Forward-Thinking <span className="elegant-serif">Partners</span> Since 2021.
                    </h2>

                    {/* Stats Grid */}
                    <div className="about-stats-grid">
                        {/* Card 1 */}
                        <div className="about-stat-card">
                            <span className="about-stat-card-label">Clients</span>
                            <span className="about-stat-card-value">150+</span>
                            <p className="about-stat-card-desc">
                                Collaborating with ambitious brands to create meaningful experiences.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="about-stat-card">
                            <span className="about-stat-card-label">Countries Served</span>
                            <span className="about-stat-card-value">7</span>
                            <p className="about-stat-card-desc">
                                Bringing creativity and strategy together for brand success worldwide
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="about-stat-card">
                            <span className="about-stat-card-label">Experience</span>
                            <span className="about-stat-card-value">4</span>
                            <p className="about-stat-card-desc">
                                Designing with passion, precision, and expertise over the years.
                            </p>
                        </div>

                        {/* Card 4 */}
                        <div className="about-stat-card">
                            <span className="about-stat-card-label">Biriyani Plates</span>
                            <span className="about-stat-card-value">999</span>
                            <p className="about-stat-card-desc">
                                We're serious about our Biriyani Joytun Birani is our top spot (not sponsored, but we wouldn't mind).
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story / Founders Section */}
            <section className="about-story-section">
                {/* Glow Background Element */}
                <div className="about-story-glow"></div>

                <div className="about-story-container">
                    {/* Left Column: Content */}
                    <div className="about-story-content">
                        <span className="about-story-badge">Our Story</span>

                        <h2 className="about-story-title">
                            How <span className="elegant-serif">Colleagues</span> Turned Into <span className="elegant-serif">Co-Founders</span>
                        </h2>

                        <p className="about-story-desc">
                            Meet Atiq and Noman, the founders of Design Monks. Their journey began as colleagues, united by a shared vision. In 2021, they decided to launch their own venture after working together on major projects for brands like Viber and Samsung. Now, Design Monks is home to over 40 passionate team members, all dedicated to our mission.
                        </p>

                        <Link href="/contact" className="about-story-btn">
                            Meet the Team
                            <span className="btn-arrow">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </Link>
                    </div>

                    {/* Right Column: Image */}
                    <div className="about-story-image-wrapper">
                        <img
                            src={getSrc(coFoundersImg)}
                            alt="Co-founders Atiq and Noman"
                            className="about-story-image"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            {/* Culture / Video Gallery Section */}
            <section className="about-culture-section">
                {/* Glow Background Elements */}
                <div className="about-culture-glow-left"></div>
                <div className="about-culture-glow-right"></div>

                <div className="about-culture-container">
                    {/* Badge */}
                    <div className="about-culture-badge-container">
                        <span className="about-culture-badge">Our Impacts</span>
                    </div>

                    {/* Heading */}
                    <h2 className="about-culture-title">
                        <span className="elegant-serif">Contribution We Made :</span> <br /> UX Insights to Grow the Industry
                    </h2>

                    {/* Description */}
                    <p className="about-culture-desc">
                        Building a stronger design community by sharing what we know, so you can create what you dream.
                    </p>

                    {/* Stats Row */}
                    <div className="about-culture-stats-row">
                        <div className="about-culture-stat-card">
                            <span className="about-culture-stat-value">268</span>
                            <span className="about-culture-stat-label">Videos</span>
                        </div>
                        <div className="about-culture-stat-card">
                            <span className="about-culture-stat-value">100K</span>
                            <span className="about-culture-stat-label">Likes</span>
                        </div>
                        <div className="about-culture-stat-card">
                            <span className="about-culture-stat-value">50K</span>
                            <span className="about-culture-stat-label">Subscribers</span>
                        </div>
                        <div className="about-culture-stat-card">
                            <span className="about-culture-stat-value">1M</span>
                            <span className="about-culture-stat-label">Views</span>
                        </div>
                    </div>

                    {/* Videos Grid */}
                    <div className="about-culture-grid">
                        <div className="about-culture-video-card">
                            <video
                                src="https://www.w3schools.com/html/mov_bbb.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="about-culture-video"
                            />
                        </div>

                        <div className="about-culture-video-card">
                            <video
                                src="https://www.w3schools.com/html/movie.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="about-culture-video"
                            />
                        </div>

                        <div className="about-culture-video-card">
                            <video
                                src="https://assets.codepen.io/6093409/river.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="about-culture-video"
                            />
                        </div>

                        <div className="about-culture-video-card">
                            <video
                                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="about-culture-video"
                            />
                        </div>
                    </div>

                    {/* Book a Call Button */}
                    <div className="about-culture-btn-container">
                        <a href="/contact" target="_blank" rel="noopener noreferrer" className="about-culture-btn">
                            Book a Call
                            <span className="btn-arrow">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Meet the Team Section */}
            <section id="about-team" className="about-team-section">
                <div className="about-team-container">
                    {/* Badge */}
                    <div className="about-team-badge-container">
                        <span className="about-team-badge">Our Team</span>
                    </div>

                    {/* Heading */}
                    <h2 className="about-team-title">
                        Collaborative Minds, <span className="elegant-serif">Singular Focus</span>
                    </h2>
                </div>

                {/* Infinite Marquee Track of Team Members */}
                <div className="about-team-marquee-container">
                    <div className="about-team-track">
                        {/* Original List */}
                        {teamMembers.map((member, index) => (
                            <div key={`orig-${index}`} className="about-team-card-wrapper">
                                <div className="about-team-card">
                                    <div className="about-team-image-wrapper">
                                        <img
                                            src={member.src}
                                            alt={member.name}
                                            className="about-team-image"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                                <div className="about-team-info">
                                    <h3 className="about-team-name">{member.name}</h3>
                                    <p className="about-team-role">{member.role}</p>
                                </div>
                            </div>
                        ))}
                        {/* Duplicated List for Seamless Loop */}
                        {teamMembers.map((member, index) => (
                            <div key={`dup-${index}`} className="about-team-card-wrapper">
                                <div className="about-team-card">
                                    <div className="about-team-image-wrapper">
                                        <img
                                            src={member.src}
                                            alt={member.name}
                                            className="about-team-image"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                                <div className="about-team-info">
                                    <h3 className="about-team-name">{member.name}</h3>
                                    <p className="about-team-role">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Meet the Team Button */}
                <div className="about-culture-btn-container" style={{ marginTop: '50px', marginBottom: '20px', zIndex: 5 }}>
                    <a href="#about-team" className="about-culture-btn">
                        Meet the Team
                        <span className="btn-arrow">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </a>
                </div>

            </section>

            {/* Customer Stories Section */}
            <section className="about-reviews-section">
                <div className="about-reviews-container">
                    {/* Badge */}
                    <div className="about-reviews-badge-container">
                        <span className="about-reviews-badge">Customer Review</span>
                    </div>

                    {/* Heading */}
                    <h2 className="about-reviews-title">
                        Customer Stories <br /><span className="elegant-serif">That Inspire Us</span>
                    </h2>

                    {/* Content Grid */}
                    <div className="about-reviews-grid">
                        {/* Testimonial Card */}
                        <div className="about-reviews-card">
                            <div className="about-reviews-card-header">
                                <div className="about-reviews-logo">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L3 7L12 12L21 7L12 2Z" fill="url(#blue-grad-1)" />
                                        <path d="M3 7V17L12 22V12L3 7Z" fill="url(#blue-grad-2)" />
                                        <path d="M12 12V22L21 17V7L12 12Z" fill="url(#blue-grad-3)" />
                                        <defs>
                                            <linearGradient id="blue-grad-1" x1="12" y1="2" x2="12" y2="12" gradientUnits="userSpaceOnUse">
                                                <stop offset="0%" stopColor="#60A5FA" />
                                                <stop offset="100%" stopColor="#3B82F6" />
                                            </linearGradient>
                                            <linearGradient id="blue-grad-2" x1="3" y1="7" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                                                <stop offset="0%" stopColor="#2563EB" />
                                                <stop offset="100%" stopColor="#1D4ED8" />
                                            </linearGradient>
                                            <linearGradient id="blue-grad-3" x1="12" y1="12" x2="21" y2="17" gradientUnits="userSpaceOnUse">
                                                <stop offset="0%" stopColor="#3B82F6" />
                                                <stop offset="100%" stopColor="#1E3A8A" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <span className="about-reviews-company">Alpine Empower</span>
                                </div>
                            </div>

                            <p className="about-reviews-quote">
                                I had countless ideas but no clear direction until Garuda stepped in. Their team patiently listened, refined every detail, and never once hesitated when I requested multiple changes. The result? A stunning & user-friendly platform that perfectly captures our vision. Their dedication and kindness made this journey just unforgettable.
                            </p>

                            <div className="about-reviews-stats">
                                <div className="about-reviews-stat-item">
                                    <h4 className="about-reviews-stat-num">98%</h4>
                                    <p className="about-reviews-stat-label">Customer Satisfaction</p>
                                </div>
                                <div className="about-reviews-stat-item">
                                    <h4 className="about-reviews-stat-num">30%</h4>
                                    <p className="about-reviews-stat-label">Business Growth</p>
                                </div>
                                <div className="about-reviews-stat-item">
                                    <h4 className="about-reviews-stat-num">70+ Countries</h4>
                                    <p className="about-reviews-stat-label">Global Reach</p>
                                </div>
                            </div>

                            <div className="about-reviews-author">
                                <div className="about-reviews-avatar-wrapper">
                                    <img
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
                                        alt="Fahim Aziz"
                                        className="about-reviews-avatar"
                                    />
                                </div>
                                <div className="about-reviews-author-info">
                                    <h5 className="about-reviews-author-name">Fahim Aziz</h5>
                                    <p className="about-reviews-author-role">Founder and CEO Alpine Empower</p>
                                </div>
                            </div>
                        </div>

                        {/* Visual Globe Card */}
                        <div className="about-reviews-globe-card">
                            <div className="about-reviews-globe-wrapper">
                                <img
                                    src="/customer_globe.png"
                                    alt="Global Reach Map"
                                    className="about-reviews-globe-img"
                                />

                                <div className="about-reviews-tag tag-usa">From USA</div>
                                <div className="about-reviews-tag tag-uk">From UK</div>
                                <div className="about-reviews-tag tag-china">From China</div>
                                <div className="about-reviews-tag tag-japan">From Japan</div>
                                <div className="about-reviews-tag tag-dubai">From Dubai</div>
                                <div className="about-reviews-tag tag-garuda">To Garuda</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners Brand Marquee Section */}
            <motion.section
                className="about-partners-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={containerVariants}
            >
                {/* Glow Background Elements */}
                <div className="about-partners-glow-left"></div>
                <div className="about-partners-glow-right"></div>

                <motion.div className="about-partners-container" variants={itemVariants}>
                    {/* Badge */}
                    <div className="about-partners-badge-container">
                        <span className="about-partners-badge">Partners</span>
                    </div>

                    {/* Heading */}
                    <h2 className="about-partners-title">
                        Collaborating with Ambitious <span className="elegant-serif">Startups And Industry</span> <br />Titans Alike
                    </h2>
                </motion.div>

                {/* Marquee Wrapper */}
                <motion.div className="about-partners-marquee-wrapper" variants={itemVariants}>
                    {/* Gradient Fade Overlays */}
                    <div className="about-partners-fade-left"></div>
                    <div className="about-partners-fade-right"></div>

                    <div className="about-partners-marquee-grid">
                        {/* Row 1: Scrolling Left */}
                        <div className="about-partners-marquee-row row-left">
                            <div className="about-partners-marquee-track">
                                {row1Logos.map((logo, idx) => (
                                    <div className="about-partner-brand-item" key={`r1-${idx}`}>
                                        <img src={getSrc(logo)} className="about-partner-brand-logo-img" alt="Partner Brand Logo" draggable={false} />
                                    </div>
                                ))}
                                {row1Logos.map((logo, idx) => (
                                    <div className="about-partner-brand-item" key={`r1-dup-${idx}`}>
                                        <img src={getSrc(logo)} className="about-partner-brand-logo-img" alt="Partner Brand Logo" draggable={false} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Row 2: Scrolling Right */}
                        <div className="about-partners-marquee-row row-right">
                            <div className="about-partners-marquee-track">
                                {row2Logos.map((logo, idx) => (
                                    <div className="about-partner-brand-item" key={`r2-${idx}`}>
                                        <img src={getSrc(logo)} className="about-partner-brand-logo-img" alt="Partner Brand Logo" draggable={false} />
                                    </div>
                                ))}
                                {row2Logos.map((logo, idx) => (
                                    <div className="about-partner-brand-item" key={`r2-dup-${idx}`}>
                                        <img src={getSrc(logo)} className="about-partner-brand-logo-img" alt="Partner Brand Logo" draggable={false} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.section>

            {/* Career Banner Section */}
            <motion.section
                className="about-career-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={containerVariants}
            >
                <div className="about-career-container">
                    <motion.div className="about-career-banner" variants={itemVariants}>
                        {/* Glow Container (clips glows inside card boundaries) */}
                        <div className="about-career-glow-container">
                            <div className="about-career-glow-left"></div>
                            <div className="about-career-glow-right"></div>
                        </div>

                        {/* Content Column */}
                        <div className="about-career-content">
                            <span className="about-career-badge">Career</span>
                            <h2 className="about-career-title">
                                Want to be a <br />
                                <span className="elegant-serif">Garuda Like Us?</span>
                            </h2>
                            <p className="about-career-subtitle">
                                Are you a talented and self-motivated person with a positive vibe? If yes, you can be the next member of our Garuda family.
                            </p>
                            <Link href="/contact" className="about-career-btn">
                                Join our team
                                <span className="btn-arrow">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </Link>
                        </div>

                        {/* Image Column (overlapping top edge) */}
                        <div className="about-career-image-wrapper">
                            <img
                                src={getSrc(careerImg)}
                                className="about-career-image"
                                alt="Garuda Team"
                                draggable={false}
                            />
                        </div>
                    </motion.div>
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
