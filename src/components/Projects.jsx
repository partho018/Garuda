import React from 'react';
import Link from 'next/link';

const Projects = ({ projects, ctaArrow }) => {
    return (
        <section className="proven-success-section" id="projects">
            <div className="success-content">
                <span className="industry-wins-badge">What We Do</span>
                <h2 className="success-title">
                    Built to Elevate<br />
                    <span className="elegant-serif dark">Every Business 🦅</span>
                </h2>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="project-card"
                            style={{ backgroundColor: project.bgColor }}
                        >
                            <div className="project-info">
                                <p className="project-category">{project.category}</p>
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-desc">{project.desc}</p>

                                <div className="project-stats">
                                    {project.stats.map((stat, sIndex) => (
                                        <div key={sIndex} className="stat-item">
                                            <p className="stat-label">{stat.label}</p>
                                            <p className="stat-value">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>

                                <Link href="/contact" className="ceo-badge" style={{ backgroundColor: project.btnColor, textDecoration: 'none' }}>
                                    {project.ceo.avatar && <img src={project.ceo.avatar} alt={project.ceo.name} className="ceo-avatar" loading="lazy" decoding="async" />}
                                    {(project.ceo.name || project.ceo.role) && (
                                        <div className="ceo-details">
                                            {project.ceo.name && <p className="ceo-name">{project.ceo.name}</p>}
                                            {project.ceo.role && <p className="ceo-role">{project.ceo.role}</p>}
                                        </div>
                                    )}
                                    {project.getServiceText && <div className="get-service-text">{project.getServiceText}</div>}
                                    <img src={ctaArrow} alt="arrow" className="ceo-arrow-icon" loading="lazy" />
                                </Link>
                            </div>

                            <div className="project-visual">
                                <div className="visual-container">
                                    <img src={project.image} alt="project visual" className="card-mockup-img" loading="lazy" decoding="async" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="see-all-container">
                    <Link href="/contact" className="see-all-btn" style={{ textDecoration: 'none' }}>
                        See All Projects
                        <img src={ctaArrow} alt="arrow" className="see-all-arrow-icon" loading="lazy" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Projects);
