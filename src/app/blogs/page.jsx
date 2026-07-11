"use client";
import Link from 'next/link';
import { useState } from 'react';
import { SAMPLE_POSTS, slugify } from './posts';
import { motion } from 'framer-motion';
import './blogs.css';
import '../about/about.css';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import FAQ from '../../components/FAQ';
import PreFooter from '../../components/PreFooter';
import BackToTop from '../../components/BackToTop';

// Asset Imports
import footerImg from '../../../img/foo.webp';
import fortyPlus from '../../../img/40+.avif';
import uiPhotoImg from '../../assets/6734f70094aa7b62e8c08b04_UI Photo.avif';
import newsletterBg from '../../../img/image.webp';

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

const CATEGORIES = ['Latest Blogs', 'AI', 'Branding', 'Design', 'Web Design', 'Social Media', 'Strategy'];

// Data imported from ./posts.js

export default function BlogPage() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('Latest Blogs');
    const [currentPage, setCurrentPage] = useState(1);

    const handleCategoryChange = (cat) => {
        setActiveCategory(cat);
        setCurrentPage(1);
    };

    const handleSearchChange = (val) => {
        setSearch(val);
        setCurrentPage(1);
    };

    const filtered = SAMPLE_POSTS.filter(p => {
        const matchCat = activeCategory === 'Latest Blogs' || p.category === activeCategory;
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.desc.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    const ITEMS_PER_PAGE = 10;
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedPosts = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 4) {
                pages.push(1, 2, 3, 4, 5, '...', totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    const faqs = [
        { id: 1, question: "How do you approach a new design project?", answer: "We start with deep discovery and strategy to understand your business goals, target audience, and market landscape. From there, we move to user journey mapping, wireframing, and finally high-fidelity UI design." },
        { id: 2, question: "What industries do you specialize in?", answer: "While we have extensive experience in Fintech, Healthcare, and SaaS, our design-first methodology allows us to tackle complex problems in any industry, from Edtech to Cybersecurity." },
        { id: 3, question: "Do you offer post-launch support and optimization?", answer: "Absolutely. We view our client relationships as long-term partnerships. We offer flexible maintenance and optimization retainers to ensure your product continues to evolve and perform." },
        { id: 4, question: "How long does a typical design project take?", answer: "Most projects range from 4 to 12 weeks, depending on the scope and complexity. We emphasize quality and thoroughness, while maintaining an agile pace to meet your business timelines." },
        { id: 5, question: "Will you help with the actual development of the design?", answer: "Yes, we have a dedicated development team specializing in React, Next.js, and Webflow, ensuring your designs are implemented with pixel-perfect precision and high performance." }
    ];

    const getSrc = (img) => (img && img.src ? img.src : img);

    return (
        <div className="blogs-page">

            {/* ─── HERO SECTION ─── */}
            <section className="blogs-hero">
                <div className="blogs-hero-bg" />
                <div className="blogs-hero-inner">
                    <Link href="/" className="blogs-brand-link">
                        <span className="blogs-brand">Garuda</span>
                    </Link>
                    <nav className="blogs-breadcrumb" aria-label="breadcrumb">
                        <Link href="/" className="blogs-bc-link">Home</Link>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        <span className="blogs-bc-current">Blogs</span>
                    </nav>
                    <h1 className="blogs-hero-title">
                        Your Go-To Source:
                        <br />
                        <em>Blog Highlights &amp; More</em>
                    </h1>
                    <div className="blogs-search-wrap">
                        <svg className="blogs-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            className="blogs-search-input"
                            type="text"
                            placeholder="Search any blog"
                            value={search}
                            onChange={e => handleSearchChange(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* ─── BLOG LISTING SECTION ─── */}
            <section className="blogs-listing">

                {/* Category Filter Tabs */}
                <div className="blogs-cats-wrap">
                    <div className="blogs-cats">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                className={`blogs-cat-btn ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => handleCategoryChange(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cards Grid */}
                {paginatedPosts.length > 0 ? (
                    <>
                        <div className="blogs-grid">
                            {paginatedPosts.map((post, i) => (
                                <Link href={`/blogs/${slugify(post.title)}`} key={post.id} className="blogs-card-wrapper" style={{ textDecoration: 'none' }}>
                                    <article
                                        className="blogs-card"
                                        style={{ animationDelay: `${i * 0.07}s` }}
                                    >
                                        {/* Card Image / Graphic */}
                                        <div className="blogs-card-thumb">
                                            <div className="blogs-card-img" style={{ backgroundImage: `url(${post.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                                        </div>

                                        {/* Card Body */}
                                        <div className="blogs-card-body">
                                            <h3 className="blogs-card-title">{post.title}</h3>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="blogs-pagination">
                                {getPageNumbers().map((pageNum, idx) => {
                                    if (pageNum === '...') {
                                        return (
                                            <span key={`dots-${idx}`} className="blogs-page-dots">
                                                ...
                                            </span>
                                        );
                                    }
                                    return (
                                        <button
                                            key={`page-${pageNum}`}
                                            className={`blogs-page-btn ${currentPage === pageNum ? 'active' : ''}`}
                                            onClick={() => setCurrentPage(pageNum)}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}

                                <button
                                    className="blogs-page-next-btn"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    aria-label="Next Page"
                                >
                                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 13L7 7L1 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="blogs-empty">
                        <span>🔍</span>
                        <p>No posts found for "<strong>{search}</strong>"</p>
                    </div>
                )}
            </section>

            <div className="about-page-wrapper">
                {/* ─── NEWSLETTER SECTION ─── */}
                <section className="blogs-newsletter-section">
                    <div className="blogs-newsletter-container">
                        <div className="blogs-newsletter-banner" style={{ backgroundImage: `url(${getSrc(newsletterBg)})` }}>
                            <span className="blogs-newsletter-badge">Newsletter</span>
                            <h2 className="blogs-newsletter-title">
                                Stay In The Loop And Keep Up <br className="desktop-only-br" />
                                With All Our <span className="elegant-serif">News And Updates</span>
                            </h2>
                            <p className="blogs-newsletter-subtitle">
                                Be the first to hear about our latest projects, design insights, and studio updates.
                            </p>
                            
                            <div className="blogs-newsletter-avatars-row">
                                <div className="blogs-newsletter-avatars">
                                    <img src={getSrc(fortyPlus)} alt="40+ Happy Clients" />
                                </div>
                            </div>

                            <form className="blogs-newsletter-form" onSubmit={(e) => e.preventDefault()}>
                                <div className="blogs-newsletter-input-wrapper">
                                    <span className="blogs-newsletter-mail-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
                                    </span>
                                    <input
                                        type="email"
                                        placeholder="Your email here"
                                        className="blogs-newsletter-input"
                                        required
                                    />
                                </div>
                                <button type="submit" className="subscribe-submit-btn blogs-newsletter-btn">
                                    Subscribe
                                    <span className="arrow-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

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
            </div>

            <Footer footerImg={getSrc(footerImg)} />
            <Navigation />
            <BackToTop />
        </div>
    );
}
