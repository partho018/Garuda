import React from 'react';
import Link from 'next/link';
import { SAMPLE_POSTS, slugify } from '../posts';
import '../blogs.css';
import '../../about/about.css';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import PreFooter from '../../../components/PreFooter';
import BackToTop from '../../../components/BackToTop';

import TableOfContents from './TableOfContents';

import uiPhotoImg from '../../../assets/6734f70094aa7b62e8c08b04_UI Photo.avif';

// Asset Imports
import detailsBg from '../../../../img/image (1).webp';
import footerImg from '../../../../img/foo.webp';
import fortyPlus from '../../../../img/40+.avif';

// Consultation Component and Assets
import Consultation from '../../../components/Consultation';
import client2 from '../../../../img/Clint/68db86d8ef94ad655fb9fd01_Client_Austin_916.avif';
import cornerGradient from '../../../../img/68ba5e44ccb1468ce5b97221_96a931f11af1a2f6b37e251396d130df_6894f274513a65bb1abe220f_Gradient (1)-p-130x130q80.avif';

export async function generateStaticParams() {
    return SAMPLE_POSTS.map((post) => ({
        slug: slugify(post.title),
    }));
}

export default async function BlogPostDetailsPage({ params }) {
    const { slug } = await params;
    const post = SAMPLE_POSTS.find(p => slugify(p.title) === slug) || SAMPLE_POSTS[0];

    const getSrc = (img) => (img && img.src ? img.src : img);

    return (
        <div className="blogs-page">
            {/* ─── HERO HEADER SECTION (80vh height, background image) ─── */}
            <section 
                className="single-blog-hero" 
                style={{ backgroundImage: `url("${getSrc(detailsBg)}")` }}
            >
                <div className="single-blog-hero-overlay" />
                <div className="single-blog-hero-inner">
                    <div className="blogs-brand-link">
                        <h1 className="blogs-brand">Garuda</h1>
                    </div>
                    <div className="single-blog-breadcrumb">
                        <Link href="/">Home</Link>
                        <span className="breadcrumb-separator">›</span>
                        <Link href="/blogs">Blogs</Link>
                        <span className="breadcrumb-separator">›</span>
                        <span className="breadcrumb-current">Blog details</span>
                    </div>

                    <h1 className="single-blog-title">
                        {post ? post.title : "How AI Is Transforming Brand Identity in 2025"}
                    </h1>

                    <div className="single-blog-meta-container">
                        <div className="single-blog-meta-item">
                            <span className="single-blog-meta-label">Author</span>
                            <span className="single-blog-meta-value">Abdullah Al Noman</span>
                        </div>
                        <div className="single-blog-meta-item">
                            <span className="single-blog-meta-label">Publish Date</span>
                            <span className="single-blog-meta-value">Jun 9, 2026</span>
                        </div>
                        <div className="single-blog-meta-item">
                            <span className="single-blog-meta-label">Latest Update</span>
                            <span className="single-blog-meta-value">Jun 9, 2026</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── FEATURED IMAGE ─── */}
            <div className="single-blog-featured-wrap">
                <img 
                    src={post ? post.image : ""} 
                    alt={post ? post.title : "Featured"} 
                    className="single-blog-featured-img" 
                />
            </div>

            {/* ─── BLOG CONTENT GRID SECTION ─── */}
            <article className="single-blog-content-body">
                <div className="single-blog-grid-layout">
                    {/* Left Sidebar (Sticky Table of Contents) */}
                    <aside className="single-blog-left-sidebar">
                        <TableOfContents />
                    </aside>

                    {/* Middle Content (Scrolling Body) */}
                    <main className="single-blog-main-content">
                        {/* Key Takeaways Box */}
                        <div className="single-blog-takeaways-box">
                            <h3 className="single-blog-takeaways-title">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="takeaways-sparkle-icon">
                                    <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="#682EE6"/>
                                </svg>
                                Key Takeaways
                            </h3>
                            <ul className="single-blog-takeaways-list">
                                <li>Slow UI breaks trust faster than slow systems.</li>
                                <li>Users need instant feedback, not instant results, to stay confident.</li>
                                <li>Skeleton screens and progress bars make waiting feel shorter and intentional.</li>
                                <li>Disabled buttons and loading states prevent duplicate actions and user errors.</li>
                                <li>Clear feedback at every interaction keeps users in control and engaged.</li>
                            </ul>
                        </div>

                        <p id="introduction" className="single-blog-lead-text">
                            {post ? post.desc : "This is a detailed layout illustrating the differences and application practices between high-fidelity prototypes and static mockups."}
                        </p>
                        
                        <p>
                            Understanding the design lifecycle is paramount to launching successful digital products. During discovery and framing stages, design practitioners often utilize multiple artifacts to communicate functionality, aesthetics, and navigation logic. Among these, mockups and prototypes serve as standard pillars, yet they target completely different objectives and stages of product development.
                        </p>
                        
                        <h2 id="mockups">1. Mockups: Visual Design Representation</h2>
                        <p>
                            A mockup is a static design model that showcases the visual aesthetics of a product. It includes color palettes, typography, iconography, and overall branding elements. Mockups are highly useful for obtaining stakeholder alignment on visual style, layouts, and copy content. However, they do not offer any functional interaction.
                        </p>

                        <h2 id="prototypes">2. Prototypes: Interaction and User Journeys</h2>
                        <p>
                            Unlike mockups, a prototype is interactive. It simulates how a user moves through paths, clicks buttons, and experiences state changes. Prototypes can range from low-fidelity wireframe flows to high-fidelity animations that mimic production-ready frontend environments. Product teams use them to identify UX bugs, perform validation research, and present live demos to developers.
                        </p>

                        <h2 id="conclusion">Conclusion</h2>
                        <p>
                            Knowing when to design a mockup versus when to build a prototype streamlines collaboration between product owners, designers, and engineering teams. Together, they ensure that the design language converts smoothly from early ideas into highly functional web and mobile platforms.
                        </p>
                    </main>

                    {/* Right Sidebar (Sticky CTA Card) */}
                    <aside className="single-blog-right-sidebar">
                        <div className="single-blog-cta-card">
                            <div className="single-blog-cta-banner">
                                <img src={getSrc(uiPhotoImg)} alt="UI UX Design Banner" className="single-blog-cta-img" />
                            </div>
                            <div className="single-blog-cta-content">
                                <span className="single-blog-cta-badge">UI/UX Design Service</span>
                                <h4 className="single-blog-cta-title">Want a product <br /> that <em>Sells</em>, Not just sits?</h4>
                                <ul className="single-blog-cta-bullets">
                                    <li>
                                        <svg className="single-blog-cta-check" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="12" r="10" stroke="#9061F9" strokeWidth="2.5" fill="none" />
                                            <path d="M8.5 12.5L11 15L16 9" stroke="#9061F9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        Conversion-focused design
                                    </li>
                                    <li>
                                        <svg className="single-blog-cta-check" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="12" r="10" stroke="#9061F9" strokeWidth="2.5" fill="none" />
                                            <path d="M8.5 12.5L11 15L16 9" stroke="#9061F9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        Built for business growth
                                    </li>
                                </ul>
                                <Link href="/contact" className="single-blog-cta-button">
                                    Let's Fix My App, Website
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </article>

            {/* ─── SEE OTHER BLOGS SECTION ─── */}
            <section className="single-blog-related-section">
                <div className="single-blog-related-container">
                    <div className="single-blog-related-header">
                        <span className="single-blog-related-badge">More Blogs</span>
                        <h2 className="single-blog-related-title">See other <em>Blogs</em></h2>
                    </div>

                    <div className="single-blog-related-grid">
                        <div className="single-blog-related-card">
                            <Link href="/blogs/e-commerce-dashboard-ui-design-importance-steps-mistakes" className="single-blog-related-card-link">
                                <div className="single-blog-related-img-wrap">
                                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="E-commerce Dashboard UI Design" />
                                </div>
                                <h3 className="single-blog-related-card-title">E-commerce Dashboard UI Design: Importance, Steps & Mistakes</h3>
                            </Link>
                        </div>
                        <div className="single-blog-related-card">
                            <Link href="/blogs/what-does-a-ux-designer-actually-do-2024-guide" className="single-blog-related-card-link">
                                <div className="single-blog-related-img-wrap">
                                    <img src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800" alt="What Does a UX Designer Actually Do?" />
                                </div>
                                <h3 className="single-blog-related-card-title">What Does a UX Designer Actually Do? [2024 Guide]</h3>
                            </Link>
                        </div>
                        <div className="single-blog-related-card">
                            <Link href="/blogs/10-interaction-design-principles-your-must-learn" className="single-blog-related-card-link">
                                <div className="single-blog-related-img-wrap">
                                    <img src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800" alt="10 Interaction Design Principles" />
                                </div>
                                <h3 className="single-blog-related-card-title">10 Interaction Design Principles: Your Must-Learn</h3>
                            </Link>
                        </div>
                    </div>

                    <div className="single-blog-related-footer">
                        <Link href="/blogs" className="single-blog-view-more-btn">
                            View More Blogs
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            <Consultation cornerGradient={getSrc(cornerGradient)} client2={getSrc(client2)} />

            {/* ─── FOOTER & NAVIGATION ─── */}
            <PreFooter fortyPlus={getSrc(fortyPlus)} />
            <Footer footerImg={getSrc(footerImg)} />
            <Navigation />
            <BackToTop />
        </div>
    );
}
