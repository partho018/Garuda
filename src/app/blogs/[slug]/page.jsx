import React from 'react';
import Link from 'next/link';
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
import footerImg from '../../../../public/blog-hero-bg.webp';
import fortyPlus from '../../../../img/40+.avif';

// Consultation Component and Assets
import Consultation from '../../../components/Consultation';
import client2 from '../../../../img/Clint/68db86d8ef94ad655fb9fd01_Client_Austin_916.avif';
import cornerGradient from '../../../../img/68ba5e44ccb1468ce5b97221_96a931f11af1a2f6b37e251396d130df_6894f274513a65bb1abe220f_Gradient (1)-p-130x130q80.avif';

import { queryRow, queryRows } from '../../../lib/db';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
    try {
        const posts = await queryRows("SELECT slug FROM blog_posts WHERE status = 'published'");
        return posts.map((post) => ({
            slug: post.slug,
        }));
    } catch (e) {
        console.error("Error generating static params:", e);
        return [];
    }
}

// Simple Helper to Parse Inline Markdown (bold, italic, code)
function formatInlineMarkdown(text) {
    if (!text) return '';
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>');
}

// Simple Markdown Block Parser
function renderMarkdown(content) {
    if (!content) return null;

    const blocks = content.split(/\n\n+/);
    return blocks.map((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Headers
        if (trimmed.startsWith('### ')) {
            const text = trimmed.substring(4);
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            return <h3 key={index} id={id}>{text}</h3>;
        }
        if (trimmed.startsWith('## ')) {
            const text = trimmed.substring(3);
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            return <h2 key={index} id={id}>{text}</h2>;
        }
        if (trimmed.startsWith('# ')) {
            const text = trimmed.substring(2);
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            return <h1 key={index} id={id}>{text}</h1>;
        }

        // Unordered List
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const items = trimmed.split(/\n[-*]\s+/).map(item => item.replace(/^[-*]\s+/, ''));
            return (
                <ul key={index}>
                    {items.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item) }} />
                    ))}
                </ul>
            );
        }

        // Paragraph
        return (
            <p 
                key={index} 
                dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }} 
            />
        );
    });
}

// Helper to extract headings for the TOC card
function extractHeadings(content) {
    if (!content) return [];

    const lines = content.split('\n');
    const headings = [{ id: 'introduction', label: 'Introduction' }];

    lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('## ')) {
            const text = trimmed.substring(3);
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            headings.push({ id, label: text });
        } else if (trimmed.startsWith('### ')) {
            const text = trimmed.substring(4);
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            headings.push({ id, label: text });
        }
    });

    if (!headings.some(h => h.id === 'conclusion')) {
        headings.push({ id: 'conclusion', label: 'Conclusion' });
    }

    return headings;
}

export default async function BlogPostDetailsPage({ params }) {
    const { slug } = await params;

    let post = null;
    let relatedPosts = [];

    try {
        post = await queryRow("SELECT * FROM blog_posts WHERE slug = ? AND status = 'published'", [slug]);
        if (post) {
            relatedPosts = await queryRows(
                "SELECT * FROM blog_posts WHERE slug != ? AND status = 'published' ORDER BY date DESC, createdAt DESC LIMIT 3",
                [slug]
            );
        }
    } catch (error) {
        console.error("Error fetching blog details from D1:", error);
    }

    if (!post) {
        return (
            <div className="blogs-page" style={{ padding: '100px 20px', textAlign: 'center', color: '#fff', background: '#0a0a0a', minHeight: '100vh' }}>
                <h2>Blog Post Not Found</h2>
                <p style={{ marginTop: '10px', color: '#aaa' }}>The post you are looking for does not exist or has been removed.</p>
                <Link href="/blogs" style={{ color: '#9061F9', textDecoration: 'underline', marginTop: '20px', display: 'inline-block' }}>Back to Blogs</Link>
            </div>
        );
    }

    const getSrc = (img) => (img && img.src ? img.src : img);
    const headings = extractHeadings(post.content);

    // Format the date
    const formattedDate = new Date(post.date || post.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

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
                        {post.title}
                    </h1>

                    <div className="single-blog-meta-container">
                        <div className="single-blog-meta-item">
                            <span className="single-blog-meta-label">Author</span>
                            <span className="single-blog-meta-value">{post.author || 'Abdullah Al Noman'}</span>
                        </div>
                        <div className="single-blog-meta-item">
                            <span className="single-blog-meta-label">Publish Date</span>
                            <span className="single-blog-meta-value">{formattedDate}</span>
                        </div>
                        <div className="single-blog-meta-item">
                            <span className="single-blog-meta-label">Category</span>
                            <span className="single-blog-meta-value">{post.category}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── FEATURED IMAGE ─── */}
            <div className="single-blog-featured-wrap">
                <img 
                    src={post.thumbnail} 
                    alt={post.title} 
                    className="single-blog-featured-img" 
                />
            </div>

            {/* ─── BLOG CONTENT GRID SECTION ─── */}
            <article className="single-blog-content-body">
                <div className="single-blog-grid-layout">
                    {/* Left Sidebar (Sticky Table of Contents) */}
                    <aside className="single-blog-left-sidebar">
                        <TableOfContents headings={headings} />
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
                            {post.shortDesc}
                        </p>

                        <div className="markdown-content">
                            {renderMarkdown(post.content)}
                        </div>
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
            {relatedPosts.length > 0 && (
                <section className="single-blog-related-section">
                    <div className="single-blog-related-container">
                        <div className="single-blog-related-header">
                            <span className="single-blog-related-badge">More Blogs</span>
                            <h2 className="single-blog-related-title">See other <em>Blogs</em></h2>
                        </div>

                        <div className="single-blog-related-grid">
                            {relatedPosts.map((rPost) => (
                                <div className="single-blog-related-card" key={rPost.id}>
                                    <Link href={`/blogs/${rPost.slug}`} className="single-blog-related-card-link">
                                        <div className="single-blog-related-img-wrap">
                                            <img src={rPost.thumbnail} alt={rPost.title} />
                                        </div>
                                        <h3 className="single-blog-related-card-title">{rPost.title}</h3>
                                    </Link>
                                </div>
                            ))}
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
            )}

            <Consultation cornerGradient={getSrc(cornerGradient)} client2={getSrc(client2)} />

            {/* ─── FOOTER & NAVIGATION ─── */}
            <PreFooter fortyPlus={getSrc(fortyPlus)} />
            <Footer footerImg={getSrc(footerImg)} />
            <Navigation />
            <BackToTop />
        </div>
    );
}
