"use client";
import React, { useEffect, useState } from 'react';

export default function TableOfContents() {
    const [activeId, setActiveId] = useState('introduction');
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        // 1. Intersection Observer for active heading detection
        const headingIds = ['introduction', 'mockups', 'prototypes', 'conclusion'];
        const elements = headingIds.map(id => document.getElementById(id)).filter(Boolean);

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -60% 0px', // detects when heading is in the upper 40% of viewport
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        }, observerOptions);

        elements.forEach(el => observer.observe(el));

        // 2. Scroll event listener for progress bar width
        const handleScroll = () => {
            const mainContent = document.querySelector('.single-blog-main-content');
            if (!mainContent) return;

            const rect = mainContent.getBoundingClientRect();
            const elementTop = rect.top + window.scrollY;
            const elementHeight = rect.height;
            const viewportHeight = window.innerHeight;

            // Start calculating progress when the top of the content starts entering the viewport
            // and finish when the bottom of the content leaves the viewport.
            const startOffset = elementTop - viewportHeight;
            const endOffset = elementTop + elementHeight - 100;
            const currentScroll = window.scrollY;

            const totalScrollable = endOffset - startOffset;
            const scrolled = currentScroll - startOffset;

            let progress = (scrolled / totalScrollable) * 100;
            progress = Math.min(100, Math.max(0, progress));

            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial call
        handleScroll();

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const tocItems = [
        { id: 'introduction', label: 'Introduction' },
        { id: 'mockups', label: '1. Mockups: Visual Design' },
        { id: 'prototypes', label: '2. Prototypes: Interaction' },
        { id: 'conclusion', label: 'Conclusion' }
    ];

    const handleClick = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            // Smooth scroll with offset for the sticky positioning
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="single-blog-toc-card">
            <h3 className="single-blog-toc-heading">Min Read</h3>
            <div className="single-blog-toc-progress-wrapper">
                <div 
                    className="single-blog-toc-progress-bar" 
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>
            <ul className="single-blog-toc-list">
                {tocItems.map((item) => (
                    <li key={item.id}>
                        <a 
                            href={`#${item.id}`} 
                            onClick={(e) => handleClick(e, item.id)}
                            className={`single-blog-toc-link ${activeId === item.id ? 'active' : ''}`}
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
